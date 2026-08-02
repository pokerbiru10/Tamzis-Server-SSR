import { ImageUp, Loader2, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const MAX_SIZE_BYTES = 1 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

export function PhotoDropzone({
    value,
    onChange,
}: {
    value: string;
    onChange: (url: string) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const uploadFile = async (file: File) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            toast.error('Format gambar harus JPG, PNG, atau WebP.');

            return;
        }

        if (file.size > MAX_SIZE_BYTES) {
            toast.error('Ukuran gambar maksimal 1MB. Kompres atau kecilkan gambar terlebih dahulu.');

            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        const toastId = toast.loading('Mengunggah foto...');

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
                toast.success('Foto berhasil diunggah!', { id: toastId });
            } else {
                toast.error('Gagal mengunggah foto.', { id: toastId });
            }
        } catch {
            toast.error('Gagal mengunggah foto.', { id: toastId });
        }

        setUploading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            uploadFile(file);
        }

        e.target.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files?.[0];

        if (file) {
            uploadFile(file);
        }
    };

    return (
        <div className="space-y-2">
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-slate-50 text-center transition-colors ${
                    dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400'
                }`}
            >
                {value ? (
                    <>
                        <img
                            src={value}
                            alt="Preview foto testimoni"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                            <span className="text-xs font-semibold text-white">Ganti Foto</span>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange('');
                            }}
                            className="absolute top-1 right-1 rounded-full bg-white/90 p-1 text-red-500 shadow hover:bg-white"
                            title="Hapus foto"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </>
                ) : uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                ) : (
                    <div className="flex flex-col items-center gap-1.5 px-3 text-slate-500">
                        <ImageUp className="h-6 w-6" />
                        <span className="text-[11px] leading-tight font-medium">
                            Seret &amp; lepas foto,
                            <br />
                            atau klik untuk pilih
                        </span>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg,image/webp"
                className="hidden"
            />

            {value && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange('')}
                    className="h-auto p-0 text-xs text-red-500 hover:bg-transparent hover:text-red-600"
                >
                    Hapus foto
                </Button>
            )}

            <p className="text-xs text-muted-foreground">
                Opsional — foto profil bulat, format JPG/PNG/WebP, maks. 1MB.
            </p>
        </div>
    );
}
