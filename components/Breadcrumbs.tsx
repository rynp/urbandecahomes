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
        className="relative z-20 py-2 px-4 bg-[#F8F3E4]/95 backdrop-blur-md border-b border-[#E8DEC4] transition-colors"
      >
        <div className="manila-section-container flex items-center space-x-2 text-xs md:text-sm text-[#544D40] overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link
            href="/"
            className="flex items-center text-[#544D40] hover:text-[#241E15] transition-colors group font-medium"
            title="Urban Deca Homes Homepage"
          >
            <Home className="w-3.5 h-3.5 mr-1.5 text-[#B88A22] group-hover:scale-110 transition-transform" />
            <span>Home</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={item.path}>
                <ChevronRight className="w-3.5 h-3.5 text-[#A89E8C] flex-shrink-0" />
                {isLast ? (
                  <span
                    className="font-semibold text-[#241E15] tracking-wide truncate bg-white/85 px-2.5 py-0.5 rounded-md border border-[#DFBD58]/50 shadow-xs"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-[#544D40] hover:text-[#241E15] transition-colors truncate font-medium"
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
