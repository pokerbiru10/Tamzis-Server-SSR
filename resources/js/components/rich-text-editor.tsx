import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code2,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List as BulletList,
    ListOrdered,
    Loader2,
    RotateCcw,
    RotateCw,
    Slash,
    Strikethrough,
    Underline as UnderlineIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Image.configure({
                inline: true,
                allowBase64: false,
            }),
            Placeholder.configure({ placeholder: placeholder ?? 'Tulis teks di sini...' }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    'min-h-[250px] prose prose-sm focus:outline-none p-4',
            },
        },
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== value) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !editor) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        const toastId = toast.loading('Mengupload gambar...');

        try {
            const response = await fetch('/dashboard/pages/content/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.url) {
                toast.success('Gambar berhasil diupload!', { id: toastId });
                editor.chain().focus().setImage({ src: data.url }).run();
            } else {
                toast.error('Gagal mengupload gambar.', { id: toastId });
            }
        } catch {
            toast.error('Gagal mengupload gambar.', { id: toastId });
        }

        setUploading(false);
        e.target.value = '';
    };

    if (!editor) {
        return (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={className}
            />
        );
    }

    return (
        <div className={className}>
            <div className="mb-3 space-y-2 rounded-xl border bg-slate-50 p-2 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        className="rounded px-3 py-1 text-slate-600 hover:bg-slate-100"
                        title="Undo"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        className="rounded px-3 py-1 text-slate-600 hover:bg-slate-100"
                        title="Redo"
                    >
                        <RotateCw className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Bold"
                    >
                        <Bold className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Italic"
                    >
                        <Italic className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Underline"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Code Block"
                    >
                        <Code2 className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Heading 3"
                    >
                        H3
                    </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Bullet List"
                    >
                        <BulletList className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Align Left"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Align Center"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Align Right"
                    >
                        <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Justify"
                    >
                        <AlignJustify className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const url = window.prompt('Masukkan URL link');

                            if (url) {
                                editor.chain().focus().setLink({ href: url }).run();
                            }
                        }}
                        className={editor.isActive('link') ? 'rounded bg-emerald-600 px-3 py-1 text-white' : 'rounded px-3 py-1 text-slate-600 hover:bg-slate-100'}
                        title="Insert Link"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="rounded px-3 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                        title="Upload Gambar"
                    >
                        {uploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ImageIcon className="h-4 w-4" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setParagraph().unsetAllMarks().run()}
                        className="rounded px-3 py-1 text-slate-600 hover:bg-slate-100"
                        title="Clear Formatting"
                    >
                        <Slash className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
