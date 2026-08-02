import { Link, usePage } from '@inertiajs/react';
import { Home, Wallet, Briefcase, Headset } from 'lucide-react';

export function TamzisBottomNav() {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'id';
    const isEn = currentLocale === 'en';

    const menus = [
        { label: isEn ? 'Home' : 'Beranda', icon: Home, href: '/' },
        { label: isEn ? 'Savings' : 'Simpanan', icon: Wallet, href: '/simpanan-mutiara' },
        { label: isEn ? 'Financing' : 'Pembiayaan', icon: Briefcase, href: '/ikhtiar-utama' },
        {
            label: isEn ? 'Contact' : 'Kontak',
            icon: Headset,
            href: isEn 
                ? 'https://wa.me/628112613134?text=Hello%20TAMZIS%2C%20I%20would%20like%20to%20ask'
                : 'https://wa.me/628112613134?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya',
        },
    ];

    return (
        <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
            <div className="flex items-center justify-around border-t border-white/20 bg-orange-700 px-2 py-1 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-lg">
                {menus.map((menu) => {
                    const isExternal = menu.href.startsWith('http');

                    if (isExternal) {
                        return (
                            <a
                                key={menu.label}
                                href={menu.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full flex-col items-center justify-center px-1 py-2 transition-all active:bg-white/10"
                            >
                                <menu.icon className="mb-1 h-5 w-5 text-white" />
                                <span className="text-[10px] font-black tracking-tighter text-white uppercase">
                                    {menu.label}
                                </span>
                            </a>
                        );
                    }

                    return (
                        <Link
                            key={menu.label}
                            href={menu.href}
                            className="flex w-full flex-col items-center justify-center px-1 py-2 transition-all active:bg-white/10"
                        >
                            <menu.icon className="mb-1 h-5 w-5 text-white" />
                            <span className="text-[10px] font-black tracking-tighter text-white uppercase">
                                {menu.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
