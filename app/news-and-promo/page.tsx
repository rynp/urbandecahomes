import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, Newspaper } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { newsArticles } from '@/data/news';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes News and Promotions | Official Updates',
  description:
    'Browse the latest Urban Deca Homes announcements, low cash-out promos, project development milestones, and government Pag-IBIG housing news.',
  path: '/news-and-promo',
  keywords: [
    'Urban Deca Homes promotions',
    'Urban Deca Homes news',
    'Pag-IBIG promo condo Manila',
    '8990 Holdings updates',
    'Urban Deca Homes low cash out',
  ],
});

export default function NewsAndPromoPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'News & Promotions', path: '/news-and-promo' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-14 sm:py-16 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <Newspaper className="w-4 h-4" />
            <span>Official Announcements</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            News, Promos & Community Updates
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Stay informed on our latest Ready-for-Occupancy payment promos, developer milestones, and community announcements across Metro Manila.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-black/10" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient rounded-full shadow">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-xs text-stone-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-gold-600" />
                      <span>{article.formattedDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span>{article.readingTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-800 transition-colors">
                    <Link href={`/news-and-promo/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-stone-400">
                    By {article.author}
                  </span>
                  <Link
                    href={`/news-and-promo/${article.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-800 hover:text-gold-900 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
