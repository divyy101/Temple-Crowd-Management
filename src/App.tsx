import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { toast, Toaster } from 'sonner';

import PilgrimInterface from './components/pilgrim/PilgrimInterface';
import AuthorityInterface from './components/authority/AuthorityInterface';
import AuthorityLogin from './components/authority/AuthorityLogin';
import RoleSelector from './components/RoleSelector';
import { getAllTempleStates } from './services/templeDataService';

function AppContent() {
  const [selectedTemple, setSelectedTemple] = useState('somnath');
  const [currentInterface, setCurrentInterface] = useState<null | 'pilgrim' | 'authority' | 'authority-login'>(null);
  const [authorityAuthenticated, setAuthorityAuthenticated] = useState(false);

  // ── Real-time temple data from our data service ──
  const [templeData, setTempleData] = useState(() => getAllTempleStates());

  const [events, setEvents] = useState([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      message: '🙏 Welcome to Temple Insight 360 - Gujarat Temple Assistance System',
      type: 'system'
    },
    {
      id: 2,
      timestamp: new Date().toLocaleTimeString(),
      message: '📡 Connected — Crowd data is computed from real-time temple patterns',
      type: 'system'
    }
  ]);
  const [bookings, setBookings] = useState<any[]>([]);

  // Check for existing authority session on mount
  useEffect(() => {
    const session = localStorage.getItem('authority_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        // Session expires after 4 hours
        const loginTime = new Date(parsed.loginTime).getTime();
        if (Date.now() - loginTime < 4 * 60 * 60 * 1000) {
          setAuthorityAuthenticated(true);
        } else {
          localStorage.removeItem('authority_session');
        }
      } catch {
        localStorage.removeItem('authority_session');
      }
    }
  }, []);

  // ── Refresh crowd data every 30 seconds from the data service ──
  useEffect(() => {
    const interval = setInterval(() => {
      const freshData = getAllTempleStates();
      setTempleData(freshData);

      // Generate a new event for the selected temple
      const temple = freshData[selectedTemple];
      if (temple) {
        const zoneKeys = Object.keys(temple.zones);
        const randomZone = zoneKeys[Math.floor(Math.random() * zoneKeys.length)];
        const zone = temple.zones[randomZone];

        if (zone) {
          const newEvent = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            message: `${temple.name} — ${zone.name}: Density ${Math.round(zone.density)}% (${zone.status})`,
            type: 'crowd'
          };
          setEvents(prev => [newEvent, ...prev.slice(0, 14)]);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedTemple]);

  const handleBooking = (bookingData: any) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      ...bookingData,
      timestamp: new Date(),
      qrCode: `QR-${Date.now()}`,
      status: 'confirmed'
    };

    setBookings(prev => [...prev, newBooking]);

    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `New darshan booking confirmed for ${bookingData.zone}`,
      type: 'booking'
    };
    setEvents(prev => [event, ...prev.slice(0, 14)]);

    toast.success('Darshan booking confirmed! Check My Bookings for details.');
  };

  const handleEmergency = (emergencyData: any) => {
    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `🚨 Emergency Alert: ${emergencyData.type} - ${emergencyData.location}`,
      type: 'emergency'
    };
    setEvents(prev => [event, ...prev.slice(0, 14)]);
    toast.error('Emergency alert sent to authorities');
  };

  // Handle role selection
  const handleRoleSelect = (role: 'pilgrim' | 'authority') => {
    if (role === 'authority') {
      if (authorityAuthenticated) {
        setCurrentInterface('authority');
      } else {
        setCurrentInterface('authority-login');
      }
    } else {
      setCurrentInterface('pilgrim');
    }
  };

  // Handle authority login success
  const handleAuthorityLoginSuccess = () => {
    setAuthorityAuthenticated(true);
    setCurrentInterface('authority');
    toast.success('Welcome! Authority portal access granted.');
  };

  // Handle authority logout
  const handleAuthorityLogout = () => {
    setAuthorityAuthenticated(false);
    localStorage.removeItem('authority_session');
    setCurrentInterface(null);
    toast.success('Logged out from Authority Portal.');
  };

  // Handle switching back to role selector
  const handleBackToRoleSelector = () => {
    setCurrentInterface(null);
  };

  // Show role selector if no interface is selected
  if (!currentInterface) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  // Show authority login screen
  if (currentInterface === 'authority-login') {
    return (
      <AuthorityLogin
        onLoginSuccess={handleAuthorityLoginSuccess}
        onBack={handleBackToRoleSelector}
      />
    );
  }

  // Show authority interface (authenticated)
  if (currentInterface === 'authority') {
    return (
      <AuthorityInterface
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={setSelectedTemple}
        events={events}
        setEvents={setEvents}
        onBackToRoleSelector={handleAuthorityLogout}
      />
    );
  }

  // Show pilgrim interface (no authentication required)
  if (currentInterface === 'pilgrim') {
    return (
      <PilgrimInterface
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={setSelectedTemple}
        events={events}
        setEvents={setEvents}
        bookings={bookings}
        handleBooking={handleBooking}
        handleEmergency={handleEmergency}
        onBackToRoleSelector={handleBackToRoleSelector}
      />
    );
  }

  return null;
}

// Main App wrapper
function App() {
  return (
    <>
      <AppContent />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;