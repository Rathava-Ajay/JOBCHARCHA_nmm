import React, { useState } from 'react';
import { BookOpen, Download, Star, Filter, Search, FileText, Video, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudyMaterial } from '../types';
import { INITIAL_STUDY_MATERIALS } from '../data/mockData';

export const StudyMaterialSection: React.FC = () => {
  const [materials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'UPSC', 'SSC', 'Banking', 'Railways', 'Defense', 'State PSC'];
  const types = ['All', 'Notes', 'Book PDF', 'Video', 'Syllabus'];

  const filteredMaterials = materials.filter((m) => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchType = selectedType === 'All' || m.type === selectedType;
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const handleDownload = (title: string) => {
    alert(`Downloading PDF / Material: "${title}"... Instant offline access granted.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Official Study Materials & Syllabus Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            Free High-Yield Notes, Mindmaps & Syllabus PDFs
          </h2>
          <p className="text-xs text-slate-500">
            Verified study modules curated by toppers and expert exam faculty across India.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, polity, quant..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Filter Bars */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedType === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                  {material.category} • {material.subject}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{material.rating}</span>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
                {material.title}
              </h3>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span>By {material.author}</span>
                <span>•</span>
                <span className="font-mono text-slate-700 font-bold">{material.fileSize}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Syllabus Aligned
              </span>
              <button
                onClick={() => handleDownload(material.title)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Free Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
