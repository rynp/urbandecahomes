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
    <article className="futuristic-card cyber-corner bg-white rounded-2xl shadow-lg border border-stone-200/90 overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:border-gold-400/50">
      {/* Property Visual Header */}
      <div className="relative h-64 w-full overflow-hidden bg-charcoal-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        {/* Futuristic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-charcoal-950 gold-gradient rounded-full shadow-md flex items-center space-x-1">
              <span>{project.badge}</span>
            </span>
            <span className="px-2.5 py-1 text-[11px] font-medium text-stone-200 bg-charcoal-900/80 backdrop-blur-md rounded-full border border-white/10 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.constructionStatus}</span>
            </span>
          </div>
          
          {/* Pag-IBIG Live Tag */}
          <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold text-gold-300 bg-black/60 backdrop-blur-md rounded border border-gold-400/30">
            Pag-IBIG Accredited
          </span>
        </div>

        {/* Bottom Card Title & Location */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md group-hover:text-gold-300 transition-colors">
            {project.name}
          </h3>
          <p className="flex items-center text-xs text-stone-300 mt-1.5">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#eb6753] flex-shrink-0 animate-pulse" />
            <span className="truncate">{project.location.address}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-stone-50/60">
        {/* Pricing Highlights in Futuristic Glass Box */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-100/70 border border-stone-200/80 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Contract Price (TCP)
            </span>
            <span className="text-base sm:text-lg font-extrabold text-charcoal-900 block leading-tight mt-0.5">
              {project.priceRangeFormatted}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Est. Monthly Amort.
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#eb6753] block leading-tight mt-0.5">
              From ~₱{lowestMonthly.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Available Unit Cuts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
              Available Unit Configurations:
            </span>
            <span className="text-[10px] font-medium text-stone-400">
              Turnover Ready
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.unitTypes.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <span
                  key={unit.id}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    isSoldOut
                      ? 'bg-stone-100 text-stone-400 border-stone-200 line-through opacity-70'
                      : 'bg-white hover:bg-gold-50 text-stone-800 hover:text-gold-950 border-stone-200 hover:border-gold-300 shadow-2xs'
                  }`}
                >
                  {unit.category} <span className="text-stone-400">({unit.areaSqm} sqm)</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Top 3 Amenities */}
        <div className="space-y-1.5 text-xs text-stone-600 pt-1">
          {project.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity.name} className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{amenity.name}</span>
            </div>
          ))}
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
          <Link
            href={`/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-stone-200 hover:text-black rounded-xl transition-all group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            href={`/inquire-now?project=${project.slug}`}
            className="flex-1 btn-futuristic inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-md shadow-[#eb6753]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

