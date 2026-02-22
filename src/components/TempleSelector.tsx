import React from 'react';
import { MapPin, Star, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TEMPLE_METADATA } from '../services/templeDataService';
import { Language, getTranslation, getTempleTranslation } from '../utils/translations';

interface TempleSelectorProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  language?: Language;
}

const TempleSelector: React.FC<TempleSelectorProps> = ({
  templeData,
  selectedTemple,
  onTempleChange,
  language = 'en',
}) => {
  const temples = Object.keys(TEMPLE_METADATA);

  return (
    <div className="temple-selector-wrapper">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-violet-500" />
        Select Temple
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {temples.map((templeId) => {
          const meta = TEMPLE_METADATA[templeId];
          const live = templeData[templeId];
          const isSelected = templeId === selectedTemple;

          // Get overall crowd from live data
          let avgCrowd = 0;
          if (live?.zones) {
            const vals = Object.values(live.zones) as any[];
            avgCrowd = Math.round(vals.reduce((sum: number, z: any) => sum + z.density, 0) / vals.length);
          }

          const crowdColor = avgCrowd > 70 ? 'text-red-600' : avgCrowd > 40 ? 'text-amber-600' : 'text-emerald-600';
          const crowdBg = avgCrowd > 70 ? 'bg-red-50' : avgCrowd > 40 ? 'bg-amber-50' : 'bg-emerald-50';

          return (
            <Card
              key={templeId}
              className={`temple-selector-card cursor-pointer transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-100'
                  : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
              onClick={() => onTempleChange(templeId)}
            >
              <div className="relative h-28 shrink-0">
                <ImageWithFallback
                  src={meta.imageUrl}
                  alt={meta.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center shadow">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight drop-shadow-md line-clamp-1">
                    {language !== 'en' ? getTempleTranslation(language, templeId) || meta.name : meta.name}
                  </h4>
                  <p className="text-white/80 text-[10px] sm:text-[11px] flex items-center gap-1 mt-0.5 line-clamp-1">
                    <MapPin className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{meta.district}</span>
                  </p>
                </div>
              </div>

              <CardContent className="p-2 sm:p-2.5 flex-1 flex flex-col justify-center">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-1.5 xl:gap-0">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">
                    <Clock className="h-3 w-3 shrink-0" />
                    {meta.dailyTimings.open} – {meta.dailyTimings.close}
                  </div>
                  <Badge className={`text-[9px] sm:text-[10px] px-1.5 py-0 ${crowdBg} ${crowdColor} border-0 self-start xl:self-auto shrink-0 w-max`}>
                    <Users className="h-2.5 w-2.5 mr-0.5" />
                    {avgCrowd}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TempleSelector;