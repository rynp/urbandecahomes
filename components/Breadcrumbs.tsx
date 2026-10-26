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
            className="group relative inline-flex items-center py-0.5 font-medium text-[#544D40] hover:text-[#CE2029] transition-colors duration-200"
            title="Urban Deca Homes Homepage"
          >
            <Home className="w-3.5 h-3.5 mr-1.5 text-[#B88A22] group-hover:text-[#CE2029] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
            <span className="relative">
              Home
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#CE2029] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left rounded-full" />
            </span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={item.path}>
                <ChevronRight className="w-3.5 h-3.5 text-[#A89E8C] flex-shrink-0" />
                {isLast ? (
                  <span
                    className="group/active relative inline-flex items-center font-bold text-[#CE2029] tracking-wide truncate py-0.5 cursor-default transition-all duration-300 hover:drop-shadow-[0_2px_8px_rgba(206,32,41,0.25)]"
                    aria-current="page"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] shadow-[0_0_8px_rgba(206,32,41,0.6)] mr-2 flex-shrink-0 transition-transform duration-300 group-hover/active:scale-125" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#CE2029] via-[#E59E38] to-[#CE2029] scale-x-0 group-hover/active:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full" />
                    </span>
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="group relative inline-flex items-center py-0.5 font-medium text-[#544D40] hover:text-[#CE2029] transition-colors duration-200 truncate"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#CE2029] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left rounded-full" />
                    </span>
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
