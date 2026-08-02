import { HeartHandshake, ShieldCheck, Wallet } from 'lucide-react';
import { SimpananPage } from '@/components/marketing/simpanan-page';
import { simpananMutiaraDefaults } from '@/content/simpanan-page-defaults';

export default function SimpananMutiara() {
    return (
        <SimpananPage
            pageKey="simpanan-mutiara"
            defaults={simpananMutiaraDefaults}
            featureIcons={[Wallet, ShieldCheck, HeartHandshake]}
            heroImageLink="https://www.instagram.com/p/Bso4irnjDtk/?igsh=MXdhb2Nuazlha2xteQ=="
        />
    );
}
