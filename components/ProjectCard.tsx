import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const availableUnits = project.unitTypes.filter((u) => u.status !== 'Sold Out');
  const lowestMonthly = Math.min(...availableUnits.map((u) => u.estMonthlyPagIbigPhp));

  return (
    <article className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Property Visual Header */}
      <div className="relative h-60 w-full overflow-hidden bg-stone-100">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient rounded-full shadow">
            {project.badge}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-semibold text-white bg-charcoal-900/80 backdrop-blur-sm rounded-full">
            {project.constructionStatus}
          </span>
        </div>

        {/* Bottom Card Title & Location */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-serif text-xl font-bold tracking-tight text-white drop-shadow">
            {project.name}
          </h3>
          <p className="flex items-center text-xs text-stone-200 mt-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-gold-400 flex-shrink-0" />
            <span>{project.location.address}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        {/* Pricing Highlights */}
        <div className="flex items-baseline justify-between pb-4 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
              Total Contract Price
            </span>
            <span className="text-lg font-bold text-charcoal-900">
              {project.priceRangeFormatted}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
              Est. Monthly (Pag-IBIG)
            </span>
            <span className="text-base font-bold text-gold-700">
              From ~₱{lowestMonthly.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Available Unit Cuts */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Available Unit Configurations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.unitTypes.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <span
                  key={unit.id}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                    isSoldOut
                      ? 'bg-stone-100 text-stone-400 border-stone-200 line-through'
                      : 'bg-gold-50 text-gold-900 border-gold-200'
                  }`}
                >
                  {unit.category} ({unit.areaSqm} sqm)
                </span>
              );
            })}
          </div>
        </div>

        {/* Top 3 Amenities */}
        <div className="space-y-1.5 text-xs text-stone-600">
          {project.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity.name} className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span className="truncate">{amenity.name}</span>
            </div>
          ))}
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <Link
            href={`/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-gold-100 hover:text-gold-900 rounded-md transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>

          <Link
            href={`/inquire-now?project=${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-md shadow-sm transition-all"
          >
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
