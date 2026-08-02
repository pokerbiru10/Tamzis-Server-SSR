import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Briefcase,
    Users,
    Calculator,
    Settings,
    MapPin,
    BookOpen,
    FileEdit,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const mainNavItems: NavItem[] = [
        {
            title: isEn ? 'Dashboard' : 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: isEn ? 'Page Management' : 'Kelola Halaman',
            href: '#',
            icon: FileEdit,
            items: [
                {
                    title: isEn ? 'Hero Banner' : 'Banner Hero Section',
                    href: '/dashboard/pages/banners/hero',
                },
                {
                    title: 'Testimoni Page',
                    href: '/dashboard/pages/testimonials',
                },
                {
                    title: isEn ? 'Page Content' : 'Konten Halaman',
                    href: '/dashboard/pages/content',
                },
                {
                    title: isEn ? 'Navbar & Footer' : 'Navbar & Footer',
                    href: '/dashboard/pages/navigation',
                },
                {
                    title: isEn ? 'Privacy & Terms' : 'Kebijakan & Syarat',
                    href: '/dashboard/pages/legal',
                },
            ],
        },
        {
            title: isEn ? 'Career Management' : 'Kelola Karir',
            href: '/dashboard/karir',
            icon: Briefcase,
        },
        {
            title: isEn ? 'Office Management' : 'Kelola Alamat',
            href: '/dashboard/alamat',
            icon: MapPin,
        },
        {
            title: isEn ? 'User Management' : 'Kelola User',
            href: '/dashboard/users',
            icon: Users,
        },
        {
            title: isEn ? 'Simulation' : 'Simulasi',
            href: '#',
            icon: Calculator,
            items: [
                {
                    title: isEn ? 'GTB Simulation' : 'Simulasi GTB',
                    href: '/dashboard/simulasi/gtb',
                },
                {
                    title: isEn ? 'Hajj Simulation' : 'Simulasi Haji',
                    href: '/dashboard/simulasi/haji',
                },
                {
                    title: isEn
                        ? 'Mudharabah Simulation'
                        : 'Simulasi Mudharabah',
                    href: '/dashboard/simulasi/mudharabah',
                },
                {
                    title: isEn ? 'Murabahah Simulation' : 'Simulasi Murabahah',
                    href: '/dashboard/simulasi/murabahah',
                },
                {
                    title: isEn ? 'Kafalah Simulation' : 'Simulasi Kafalah',
                    href: '/dashboard/simulasi/kafalah',
                },
            ],
        },
        {
            title: isEn ? 'Social Media Account' : 'Akun Sosmed',
            href: '/dashboard/sosmed',
            icon: Settings,
        },
        {
            title: isEn ? 'Manage News' : 'Kelola Berita',
            href: '/dashboard/berita',
            icon: BookOpen,
        },
    ];

    // removed footer nav items

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* NavFooter removed */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
