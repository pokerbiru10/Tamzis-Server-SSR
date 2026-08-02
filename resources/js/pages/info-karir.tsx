import { Head, usePage } from '@inertiajs/react';
import {
    FileText,
    ListChecks,
    ArrowRight,
    Briefcase,
    MessageSquare,
    Home,
} from 'lucide-react';
import { useState } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { webpSource } from '@/lib/utils';

interface JobVacancy {
    id: number;
    title: string;
    description: string;
    image_path: string | null;
    apply_link: string | null;
    is_active: boolean;
    created_at: string;
}

type SectionData = Record<string, any>;

type Sections = {
    header?: SectionData;
    informasi?: SectionData;
    hrd?: SectionData;
    lowongan?: SectionData;
    contact?: SectionData;
    sidebar?: SectionData;
    [key: string]: SectionData | undefined;
};

export default function InfoKarir({ vacancies, sections }: { vacancies: JobVacancy[]; sections: Sections }) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const [activeMenu, setActiveMenu] = useState('Informasi');
    const [activeSidebarItem, setActiveSidebarItem] = useState('Informasi');

    const isEn = locale === 'en';

    const t = {
        title: sections.header?.[locale]?.title || (isEn ? 'Career Portal - TAMZIS' : 'Portal Karir - TAMZIS'),
        subtitle: sections.header?.[locale]?.subtitle || (isEn ? 'Gateway to the Future' : 'Gerbang Masa Depan'),
        backgroundImage: sections.header?.[locale]?.background_image || '/assets/img/header/karir.jpg',
        sidebar: {
            header: sections.sidebar?.[locale]?.header || (isEn ? 'Career Menu' : 'Menu Karir'),
            items: sections.sidebar?.[locale]?.items || [
                { id: 'Informasi', label: isEn ? 'Career Info' : 'Informasi Karir' },
                { id: 'HRD', label: isEn ? 'HRD Activities' : 'Kegiatan SDI' },
                { id: 'Contact', label: isEn ? 'Contact Us' : 'Hubungi Kami' },
            ],
        },
        main: {
            title: sections.informasi?.[locale]?.title || (isEn ? 'Growing with Values, Creating to Give Benefits' : 'Bertumbuh Bersama Nilai, Berkarya untuk Memberi Manfaat'),
            desc: sections.informasi?.[locale]?.description || (isEn ? 'At TAMZIS, we believe that organizational success is born from individuals who continue to grow.' : 'Di TAMZIS, kami percaya bahwa keberhasilan organisasi lahir dari insan-insan yang terus bertumbuh.'),
            startBtn: sections.informasi?.[locale]?.button_text || (isEn ? 'View Vacancies' : 'Lihat Lowongan'),
            values: sections.informasi?.[locale]?.values || [
                { title: 'Integrity', desc: isEn ? 'Upholding honesty and Islamic work ethics.' : 'Menjunjung tinggi kejujuran dan etika kerja Islami.' },
                { title: 'Professional', desc: isEn ? 'Providing the best service with high competence.' : 'Memberikan layanan terbaik dengan kompetensi tinggi.' },
                { title: 'Innovative', desc: isEn ? 'Continuously developing alongside technological progress.' : 'Terus berkembang mengikuti kemajuan teknologi.' },
            ],
        },
        hrd: {
            title: sections.hrd?.[locale]?.title || (isEn ? 'HRD & Development Activities' : 'Kegiatan HRD & Pengembangan'),
            desc: sections.hrd?.[locale]?.description || (isEn ? 'TAMZIS is committed to continuously improving the capacity and capability of every TAMZIS individual.' : 'TAMZIS berkomitmen untuk terus meningkatkan kapasitas dan kapabilitas setiap insan TAMZIS.'),
            programs: sections.hrd?.[locale]?.programs || [
                { title: 'Basic Sharia Training', desc: isEn ? 'Basic introduction to sharia economics and muamalah for new employees.' : 'Pembekalan dasar-dasar ekonomi syariah dan muamalah untuk karyawan baru.' },
                { title: 'Leadership Development', desc: isEn ? 'Leadership development program to shape future managerial cadres.' : 'Program pengembangan kepemimpinan untuk mencetak kader manajerial masa depan.' },
                { title: 'Service Excellence', desc: isEn ? 'Routine training to maintain excellent service standards for members.' : 'Pelatihan rutin untuk menjaga standar pelayanan prima kepada anggota.' },
            ],
        },
        lowongan: {
            title: sections.lowongan?.[locale]?.title || (isEn ? 'Active Vacancies' : 'Lowongan Aktif'),
            desc: sections.lowongan?.[locale]?.description || (isEn ? 'Find your best career opportunity at TAMZIS Bina Utama.' : 'Temukan peluang karir terbaik Anda di TAMZIS Bina Utama.'),
            empty: sections.lowongan?.[locale]?.empty_text || (isEn ? 'No vacancies available at this time.' : 'Belum ada lowongan yang tersedia saat ini.'),
            applyBtn: sections.lowongan?.[locale]?.apply_button || (isEn ? 'Apply Now' : 'Lamar Sekarang'),
        },
        contact: {
            title: sections.contact?.[locale]?.title || 'Contact Center',
            desc: sections.contact?.[locale]?.description || (isEn ? 'Have questions about our careers or services? Our Contact Center team is ready to help you.' : 'Punya pertanyaan tentang karir atau layanan kami? Tim Contact Center siap membantu Anda.'),
            email: sections.contact?.[locale]?.email || 'info@tamzis.id',
            phone: sections.contact?.[locale]?.phone || '0811-261-3134',
            wa: sections.contact?.[locale]?.whatsapp || '0811 2700 9068',
            waLabel: sections.contact?.[locale]?.whatsapp_label || (isEn ? 'WA CS HRD' : 'Wa CS HRD'),
            office: sections.contact?.[locale]?.office_label || (isEn ? 'Nearest Office' : 'Kantor Terdekat'),
        },
    };

    const menuItems = t.sidebar.items.map((item: { id: string; label: string }) => ({
        ...item,
        icon: item.id === 'Informasi' ? Home : item.id === 'HRD' ? ListChecks : item.id === 'Lowongan' ? Briefcase : item.id === 'Pendaftaran' ? FileText : MessageSquare,
    }));

    return (
        <div className="light flex min-h-screen flex-col bg-[#f8f9fa]">
            <Head title={t.title} />
            <TamzisHeader />

            {/* Image Header */}
            <div className="relative overflow-hidden border-b border-white/5 py-12 text-center text-white">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${t.backgroundImage}')`,
                    }}
                />
                <div className="absolute top-0 left-0 z-20 h-1 w-full bg-emerald-600" />
                <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                    <h1 className="text-3xl font-bold tracking-tight uppercase drop-shadow-md sm:text-5xl">
                        {t.title.split('-')[0]}
                    </h1>
                    <p className="mt-3 text-sm font-bold tracking-[0.3em] text-emerald-100 uppercase opacity-90 drop-shadow-md">
                        {t.subtitle}
                    </p>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row md:gap-8 md:px-6 md:py-10">
                {/* Floating Sidebar */}
                <aside className="w-full shrink-0 md:w-64">
                    <div className="border-slate-200 bg-white p-4 md:sticky md:top-24 md:rounded-2xl md:border md:shadow-md">
                        <div className="mt-2 mb-4 px-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            {t.sidebar.header}
                        </div>
                        <nav className="scrollbar-hide flex flex-row space-y-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
                            {menuItems.map((item: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }) => {
                                if (item.id === 'Pendaftaran') {
                                    return (
                                        <a
                                            key={item.id}
                                            href="https://karir.tamzis.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-12 w-auto shrink-0 items-center rounded-lg px-4 font-semibold text-slate-600 transition-all hover:bg-slate-50 md:w-full"
                                        >
                                            <item.icon className="mr-3 h-5 w-5 shrink-0" />
                                            <span className="whitespace-nowrap">
                                                {item.label}
                                            </span>
                                        </a>
                                    );
                                }

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveSidebarItem(item.id);
                                            setActiveMenu(item.id === 'Lowongan' ? 'Informasi' : item.id);

                                            if (item.id === 'Lowongan') {
                                                setTimeout(() => {
                                                    document.getElementById('vacancies-list')?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
                                            }
                                        }}
                                        className={`flex h-12 w-auto shrink-0 items-center rounded-lg px-4 transition-all md:w-full ${
                                            activeSidebarItem === item.id
                                                ? 'bg-emerald-600 font-bold text-white shadow-md shadow-emerald-200'
                                                : 'font-semibold text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <item.icon className="mr-3 h-5 w-5 shrink-0" />
                                        <span className="whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full flex-1 overflow-hidden p-4 md:p-0">
                    {/* Tab: Contact Center */}
                    {activeMenu === 'Contact' && (
                        <div className="animate-in space-y-8 duration-500 fade-in slide-in-from-bottom-4">
                            <Card className="group relative overflow-hidden border border-slate-200 bg-white shadow-xl">
                                <div className="absolute top-0 right-0 -mt-40 -mr-40 h-80 w-80 rounded-full bg-emerald-50 opacity-40 blur-3xl transition-opacity group-hover:opacity-60" />
                                <CardHeader className="relative z-10 px-8 pt-16 pb-8 sm:px-14">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-3xl leading-tight font-bold tracking-tight text-emerald-950 sm:text-5xl">
                                        {t.contact.title}
                                    </CardTitle>
                                    <CardDescription
                                        className="prose prose-slate mt-6 max-w-2xl text-xl leading-relaxed font-medium text-slate-500"
                                        dangerouslySetInnerHTML={{ __html: t.contact.desc }}
                                    />
                                </CardHeader>
                                <CardContent className="relative z-10 px-8 pb-16 sm:px-14">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-emerald-950">Email</h3>
                                                <p className="mt-1 font-medium text-slate-500">{t.contact.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-emerald-950">{t.contact.office}</h3>
                                                <p className="mt-1 font-medium text-slate-500">{t.contact.office}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-emerald-950">{t.contact.waLabel}</h3>
                                                <p className="mt-1 font-bold text-emerald-700">{t.contact.wa}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Tab: Informasi Karir */}
                    {activeMenu === 'Informasi' && (
                        <div className="animate-in space-y-8 duration-500 fade-in slide-in-from-bottom-4">
                            <Card className="group relative overflow-hidden border border-slate-200 bg-white shadow-xl">
                                <div className="absolute top-0 right-0 -mt-40 -mr-40 h-80 w-80 rounded-full bg-emerald-50 opacity-40 blur-3xl transition-opacity group-hover:opacity-60" />
                                <CardHeader className="relative z-10 px-8 pt-16 pb-8 sm:px-14">
                                    <CardTitle className="text-3xl leading-tight font-bold tracking-tight text-emerald-950 sm:text-5xl">
                                        {t.main.title}
                                    </CardTitle>
                                    <div
                                        className="prose prose-slate mt-6 max-w-3xl text-lg leading-relaxed text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: t.main.desc }}
                                    />
                                </CardHeader>
                                <CardFooter className="relative z-10 px-8 pb-16 sm:px-14">
                                    <Button
                                        size="lg"
                                        onClick={() =>
                                            document
                                                .getElementById('vacancies-list')
                                                ?.scrollIntoView({ behavior: 'smooth' })
                                        }
                                        className="h-16 rounded-full bg-emerald-700 px-12 font-bold tracking-widest text-white uppercase shadow-xl transition-transform hover:bg-emerald-800 active:scale-95"
                                    >
                                        {t.main.startBtn} <ArrowRight className="ml-3 h-5 w-5" />
                                    </Button>
                                </CardFooter>
                            </Card>

                            <div id="vacancies-list" className="pt-8">
                                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                    <div>
                                        <h2 className="text-3xl font-bold text-emerald-950">
                                            {t.lowongan.title}
                                        </h2>
                                        <div
                                            className="prose prose-slate prose-sm mt-2 max-w-none font-medium text-slate-500"
                                            dangerouslySetInnerHTML={{ __html: t.lowongan.desc }}
                                        />
                                    </div>
                                </div>

                                {!vacancies || vacancies.length === 0 ? (
                                    <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                                        <Briefcase className="mx-auto mb-4 h-12 w-12 text-slate-300" />
                                        <p className="text-lg font-medium text-slate-500">
                                            {t.lowongan.empty}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {vacancies.map((vacancy) => (
                                            <Card
                                                key={vacancy.id}
                                                className="overflow-hidden border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
                                            >
                                                {vacancy.image_path && (
                                                    <div className="relative h-48 w-full overflow-hidden border-b border-slate-100 bg-slate-100">
                                                        <picture>
                                                            <source srcSet={webpSource(vacancy.image_path)} type="image/webp" />
                                                            <img
                                                                src={vacancy.image_path}
                                                                alt={vacancy.title}
                                                                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                                            />
                                                        </picture>
                                                    </div>
                                                )}
                                                <CardHeader>
                                                    <CardTitle className="text-xl font-bold text-slate-900">
                                                        {vacancy.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1 text-xs text-slate-500">
                                                        Diposting pada{' '}
                                                        {new Date(vacancy.created_at).toLocaleDateString(
                                                            locale === 'id' ? 'id-ID' : 'en-US',
                                                            { day: 'numeric', month: 'long', year: 'numeric' },
                                                        )}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div
                                                        className="prose prose-sm line-clamp-4 max-w-none text-sm leading-relaxed whitespace-pre-wrap text-slate-600"
                                                        dangerouslySetInnerHTML={{
                                                            __html: vacancy.description,
                                                        }}
                                                    />
                                                </CardContent>
                                                <CardFooter>
                                                    <Button
                                                        onClick={() => {
                                                            const link = vacancy.apply_link || 'https://karir.tamzis.id/';
                                                            window.open(link, '_blank', 'noopener,noreferrer');
                                                        }}
                                                        className="w-full border border-emerald-200 bg-emerald-50 font-bold text-emerald-700 transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                                                    >
                                                        {t.lowongan.applyBtn}
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab: Kegiatan HRD */}
                    {activeMenu === 'HRD' && (
                        <div className="animate-in space-y-8 duration-500 fade-in slide-in-from-bottom-4">
                            <div className="mx-auto mb-10 max-w-2xl text-center">
                                <h2 className="mb-4 text-3xl font-bold text-emerald-950">
                                    {t.hrd.title}
                                </h2>
                                <div
                                    className="prose prose-slate mx-auto max-w-none text-lg leading-relaxed font-medium text-slate-500"
                                    dangerouslySetInnerHTML={{ __html: t.hrd.desc }}
                                />
                            </div>

                            <div className="grid gap-6">
                                {t.hrd.programs.map((prog: { title: string; desc: string; image?: string }, i: number) => (
                                    <div
                                        key={i}
                                        className="group flex flex-col items-start gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md sm:flex-row"
                                    >
                                        {prog.image ? (
                                            <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-64">
                                                <picture>
                                                    <source srcSet={webpSource(prog.image.startsWith('http') || prog.image.startsWith('/') ? prog.image : `/${prog.image}`)} type="image/webp" />
                                                    <img
                                                        src={prog.image.startsWith('http') || prog.image.startsWith('/') ? prog.image : `/${prog.image}`}
                                                        alt={prog.title}
                                                        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </picture>
                                            </div>
                                        ) : (
                                            <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                                                <Briefcase className="h-7 w-7" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold text-slate-800">
                                                {prog.title}
                                            </h3>
                                            <div
                                                className="prose prose-slate prose-sm max-w-none leading-relaxed font-medium text-slate-500"
                                                dangerouslySetInnerHTML={{ __html: prog.desc }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <TamzisFooter />
        </div>
    );
}
