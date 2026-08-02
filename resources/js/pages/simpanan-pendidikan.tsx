import { GraduationCap, HeartHandshake, ShieldCheck } from 'lucide-react';
import { SimpananPage } from '@/components/marketing/simpanan-page';
import { simpananPendidikanDefaults } from '@/content/simpanan-page-defaults';

export default function SimpananPendidikan() {
    return (
        <SimpananPage
            pageKey="simpanan-pendidikan"
            defaults={simpananPendidikanDefaults}
            featureIcons={[GraduationCap, ShieldCheck, HeartHandshake]}
        />
    );
}
