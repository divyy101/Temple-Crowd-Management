import React, { useState } from 'react';
import { TrendingDown, Clock, Calendar, Users, Sun, Moon, Star, AlertCircle, BarChart3, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { getHourlyForecast, getWeeklyForecast, TEMPLE_METADATA } from '../../services/templeDataService';

import { Language } from '../../utils/translations';

interface CrowdAvoidanceProps {
  templeData: any;
  selectedTemple: string;
  language?: Language;
}

const CrowdAvoidance: React.FC<CrowdAvoidanceProps> = ({
  templeData,
  selectedTemple,
  language = 'en'
}) => {
  const [view, setView] = useState<'hourly' | 'weekly'>('hourly');
  const currentTemple = templeData[selectedTemple];
  const meta = TEMPLE_METADATA[selectedTemple];

  // Get real computed forecast data
  const hourlyData = getHourlyForecast(selectedTemple);
  const weeklyData = getWeeklyForecast(selectedTemple);

  // Find best visiting time
  const bestHourly = hourlyData.reduce((best, curr) => curr.crowd < best.crowd ? curr : best, hourlyData[0]);
  const bestWeekly = weeklyData.reduce((best, curr) => curr.crowd < best.crowd ? curr : best, weeklyData[0]);

  const currentHour = new Date().getHours();

  const getBarColor = (crowd: number) => {
    if (crowd > 80) return 'bg-red-500';
    if (crowd > 60) return 'bg-orange-400';
    if (crowd > 35) return 'bg-amber-400';
    return 'bg-emerald-500';
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Best': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Good': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time);
    if (hour >= 5 && hour < 7) return <Sun className="h-3.5 w-3.5 text-amber-500" />;
    if (hour >= 7 && hour < 16) return <Sun className="h-3.5 w-3.5 text-yellow-500" />;
    if (hour >= 16 && hour < 19) return <Star className="h-3.5 w-3.5 text-orange-500" />;
    return <Moon className="h-3.5 w-3.5 text-indigo-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="crowd-avoid-header-card">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-purple-600" />
                Crowd Avoidance Guide — {currentTemple?.name}
              </CardTitle>
              <CardDescription className="mt-1">
                Smart recommendations based on real-time patterns & historical data
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === 'hourly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('hourly')}
                className={view === 'hourly' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <Clock className="h-4 w-4 mr-1.5" />
                Today's Forecast
              </Button>
              <Button
                variant={view === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('weekly')}
                className={view === 'weekly' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                Best Day to Visit
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Best Time Recommendation */}
      <Alert className="bg-emerald-50 border-emerald-200">
        <Sparkles className="h-4 w-4 text-emerald-600" />
        <AlertDescription className="text-emerald-800">
          <strong>Best time to visit today:</strong> {bestHourly.time} ({bestHourly.crowd}% crowd)
          {' • '}
          <strong>Best day this week:</strong> {bestWeekly.day} ({bestWeekly.crowd}% average crowd)
          {meta && ` • Temple open ${meta.dailyTimings.open} – ${meta.dailyTimings.close}`}
        </AlertDescription>
      </Alert>

      {/* Hourly View */}
      {view === 'hourly' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Hourly Crowd Forecast — Today
            </CardTitle>
            <CardDescription>
              Crowd prediction based on time-of-day, day-of-week, and seasonal patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Visual bar chart */}
            <div className="crowd-bars-container mb-6">
              {hourlyData.map((slot, idx) => {
                const hourNum = parseInt(slot.time);
                const isCurrentHour = hourNum === currentHour;
                return (
                  <div key={idx} className={`crowd-bar-item ${isCurrentHour ? 'crowd-bar-current' : ''}`}>
                    <div className="crowd-bar-value">
                      <span className="text-[10px] font-semibold text-gray-600">{slot.crowd}%</span>
                    </div>
                    <div className="crowd-bar-track">
                      <div
                        className={`crowd-bar-fill ${getBarColor(slot.crowd)}`}
                        style={{ height: `${Math.max(4, slot.crowd)}%` }}
                      />
                    </div>
                    <div className="crowd-bar-label">
                      {getTimeIcon(slot.time)}
                      <span className="text-[10px] text-gray-500">{slot.time}</span>
                    </div>
                    {isCurrentHour && (
                      <div className="crowd-bar-now">NOW</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2 border-t">
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /> Low (&lt;35%)</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-400" /> Moderate (35-60%)</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-orange-400" /> High (60-80%)</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500" /> Peak (&gt;80%)</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly View */}
      {view === 'weekly' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              Best Day to Visit — Weekly Analysis
            </CardTitle>
            <CardDescription>
              Average crowd levels by day of week, adjusted for current season
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyData.map((day, idx) => {
                const isToday = idx === new Date().getDay();
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isToday ? 'bg-purple-50/50 border-purple-200 shadow-sm' : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-20">
                      <p className="font-semibold text-gray-900">{day.day.slice(0, 3)}</p>
                      {isToday && <Badge className="bg-purple-100 text-purple-700 text-[10px] mt-0.5">Today</Badge>}
                    </div>

                    <div className="flex-1">
                      <Progress value={day.crowd} className="h-3" />
                    </div>

                    <div className="w-14 text-right">
                      <span className="font-bold text-lg">{day.crowd}%</span>
                    </div>

                    <Badge className={`min-w-[80px] justify-center ${getRecommendationColor(day.recommendation)}`}>
                      {day.recommendation}
                    </Badge>

                    <div className="hidden md:block w-48">
                      <p className="text-xs text-gray-500">{day.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Aarti Timings */}
      {meta && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-5">
            <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-amber-600" />
              Aarti Schedule — {meta.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {meta.dailyTimings.aarti.map((time, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-amber-200 shadow-sm">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-900">{time}</span>
                  <span className="text-xs text-amber-600">
                    {idx === 0 ? 'Morning' : idx === meta.dailyTimings.aarti.length - 1 ? 'Evening' : 'Midday'}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-700 mt-3">
              Peak crowd: 30-45 min before aarti. For shorter queues, arrive 15 min early or 30 min after.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Pro tips for a peaceful darshan:</strong> Visit on weekdays (Tue–Thu) during off-season (Apr–Jun). 
          Early morning (5–6 AM) offers the shortest queues and most serene atmosphere. 
          Avoid festival dates unless you plan to experience the celebrations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CrowdAvoidance;