import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';

const BreadcrumbsContext = createContext<{
    breadcrumbs: BreadcrumbItem[];
    setBreadcrumbs: (items: BreadcrumbItem[]) => void;
}>({ breadcrumbs: [], setBreadcrumbs: () => {} });

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

    return (
        <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbsContext.Provider>
    );
}

export function useSetBreadcrumbs(items: BreadcrumbItem[]) {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    useEffect(() => {
        setBreadcrumbs(items);

        return () => setBreadcrumbs([]);
    }, []);
}

export function useBreadcrumbs() {
    return useContext(BreadcrumbsContext).breadcrumbs;
}
