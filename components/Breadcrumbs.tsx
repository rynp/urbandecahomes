import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schema';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems = [{ name: 'Home', path: '/' }, ...items];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(fullItems)} />
      <nav
        id="page-breadcrumbs"
        aria-label="Breadcrumb"
        className="relative z-20 py-2.5 px-4 bg-charcoal-950/90 backdrop-blur-md border-b border-white/[0.08] transition-colors"
      >
        <div className="manila-section-container flex items-center space-x-2 text-xs md:text-sm text-stone-300 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link
            href="/"
            className="flex items-center text-stone-300 hover:text-gold-400 transition-colors group font-medium"
            title="Urban Deca Homes Homepage"
          >
            <Home className="w-3.5 h-3.5 mr-1.5 text-gold-400 group-hover:scale-110 transition-transform" />
            <span>Home</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={item.path}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                {isLast ? (
                  <span
                    className="font-semibold text-white tracking-wide truncate bg-white/[0.08] px-2.5 py-0.5 rounded-md border border-white/10 shadow-2xs"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-stone-300 hover:text-gold-400 transition-colors truncate font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
}
