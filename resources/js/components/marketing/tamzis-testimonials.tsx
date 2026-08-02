import { usePage } from '@inertiajs/react';
import { Quote } from 'lucide-react';

type Testimonial = {
    name: string;
    occupation: string | null;
    location: string | null;
    quote: string;
    photo_url?: string | null;
    locale: string;
    order: number;
    created_at: string;
};

function initials(name: string): string {
    return name
        .replace(/^(Ibu|Bapak|Mrs\.|Mr\.)\s+/i, '')
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

export function TamzisTestimonials() {
    const { props } = usePage<{ locale?: string; testimonials?: Testimonial[] }>();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const allTestimonials = (props.testimonials ?? [])
        .sort((a, b) => {
            if (a.order !== b.order) {
                return a.order - b.order;
            }

            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });

    const localizedTestimonials = allTestimonials.filter(
        (testimonial) => testimonial.locale === locale,
    );

    const testimonials =
        localizedTestimonials.length > 0 ? localizedTestimonials : allTestimonials;

    return (
        <section className="overflow-hidden border-t border-slate-200 bg-[#f8f9fa] py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="mb-6 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold tracking-widest text-orange-700 uppercase">
                        {isEn ? 'Member Testimonials' : 'Testimoni Anggota'}
                    </span>
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-emerald-950 sm:text-6xl">
                        {isEn ? 'Success Stories with TAMZIS' : 'Kisah Sukses Bersama TAMZIS'}
                    </h2>
                    <p className="text-base leading-relaxed font-medium text-slate-500">
                        {isEn
                            ? 'Real stories from TAMZIS members across our service areas.'
                            : 'Cerita nyata dari anggota TAMZIS di berbagai wilayah layanan.'}
                    </p>
                </div>

                {testimonials.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
                        {isEn ? 'No testimonials are available yet.' : 'Belum ada testimoni yang tersedia.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {testimonials.map((t) => (
                            <figure
                                key={t.name + t.quote}
                                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                            >
                                <Quote className="h-8 w-8 rotate-180 text-emerald-200" aria-hidden />
                                <blockquote
                                    className="prose prose-sm mt-4 max-w-none flex-1 text-sm leading-relaxed font-medium text-slate-600"
                                    dangerouslySetInnerHTML={{ __html: t.quote }}
                                />
                                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                                    {t.photo_url ? (
                                        <img
                                            src={t.photo_url}
                                            alt={t.name}
                                            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-emerald-100"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-sm font-extrabold text-white ring-2 ring-emerald-100">
                                            {initials(t.name)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="text-sm font-extrabold text-emerald-900">
                                            {t.name}
                                        </div>
                                        <div className="text-xs font-semibold text-emerald-700">
                                            {t.occupation ?? ''}
                                        </div>
                                        <div className="mt-0.5 truncate text-[11px] font-medium text-slate-500">
                                            {t.location ?? ''}
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
