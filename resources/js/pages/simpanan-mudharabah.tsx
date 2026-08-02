import { Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { SimpananPage } from '@/components/marketing/simpanan-page';
import { simpananMudharabahDefaults } from '@/content/simpanan-page-defaults';

export default function SimpananMudharabah() {
    return (
        <SimpananPage
            pageKey="simpanan-mudharabah"
            defaults={simpananMudharabahDefaults}
            featureIcons={[TrendingUp, Clock, ShieldCheck]}
        />
    );
}
