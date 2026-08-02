import { Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { SimpananPage } from '@/components/marketing/simpanan-page';
import { simpananBerjangkaDefaults } from '@/content/simpanan-page-defaults';

export default function SimpananBerjangka() {
    return (
        <SimpananPage
            pageKey="simpanan-berjangka"
            defaults={simpananBerjangkaDefaults}
            featureIcons={[TrendingUp, Clock, ShieldCheck]}
        />
    );
}
