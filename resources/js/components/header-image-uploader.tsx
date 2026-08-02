import { ImageUp, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { ImageCropModal } from '@/components/image-crop-modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const MAX_SIZE_BYTES = 1 * 1024 * 1024;

export function HeaderImageUploader({
    value,
    onChange,
    label = 'Gambar Header (background di belakang judul halaman)',
}: {
    value: string | null | undefined;
    onChange: (url: string) => void;
    label?: string;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [pendingImage, setPendingImage] = useState<{ src: string; name: string; type: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPendingImage({
                src: reader.result as string,
                name: file.name,
                type: file.type,
            });
        };
        reader.readAsDataURL(file);
    };

    const uploadFile = async (file: File) => {
        if (file.size > MAX_SIZE_BYTES) {
            toast.error('Ukuran gambar maksimal 1MB. Kompres atau kecilkan gambar terlebih dahulu.');

            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        const toastId = toast.loading('Mengunggah gambar header...');

        try {
            const response = await fetch('/dashboard/pages/content/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN':
                        document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.url) {
                onChange(data.url);
                toast.success('Gambar header berhasil diganti!', { id: toastId });
            } else {
                toast.error('Gagal mengunggah gambar.', { id: toastId });
            }
        } catch {
            toast.error('Gagal mengunggah gambar.', { id: toastId });
        }

        setUploading(false);
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div
                className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-emerald-900 bg-cover bg-center"
                style={value ? { backgroundImage: `url('${value}')` } : undefined}
            >
                {!value && (
                    <span className="text-xs font-medium text-white/60">Belum ada gambar, memakai warna default</span>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2"
                    >
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
                        Ganti Gambar
                    </Button>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                className="hidden"
            />
            <p className="text-xs text-muted-foreground">
                Ukuran ideal <span className="font-semibold">5625 × 938 px</span> (rasio panorama, sama seperti
                header di halaman lain). Format JPG/PNG/WebP, maks. <span className="font-semibold">1MB</span>.
                Setelah memilih gambar, Anda bisa memotong (crop) bagian yang ingin ditampilkan.
            </p>

            <ImageCropModal
                open={pendingImage !== null}
                imageSrc={pendingImage?.src ?? null}
                fileName={pendingImage?.name ?? 'header.jpg'}
                mimeType={pendingImage?.type ?? 'image/jpeg'}
                aspect={5625 / 938}
                onCancel={() => setPendingImage(null)}
                onConfirm={(file) => {
                    setPendingImage(null);
                    uploadFile(file);
                }}
            />
        </div>
    );
}
