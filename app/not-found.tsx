import React from 'react';
import Link from 'next/link';
import { Home, Search, Building2, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full gold-gradient text-charcoal-900 flex items-center justify-center mx-auto shadow-md">
          <Search className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
            404 Error • Page Not Found
          </span>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
            Looking for an Urban Deca Homes property?
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            The page you requested may have moved or been renamed. You can explore our active Metro Manila condominium developments below:
          </p>
        </div>

        {/* Quick Property Links */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm text-left divide-y divide-stone-100">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${project.slug}`}
              className="flex items-center justify-between py-3 px-2 hover:bg-gold-50 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Building2 className="w-4 h-4 text-gold-600" />
                <div>
                  <span className="block text-sm font-semibold text-charcoal-900 group-hover:text-gold-800">
                    {project.name}
                  </span>
                  <span className="block text-xs text-stone-500">
                    {project.location.city} • {project.priceRangeFormatted}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-gold-700 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient rounded-lg shadow hover:opacity-95 transition-all"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
