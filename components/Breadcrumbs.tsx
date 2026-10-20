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
      <nav aria-label="Breadcrumb" className="py-3 px-4 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs md:text-sm text-stone-600 overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="flex items-center hover:text-gold-700 transition-colors"
            title="Urban Deca Homes Homepage"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={item.path}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-charcoal-900 truncate" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-gold-700 transition-colors truncate"
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
