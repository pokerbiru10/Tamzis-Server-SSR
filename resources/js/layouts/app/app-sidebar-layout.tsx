import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const [navigating, setNavigating] = useState(false);

    useEffect(() => {
        const start = () => setNavigating(true);
        const finish = () => {
            setTimeout(() => setNavigating(false), 200);
        };

        router.on('start', start);
        router.on('finish', finish);

        return () => {
            router.off('start', start);
            router.off('finish', finish);
        };
    }, []);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="relative">
                    {children}
                    {navigating && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
                            <LoaderCircle className="h-8 w-8 animate-spin text-emerald-600" />
                        </div>
                    )}
                </div>
            </AppContent>
        </AppShell>
    );
}
