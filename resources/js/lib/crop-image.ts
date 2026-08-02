export type CroppedAreaPixels = {
    x: number;
    y: number;
    width: number;
    height: number;
};

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.crossOrigin = 'anonymous';
        image.src = url;
    });
}

// Crop gambar sesuai area pilihan user (dari react-easy-crop), hasilkan File baru.
export async function getCroppedImageFile(
    imageSrc: string,
    croppedAreaPixels: CroppedAreaPixels,
    fileName: string,
    mimeType: string,
): Promise<File> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Tidak dapat membuat konteks canvas.');
    }

    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Gagal memproses potongan gambar.'));

                    return;
                }

                resolve(new File([blob], fileName, { type: mimeType }));
            },
            mimeType,
            0.92,
        );
    });
}
