import React from 'react';
import { Activity, Users, AlertTriangle, TrendingUp, Clock, Shield, Eye, Zap, Thermometer, Wind, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import TempleSelector from '../TempleSelector';
import { getFootfallData, getTempleWeather, TEMPLE_METADATA } from '../../services/templeDataService';

const AuthorityDashboard = ({ templeData, selectedTemple, onTempleChange, events, language = 'en' }) => {
  const currentTemple = templeData[selectedTemple];
  const crowdData = currentTemple.zones;
  const meta = TEMPLE_METADATA[selectedTemple];
  const footfall = getFootfallData(selectedTemple);
  const weather = getTempleWeather(selectedTemple);

  // Calculate statistics from real data
  const zoneValues = Object.values(crowdData) as any[];
  const totalCrowdLevel = Math.round(
    zoneValues.reduce((sum: number, zone: any) => sum + zone.density, 0) / zoneValues.length
  );

  const criticalZones = zoneValues.filter((zone: any) => zone.status === 'critical').length;
  const highAlertZones = zoneValues.filter((zone: any) => zone.status === 'high').length;

  // System status (realistic for demo)
  const systemStatus = {
    cameras: { active: 24, total: 28, status: 'operational' },
    sensors: { active: 45, total: 48, status: 'operational' },
    staff: { present: 87, total: 95, status: 'adequate' },
    facilities: { operational: 31, total: 35, status: 'good' }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-emerald-500';
      case 'moderate': return 'bg-amber-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'operational': case 'good': case 'adequate': return 'bg-emerald-100 text-emerald-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'low': return 'from-emerald-500/10 to-emerald-500/5 border-emerald-200';
      case 'moderate': return 'from-amber-500/10 to-amber-500/5 border-amber-200';
      case 'high': return 'from-orange-500/10 to-orange-500/5 border-orange-200';
      case 'critical': return 'from-red-500/10 to-red-500/5 border-red-200';
      default: return 'from-gray-500/10 to-gray-500/5 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Temple Selection */}
      <TempleSelector
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={onTempleChange}
        language={language}
      />

      {/* Key Metrics - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="authority-metric-card overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
          <CardContent className="p-5 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Crowd</p>
                <p className="text-3xl font-bold mt-1" style={{color: totalCrowdLevel > 70 ? '#ef4444' : totalCrowdLevel > 40 ? '#f59e0b' : '#10b981'}}>
                  {totalCrowdLevel}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalCrowdLevel > 70 ? '🔴 High' : totalCrowdLevel > 40 ? '🟡 Moderate' : '🟢 Low'} Density
                </p>
              </div>
              <div className="p-3 bg-violet-100 rounded-2xl">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
            </div>
            <Progress value={totalCrowdLevel} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        <Card className="authority-metric-card overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full" />
          <CardContent className="p-5 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Alerts</p>
                <p className="text-3xl font-bold mt-1">{criticalZones + highAlertZones}</p>
                <div className="flex gap-1 mt-1">
                  {criticalZones > 0 && (
                    <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0">
                      {criticalZones} Critical
                    </Badge>
                  )}
                  {highAlertZones > 0 && (
                    <Badge className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0">
                      {highAlertZones} High
                    </Badge>
                  )}
                  {criticalZones === 0 && highAlertZones === 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0">
                      All Clear
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="authority-metric-card overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
          <CardContent className="p-5 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Today's Footfall</p>
                <p className="text-3xl font-bold mt-1">{footfall.today.toLocaleString()}</p>
                <p className={`text-xs mt-1 ${footfall.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {footfall.changePercent >= 0 ? '↗' : '↘'} {Math.abs(footfall.changePercent)}% from yesterday
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="authority-metric-card overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sky-500/10 to-transparent rounded-bl-full" />
          <CardContent className="p-5 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Weather</p>
                <p className="text-3xl font-bold mt-1">{weather.temperature}°C</p>
                <p className="text-xs text-gray-500 mt-1">
                  {weather.condition} • Humidity {weather.humidity}%
                </p>
              </div>
              <div className="p-3 bg-sky-100 rounded-2xl">
                <Thermometer className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Zone Monitoring - Enhanced */}
      <Card className="authority-zone-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                Live Zone Monitoring — {currentTemple.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {meta?.location}, {meta?.district} • Updated every 30s
              </CardDescription>
            </div>
            <Badge className="bg-violet-100 text-violet-700 border-violet-200">
              <Activity className="h-3 w-3 mr-1" />
              LIVE
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(crowdData).map(([zoneId, zone]: [string, any]) => (
              <div key={zoneId} className={`authority-zone-item bg-gradient-to-r ${getStatusGradient(zone.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(zone.status)} animate-pulse`} />
                    <Badge variant="outline" className={`text-[10px] uppercase font-bold ${getStatusBadgeColor(zone.status)}`}>
                      {zone.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Crowd Density</span>
                    <span className="font-semibold">{Math.round(zone.density)}%</span>
                  </div>
                  <Progress value={zone.density} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Est. Wait</span>
                    <span className="font-medium">{zone.waitTime}</span>
                  </div>

                  {zone.currentCount !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current / Capacity</span>
                      <span className="font-medium">{zone.currentCount} / {zone.maxCapacity}</span>
                    </div>
                  )}
                </div>

                {zone.status === 'critical' && (
                  <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <p className="text-xs text-red-700 font-medium">
                      ⚠ Immediate intervention required — capacity exceeded
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-violet-600" />
              System Health
            </CardTitle>
            <CardDescription>Infrastructure status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(systemStatus).map(([system, data]) => (
                <div key={system} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                  <div>
                    <h5 className="font-semibold capitalize text-gray-900">{system}</h5>
                    <p className="text-sm text-gray-500">
                      {data.active}/{data.total} Active
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(data.active / data.total) * 100} className="w-20 h-2" />
                    <Badge className={`${getStatusBadgeColor(data.status)} text-xs`}>
                      {data.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {events.slice(0, 8).map((event: any) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {event.type === 'emergency' && (
                      <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {event.type === 'crowd' && (
                      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-amber-600" />
                      </div>
                    )}
                    {event.type === 'booking' && (
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {event.type === 'system' && (
                      <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-violet-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-snug">{event.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.timestamp}</p>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthorityDashboard;