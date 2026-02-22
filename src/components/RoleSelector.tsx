import React, { useState, useEffect } from 'react';
import { Users, Shield, ArrowRight, Globe, MapPin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { TEMPLE_METADATA } from '../services/templeDataService';

interface RoleSelectorProps {
  onRoleSelect: (role: 'pilgrim' | 'authority') => void;
}

const templeImages = [
  {
    url: TEMPLE_METADATA.somnath.imageUrl,
    name: 'Somnath Temple',
    location: 'Veraval, Gujarat',
  },
  {
    url: TEMPLE_METADATA.dwarka.imageUrl,
    name: 'Dwarkadhish Temple',
    location: 'Dwarka, Gujarat',
  },
  {
    url: TEMPLE_METADATA.ambaji.imageUrl,
    name: 'Ambaji Temple',
    location: 'Banaskantha, Gujarat',
  },
  {
    url: TEMPLE_METADATA.pavagadh.imageUrl,
    name: 'Kalika Mata Temple',
    location: 'Pavagadh, Gujarat',
  },
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const [language, setLanguage] = useState('en');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Auto-rotate temple images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx(prev => (prev + 1) % templeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const text = {
    en: {
      appName: 'Temple Insight 360',
      tagline: 'Your Divine Journey, Digitally Enhanced',
      subtitle: 'Gujarat\'s Premier Temple Crowd Management & Pilgrim Assistance Platform',
      selectRole: 'Choose your access type to continue',
      pilgrimTitle: 'Pilgrim Access',
      pilgrimDesc: 'Plan your visit, book darshan, and navigate temple facilities with ease',
      pilgrimFeatures: [
        'Book Darshan Tokens & QR Codes',
        'Live Crowd Density Updates',
        'Crowd Avoidance Recommendations',
        'Special Assistance Services',
        'Real-time Temple Alerts'
      ],
      pilgrimEnter: 'Enter as Pilgrim',
      authorityTitle: 'Authority Portal',
      authorityDesc: 'Monitor crowds, manage resources, and ensure pilgrim safety',
      authorityFeatures: [
        'Crowd Heat Maps & Analytics',
        'Real-time Alert Management',
        'Resource Management Dashboard',
        'Footfall Count & Statistics',
        'Smart Monitoring Controls'
      ],
      authorityEnter: 'Authority Login',
      secureNote: 'Secure • Real-time • Trusted by Gujarat Temple Board',
      liveBadge: 'LIVE DATA',
    },
    hi: {
      appName: 'मंदिर इनसाइट 360',
      tagline: 'आपकी दिव्य यात्रा, डिजिटल रूप से बेहतर',
      subtitle: 'गुजरात का प्रमुख मंदिर भीड़ प्रबंधन और तीर्थयात्री सहायता मंच',
      selectRole: 'जारी रखने के लिए अपना एक्सेस प्रकार चुनें',
      pilgrimTitle: 'तीर्थयात्री पहुंच',
      pilgrimDesc: 'दर्शन बुक करें, भीड़ अपडेट प्राप्त करें, मंदिर सेवाओं तक पहुंच',
      pilgrimFeatures: [
        'दर्शन टोकन और QR कोड बुक करें',
        'लाइव भीड़ घनत्व अपडेट',
        'भीड़ से बचने की सिफारिशें',
        'विशेष सहायता सेवाएं',
        'रीयल-टाइम मंदिर अलर्ट'
      ],
      pilgrimEnter: 'तीर्थयात्री के रूप में प्रवेश करें',
      authorityTitle: 'प्राधिकरण पोर्टल',
      authorityDesc: 'मंदिर प्रबंधन, भीड़ निगरानी, आपातकालीन प्रतिक्रिया',
      authorityFeatures: [
        'भीड़ हीट मैप्स और एनालिटिक्स',
        'रीयल-टाइम अलर्ट प्रबंधन',
        'संसाधन प्रबंधन डैशबोर्ड',
        'फुटफॉल काउंट और सांख्यिकी',
        'स्मार्ट मॉनिटरिंग नियंत्रण'
      ],
      authorityEnter: 'प्राधिकरण लॉगिन',
      secureNote: 'सुरक्षित • रीयल-टाइम • गुजरात मंदिर बोर्ड द्वारा विश्वसनीय',
      liveBadge: 'लाइव डेटा',
    },
    gu: {
      appName: 'મંદિર ઇનસાઇટ 360',
      tagline: 'તમારી દિવ્ય યાત્રા, ડિજિટલ રીતે વિકસિત',
      subtitle: 'ગુજરાતનું અગ્રણી મંદિર ભીડ વ્યવસ્થાપન અને યાત્રી સહાયતા પ્લેટફોર્મ',
      selectRole: 'ચાલુ રાખવા માટે તમારો પ્રવેશ પ્રકાર પસંદ કરો',
      pilgrimTitle: 'યાત્રી પ્રવેશ',
      pilgrimDesc: 'દર્શન બુક કરો, ભીડના અપડેટ મેળવો, મંદિર સેવાઓ મેળવો',
      pilgrimFeatures: [
        'દર્શન ટોકન અને QR કોડ બુક કરો',
        'લાઇવ ભીડ ઘનતા અપડેટ્સ',
        'ભીડ ટાળવાની ભલામણો',
        'વિશેષ સહાયતા સેવાઓ',
        'રીઅલ-ટાઇમ મંદિર અલર્ટ્સ'
      ],
      pilgrimEnter: 'યાત્રી તરીકે પ્રવેશ કરો',
      authorityTitle: 'અધિકૃત પોર્ટલ',
      authorityDesc: 'મંદિર વ્યવસ્થાપન, ભીડ નિરીક્ષણ, કટોકટી પ્રતિસાદ',
      authorityFeatures: [
        'ભીડ હીટ મેપ્સ અને એનાલિટિક્સ',
        'રીઅલ-ટાઇમ અલર્ટ મેનેજમેન્ટ',
        'રિસોર્સ મેનેજમેન્ટ ડેશબોર્ડ',
        'ફૂટફોલ કાઉન્ટ અને આંકડાકીય માહિતી',
        'સ્માર્ટ મોનિટરિંગ કંટ્રોલ્સ'
      ],
      authorityEnter: 'અધિકૃત લૉગિન',
      secureNote: 'સુરક્ષિત • રીઅલ-ટાઇમ • ગુજરાત મંદિર બોર્ડ દ્વારા વિશ્વસનીય',
      liveBadge: 'લાઇવ ડેટા',
    }
  };

  const t = text[language as keyof typeof text];
  const currentImg = templeImages[currentImageIdx];

  return (
    <div className="role-selector-wrapper">
      {/* Hero background with temple image carousel */}
      <div className="role-hero-bg">
        {templeImages.map((img, idx) => (
          <div
            key={idx}
            className={`role-hero-image ${idx === currentImageIdx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img.url})` }}
          />
        ))}
        <div className="role-hero-overlay" />
      </div>

      <div className="role-selector-content">
        {/* Language selector */}
        <div className="role-language-bar">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 bg-white/10 backdrop-blur-md border-white/20 text-white">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="gu">ગુજરાતી</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hero text */}
        <div className="role-hero-text">
          <Badge className="role-live-badge">
            <span className="role-live-dot"></span>
            {t.liveBadge}
          </Badge>

          <h1 className="role-hero-title">{t.appName}</h1>
          <p className="role-hero-tagline">{t.tagline}</p>
          <p className="role-hero-subtitle">{t.subtitle}</p>

          {/* Temple info pills */}
          <div className="role-temple-pills">
            {templeImages.map((temple, idx) => (
              <button
                key={idx}
                className={`role-temple-pill ${idx === currentImageIdx ? 'active' : ''}`}
                onClick={() => setCurrentImageIdx(idx)}
              >
                <MapPin className="h-3 w-3" />
                {temple.name}
              </button>
            ))}
          </div>
        </div>

        {/* Role selection cards */}
        <div className="role-cards-grid">
          {/* Pilgrim Card */}
          <Card className="role-card role-card-pilgrim" id="pilgrim-access-card">
            <CardHeader className="pb-3">
              <div className="role-card-icon role-card-icon-pilgrim">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
              <CardTitle className="text-xl mt-3">{t.pilgrimTitle}</CardTitle>
              <CardDescription>{t.pilgrimDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
                {t.pilgrimFeatures.map((feature, index) => (
                  <div key={index} className="role-feature-item">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                id="enter-pilgrim-btn"
                onClick={() => onRoleSelect('pilgrim')}
                className="w-full h-12 text-base font-semibold role-btn-pilgrim"
                size="lg"
              >
                {t.pilgrimEnter}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-center text-gray-400">No login required</p>
            </CardContent>
          </Card>

          {/* Authority Card */}
          <Card className="role-card role-card-authority" id="authority-access-card">
            <CardHeader className="pb-3">
              <div className="role-card-icon role-card-icon-authority">
                <Shield className="h-7 w-7 text-violet-600" />
              </div>
              <CardTitle className="text-xl mt-3">{t.authorityTitle}</CardTitle>
              <CardDescription>{t.authorityDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
                {t.authorityFeatures.map((feature, index) => (
                  <div key={index} className="role-feature-item">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                id="enter-authority-btn"
                onClick={() => onRoleSelect('authority')}
                className="w-full h-12 text-base font-semibold role-btn-authority"
                size="lg"
              >
                {t.authorityEnter}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-center text-gray-400">Login required</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="role-footer">
          <p>{t.secureNote}</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;