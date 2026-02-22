import React from 'react';
import { MapPin, Star, Clock, Users, Info, Globe, Landmark, ExternalLink, Phone, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TEMPLE_METADATA } from '../services/templeDataService';
import { Language } from '../utils/translations';

interface TempleInfoProps {
  templeData: any;
  selectedTemple: string;
  language?: Language;
}

const TempleInfo: React.FC<TempleInfoProps> = ({ templeData, selectedTemple, language = 'en' }) => {
  const meta = TEMPLE_METADATA[selectedTemple];
  const currentTemple = templeData[selectedTemple];

  if (!meta) return null;

  return (
    <div className="space-y-5">
      {/* Hero Image + Basic Info */}
      <Card className="overflow-hidden temple-info-hero-card">
        <div className="relative h-56 md:h-72">
          <ImageWithFallback
            src={meta.imageUrl}
            alt={meta.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{meta.name}</h2>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin className="h-4 w-4" />
                  {meta.location}, {meta.district}, {meta.state}
                </div>
              </div>
              <Badge className="bg-white/20 text-white backdrop-blur-md border-white/30">
                <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-400" />
                Sacred Site
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="temple-info-stat-card">
          <CardContent className="p-4 text-center">
            <Landmark className="h-5 w-5 text-violet-600 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-gray-500">Deity</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{meta.deity}</p>
          </CardContent>
        </Card>

        <Card className="temple-info-stat-card">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-gray-500">Open</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">
              {meta.dailyTimings.open} – {meta.dailyTimings.close}
            </p>
          </CardContent>
        </Card>

        <Card className="temple-info-stat-card">
          <CardContent className="p-4 text-center">
            <Users className="h-5 w-5 text-emerald-600 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-gray-500">Avg. Daily</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">
              {meta.averageDailyVisitors.toLocaleString()} visitors
            </p>
          </CardContent>
        </Card>

        <Card className="temple-info-stat-card">
          <CardContent className="p-4 text-center">
            <Globe className="h-5 w-5 text-sky-600 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-gray-500">Architecture</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2">{meta.architecture}</p>
          </CardContent>
        </Card>
      </div>

      {/* Significance & History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-violet-600" />
            About {meta.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-100">
            <p className="text-sm font-semibold text-violet-900 mb-1">Historical Significance</p>
            <p className="text-sm text-gray-700 leading-relaxed">{meta.significance}</p>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
            <p className="text-sm font-semibold text-amber-900 mb-1">Established</p>
            <p className="text-sm text-gray-700">{meta.established}</p>
          </div>
        </CardContent>
      </Card>

      {/* Aarti Timings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-amber-600" />
            Daily Aarti Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {meta.dailyTimings.aarti.map((time, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-amber-900">{time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Festivals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-rose-600" />
            Major Festivals
          </CardTitle>
          <CardDescription>Plan ahead — expect higher crowds during festivals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {meta.festivals.map((fest, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div>
                  <p className="font-semibold text-gray-900">{fest.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{fest.month}</p>
                </div>
                <Badge className={`text-xs ${
                  fest.crowdMultiplier > 3 ? 'bg-red-100 text-red-700' :
                  fest.crowdMultiplier > 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {fest.crowdMultiplier}x crowd
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Attractions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Nearby Attractions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {meta.nearbyAttractions.map((place, idx) => (
              <Badge key={idx} variant="outline" className="px-3 py-1.5 text-sm bg-white border-gray-200 hover:bg-gray-50">
                <MapPin className="h-3 w-3 mr-1.5 text-emerald-500" />
                {place}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Links */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-900">{meta.contactNumber}</span>
            </div>
            <a
              href={meta.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Official Website
            </a>
            <a
              href={`https://maps.google.com/?q=${meta.coordinates.lat},${meta.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              View on Google Maps
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TempleInfo;