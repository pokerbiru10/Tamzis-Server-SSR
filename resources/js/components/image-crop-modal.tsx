import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import type {Area} from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { getCroppedImageFile } from '@/lib/crop-image';

export function ImageCropModal({
    open,
    imageSrc,
    fileName,
    mimeType,
    aspect = 6,
    onCancel,
    onConfirm,
}: {
    open: boolean;
    imageSrc: string | null;
    fileName: string;
    mimeType: string;
    aspect?: number;
    onCancel: () => void;
    onConfirm: (file: File) => void;
}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleConfirm = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            return;
        }

        setProcessing(true);

        try {
            const file = await getCroppedImageFile(imageSrc, croppedAreaPixels, fileName, mimeType);
            onConfirm(file);
        } finally {
            setProcessing(false);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!next) {
                    onCancel();
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                }
            }}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Sesuaikan Gambar</DialogTitle>
                </DialogHeader>

                <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-900">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="crop-zoom" className="text-xs font-semibold text-muted-foreground">
                        Zoom
                    </label>
                    <input
                        id="crop-zoom"
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                    />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel} disabled={processing}>
                        Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={processing || !croppedAreaPixels}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        {processing ? 'Memproses...' : 'Gunakan Gambar Ini'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
