import React from 'react';
import { Calendar, Users, Clock, TrendingUp, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import TempleSelector from './TempleSelector';
import { Language, getTranslation, getTempleTranslation, getStatusTranslation } from '../utils/translations';

interface DashboardProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  onBookDarshan: () => void;
  language?: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ templeData, selectedTemple, onTempleChange, onBookDarshan, language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const currentTemple = templeData[selectedTemple];
  const crowdData = currentTemple.zones;
  const totalPilgrims = Object.values(crowdData).reduce((sum: number, zone: any) => sum + zone.density, 0);
  const avgWaitTime = Math.round(Object.values(crowdData).reduce((sum: number, zone: any) => sum + parseInt(zone.waitTime), 0) / 4);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white border-0 animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl shadow-orange-500/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-orange-300 opacity-20 rounded-full blur-2xl"></div>
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Welcome to Gujarat's Sacred Temples</h2>
            <MapPin className="h-7 w-7 text-orange-200 drop-shadow" />
          </div>
          <p className="text-orange-50 mb-4 text-lg font-medium flex items-center gap-2">
            Currently viewing: 
            <strong className="px-3 py-1 bg-white/20 border border-white/30 rounded-lg backdrop-blur-md shadow-sm">
              {getTempleTranslation(language, selectedTemple)}
            </strong>
          </p>
          <p className="text-red-100 mb-6 max-w-xl text-md opacity-90">Your spiritual journey companion for a blessed darshan experience</p>
          
          <Button 
            onClick={onBookDarshan}
            size="lg"
            className="bg-white text-red-600 hover:bg-orange-50 hover:scale-105 transition-all shadow-lg font-bold"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Darshan Token
          </Button>
        </CardContent>
      </Card>

      {/* Temple Selection */}
      <TempleSelector 
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={onTempleChange}
        language={language}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pilgrims</p>
                <p className="text-2xl">{Math.round(totalPilgrims * 100)}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                <p className="text-2xl">{avgWaitTime} min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Status</p>
                <p className="text-2xl">{t('status.moderate')}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Crowd Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Live Crowd Status - {getTempleTranslation(language, selectedTemple)}
          </CardTitle>
          <CardDescription>Real-time updates • {currentTemple.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(crowdData).map(([zone, data]: [string, any]) => (
              <div key={zone} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                    <h3>{data.name}</h3>
                  </div>
                  <Badge variant="outline">{getStatusTranslation(language, data.status)}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Density</span>
                    <span>{Math.round(data.density)}%</span>
                  </div>
                  <Progress value={data.density} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Est. Wait</span>
                    <span className="font-medium">{data.waitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your temple visit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2" onClick={onBookDarshan}>
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Book Token</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Find Queue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Check Times</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Live Stats</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;