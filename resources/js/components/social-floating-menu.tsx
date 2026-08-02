import {
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Globe,
    Send,
    Rss,
    MessageCircle,
    Phone,
    Share2,
    X,
    Youtube,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import { useState } from 'react';

// Map icon value → Lucide component
const ICON_MAP: Record<string, LucideIcon> = {
    instagram:  Instagram,
    facebook:   Facebook,
    youtube:    Youtube,
    linkedin:   Linkedin,
    twitter:    Twitter,
    telegram:   Send,
    whatsapp:   MessageCircle,
    website:    Globe,
    phone:      Phone,
    rss:        Rss,
    other:      Share2,
};

export type SocialAccount = {
    id: number;
    name: string;
    icon: string;
    url: string;
    button_color: string;
};

/**
 * SocialFloatingMenu component
 * Renders a floating share button that expands into social media links.
 * Positioned above the WhatsApp button on the bottom-left.
 */
export default function SocialFloatingMenu({ accounts = [] }: { accounts?: SocialAccount[] }) {
    const [isOpen, setIsOpen] = useState(false);

    // Jika tidak ada akun aktif di database, tidak tampilkan tombol
    if (accounts.length === 0) {
return null;
}

    return (
        <div
            className="fixed bottom-36 left-6 z-30 flex flex-col-reverse items-center gap-3 md:bottom-28 md:left-8"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isOpen ? 'rotate-90 bg-red-500' : 'bg-gray-800'
                }`}
                aria-label="Social Media Menu"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Share2 className="h-6 w-6" />
                )}
            </button>

            {/* Social Media Icons — dari database */}
            <div
                className={`flex flex-col gap-3 transition-all duration-300 ${
                    isOpen
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-10 opacity-0'
                }`}
            >
                {accounts.map((acc) => {
                    const Icon = ICON_MAP[acc.icon] ?? Share2;

                    return (
                        <a
                            key={acc.id}
                            href={acc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 hover:scale-110"
                            style={{ backgroundColor: acc.button_color }}
                            title={acc.name}
                            aria-label={acc.name}
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
