import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import InquiryForm from '@/components/InquiryForm';
import { newsArticles, getArticleBySlug } from '@/data/news';
import { constructMetadata } from '@/lib/seo';
import { getArticleSchema } from '@/lib/schema';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/news-and-promo/${article.slug}`,
    image: article.image,
    keywords: article.tags,
  });
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={getArticleSchema(article)} />
      <Breadcrumbs
        items={[
          { name: 'News & Promos', path: '/news-and-promo' },
          { name: article.title, path: `/news-and-promo/${article.slug}` },
        ]}
      />

      {/* Article Header */}
      <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/news-and-promo"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-gold-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Announcements</span>
          </Link>

          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-gold-100 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500">{article.readingTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 text-xs text-stone-500 mt-4 pb-6 border-b border-stone-200">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-gold-600" />
              <span>Published on {article.formattedDate}</span>
            </span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-10 shadow-md">
          <div
            className="h-80 sm:h-96 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-5">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-8 mt-10 border-t border-stone-200 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-stone-400 mr-1" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-stone-100 text-stone-700 rounded-md font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* In-article conversion box */}
        <div className="mt-12 p-8 rounded-2xl bg-stone-100/80 border border-stone-200 text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-charcoal-900">
            Interested in Availing of this Promotion or Viewing Available Units?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Our accredited property specialists can verify ongoing promotions and furnish you with official Pag-IBIG computation schedules.
          </p>
          <Link
            href="/inquire-now"
            className="inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
          >
            <span>Inquire About This Offer</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </article>
    </>
  );
}
