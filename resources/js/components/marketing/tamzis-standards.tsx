import { usePage } from '@inertiajs/react';
import { Shield, Zap, MousePointer2, Star, TrendingUp } from 'lucide-react';

import { getSectionIcon } from '@/lib/section-icons';

export type StandardsSectionData = {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string; icon?: string }>;
};

export function TamzisStandards({ data }: { data?: StandardsSectionData }) {
    const { props } = usePage<{
        homeSections?: { standards?: Record<string, StandardsSectionData> };
    }>();
    const locale = (props.locale as string) || 'id';

    const translations = {
        id: {
            title: 'Standar Layanan Kami',
            subtitle:
                'Komitmen TAMZIS untuk menghadirkan pengalaman terbaik bagi setiap anggota di era digital.',
            items: [
                {
                    title: 'Profesional',
                    desc: 'Dikelola oleh tenaga ahli yang kompeten dan berintegritas tinggi.',
                    icon: Shield,
                },
                {
                    title: 'Modern & Interaktif',
                    desc: 'Menghadirkan fitur-fitur terkini yang memudahkan interaksi Anda.',
                    icon: Zap,
                },
                {
                    title: 'User Friendly',
                    desc: 'Antarmuka yang intuitif dan mudah digunakan oleh semua kalangan.',
                    icon: MousePointer2,
                },
                {
                    title: 'Branding & Kepercayaan',
                    desc: 'Memperkuat citra lembaga sebagai mitra finansial syariah terpercaya.',
                    icon: Star,
                },
                {
                    title: 'Layanan Digital',
                    desc: 'Mendukung pemasaran produk dan layanan melalui ekosistem digital.',
                    icon: TrendingUp,
                },
            ],
        },
        en: {
            title: 'Our Service Standards',
            subtitle:
                'TAMZIS commitment to providing the best experience for every member in the digital era.',
            items: [
                {
                    title: 'Professional',
                    desc: 'Managed by competent experts with high integrity.',
                    icon: Shield,
                },
                {
                    title: 'Modern & Interactive',
                    desc: 'Bringing the latest features that ease your interaction.',
                    icon: Zap,
                },
                {
                    title: 'User Friendly',
                    desc: 'Intuitive interface that is easy to use for everyone.',
                    icon: MousePointer2,
                },
                {
                    title: 'Branding & Trust',
                    desc: "Strengthening the institution's image as a trusted sharia financial partner.",
                    icon: Star,
                },
                {
                    title: 'Digital Services',
                    desc: 'Supporting product and service marketing through a digital ecosystem.',
                    icon: TrendingUp,
                },
            ],
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;

    const fromDb = data ?? props.homeSections?.standards?.[locale];

    // Teks dari database (dashboard); ikon tetap mengikuti urutan bawaan.
    const t = fromDb
        ? {
              title: fromDb.title,
              subtitle: fromDb.subtitle,
              items: defaults.items.map((item, index) => ({
                  ...item,
                  title: fromDb.items?.[index]?.title ?? item.title,
                  desc: fromDb.items?.[index]?.desc ?? item.desc,
                  icon: getSectionIcon(fromDb.items?.[index]?.icon) ?? item.icon,
              })),
          }
        : defaults;

    return (
        <section className="overflow-hidden bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-emerald-950 sm:text-6xl">
                        {t.title}
                    </h2>
                    <div
                        className="prose prose-slate mx-auto max-w-none text-sm leading-relaxed font-medium text-slate-500 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: t.subtitle }}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {t.items.map((item, index) => (
                        <div
                            key={index}
                            className="group w-full min-w-[200px] rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500 sm:w-[calc(50%-12px)] lg:w-[calc(20%-20px)]"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition-all group-hover:bg-emerald-700 group-hover:text-white">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-base font-bold tracking-tight text-emerald-950 uppercase transition-colors group-hover:text-emerald-700">
                                {item.title}
                            </h3>
                            <p className="text-xs leading-relaxed font-medium text-slate-500">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
