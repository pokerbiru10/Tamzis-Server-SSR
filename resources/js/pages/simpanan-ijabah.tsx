import { Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { SimpananPage } from '@/components/marketing/simpanan-page';
import { simpananIjabahDefaults } from '@/content/simpanan-page-defaults';

export default function SimpananIjabah() {
    return (
        <SimpananPage
            pageKey="simpanan-ijabah"
            defaults={simpananIjabahDefaults}
            featureIcons={[TrendingUp, Clock, ShieldCheck]}
            showIjabahRates
        />
    );
}
