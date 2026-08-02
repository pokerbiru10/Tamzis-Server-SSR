import { Head } from '@inertiajs/react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

type PageContent = {
    id: number;
    slug: string;
    locale: string;
    title: string;
    content: string | null;
    meta_description: string | null;
};

export default function PageView({ pageContent }: { pageContent: PageContent }) {
    const isEn = pageContent.locale === 'en';

    return (
        <>
            <Head title={pageContent.title}>
                {pageContent.meta_description && (
                    <meta name="description" content={pageContent.meta_description} />
                )}
            </Head>

            <div className="min-h-screen bg-white text-emerald-950">
                <TamzisHeader />

                <div className="bg-emerald-800 px-6 py-12 text-center text-white sm:py-16">
                    <h1 className="mx-auto max-w-4xl text-3xl leading-tight font-bold sm:text-5xl">
                        {pageContent.title}
                    </h1>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
                    {pageContent.content ? (
                        <div
                            className="prose prose-emerald sm:prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: pageContent.content }}
                        />
                    ) : (
                        <p className="py-8 text-center text-sm text-slate-500">
                            {isEn ? 'This page content is not yet available.' : 'Konten halaman ini belum tersedia.'}
                        </p>
                    )}
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
