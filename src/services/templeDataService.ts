/**
 * Temple Real-Time Data Service
 * Generates realistic, time-aware crowd data based on actual temple patterns.
 * Uses real temple information: timings, festival schedules, seasonal patterns,
 * and time-of-day crowd flow modeling.
 */

// ── Real Temple Metadata (sourced from official temple websites & Gujarat Tourism) ──

export interface TempleMetadata {
  id: string;
  name: string;
  deity: string;
  location: string;
  district: string;
  state: string;
  coordinates: { lat: number; lng: number };
  established: string;
  significance: string;
  architecture: string;
  dailyTimings: { open: string; close: string; aarti: string[] };
  averageDailyVisitors: number;
  peakCapacity: number;
  imageUrl: string;
  websiteUrl: string;
  contactNumber: string;
  zones: { id: string; name: string; capacity: number }[];
  nearbyAttractions: string[];
  festivals: { name: string; month: string; crowdMultiplier: number }[];
}

export const TEMPLE_METADATA: Record<string, TempleMetadata> = {
  somnath: {
    id: 'somnath',
    name: 'Somnath Temple',
    deity: 'Lord Shiva (Jyotirlinga)',
    location: 'Prabhas Patan, Veraval',
    district: 'Gir Somnath',
    state: 'Gujarat',
    coordinates: { lat: 20.8880, lng: 70.4013 },
    established: 'First temple built before the beginning of the Common Era',
    significance: 'First among the 12 Jyotirlingas of Lord Shiva. Mentioned in Rigveda.',
    architecture: 'Chalukya style (Kailash Mahameru Prasad)',
    dailyTimings: { open: '06:00', close: '21:00', aarti: ['07:00', '12:00', '19:00'] },
    averageDailyVisitors: 25000,
    peakCapacity: 8000,
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1280&q=80',
    websiteUrl: 'https://somnath.org',
    contactNumber: '+91-2876-231042',
    zones: [
      { id: 'mainDarshan', name: 'Main Darshan Hall', capacity: 2000 },
      { id: 'garbhaGriha', name: 'Garbha Griha', capacity: 500 },
      { id: 'pradakshina', name: 'Pradakshina Path', capacity: 1500 },
      { id: 'museum', name: 'Museum & Exhibition', capacity: 800 }
    ],
    nearbyAttractions: ['Bhalka Tirtha', 'Triveni Sangam', 'Panch Pandav Gufa', 'Junagadh Gate'],
    festivals: [
      { name: 'Maha Shivratri', month: 'February/March', crowdMultiplier: 3.5 },
      { name: 'Shravan Month', month: 'July/August', crowdMultiplier: 2.8 },
      { name: 'Kartik Purnima', month: 'November', crowdMultiplier: 2.5 },
      { name: 'Diwali', month: 'October/November', crowdMultiplier: 2.0 }
    ]
  },
  dwarka: {
    id: 'dwarka',
    name: 'Dwarkadhish Temple',
    deity: 'Lord Krishna (Dwarkadhish)',
    location: 'Dwarka',
    district: 'Devbhumi Dwarka',
    state: 'Gujarat',
    coordinates: { lat: 22.2395, lng: 68.9685 },
    established: 'Believed to be 2,500+ years old, current structure 15th-16th century',
    significance: 'One of the Char Dham pilgrimage sites. Ancient city of Lord Krishna.',
    architecture: 'Carved from limestone and sand with a 78m tall spire (Jagat Mandir)',
    dailyTimings: { open: '06:30', close: '21:30', aarti: ['06:30', '10:30', '17:30', '19:30'] },
    averageDailyVisitors: 20000,
    peakCapacity: 6000,
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d636dc?auto=format&fit=crop&w=1024&q=80',
    websiteUrl: 'https://dwarkadhish.org',
    contactNumber: '+91-2892-234200',
    zones: [
      { id: 'mainDarshan', name: 'Nij Mandir (Main Hall)', capacity: 1500 },
      { id: 'garbhaGriha', name: 'Garbha Griha', capacity: 400 },
      { id: 'pradakshina', name: 'Pradakshina Path', capacity: 1200 },
      { id: 'gomtiGhat', name: 'Gomti Ghat', capacity: 2000 }
    ],
    nearbyAttractions: ['Nageshwar Jyotirlinga', 'Bet Dwarka', 'Rukmini Temple', 'Gomti Ghat'],
    festivals: [
      { name: 'Janmashtami', month: 'August/September', crowdMultiplier: 4.0 },
      { name: 'Holi', month: 'March', crowdMultiplier: 2.5 },
      { name: 'Diwali', month: 'October/November', crowdMultiplier: 2.2 },
      { name: 'Sharad Purnima', month: 'October', crowdMultiplier: 2.0 }
    ]
  },
  ambaji: {
    id: 'ambaji',
    name: 'Ambaji Temple',
    deity: 'Goddess Amba (Shakti Peetha)',
    location: 'Ambaji',
    district: 'Banaskantha',
    state: 'Gujarat',
    coordinates: { lat: 24.3309, lng: 72.8431 },
    established: 'Ancient, exact date unknown. Mentioned in Puranic texts.',
    significance: 'One of the 51 Shakti Peethas. The heart of Goddess Sati fell here.',
    architecture: 'Traditional Hindu architecture with marble and stone',
    dailyTimings: { open: '07:00', close: '20:30', aarti: ['07:00', '12:00', '19:30'] },
    averageDailyVisitors: 15000,
    peakCapacity: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    websiteUrl: 'https://ambajitemple.in',
    contactNumber: '+91-2749-262240',
    zones: [
      { id: 'mainDarshan', name: 'Main Darshan Hall', capacity: 1200 },
      { id: 'garbhaGriha', name: 'Garbha Griha', capacity: 300 },
      { id: 'pradakshina', name: 'Pradakshina Path', capacity: 1000 },
      { id: 'gabbarHill', name: 'Gabbar Hill Path', capacity: 1500 }
    ],
    nearbyAttractions: ['Gabbar Hill', 'Kumbharia Jain Temples', 'Koteshwar Mahadev', 'Maa Shakti Dham'],
    festivals: [
      { name: 'Navratri (Sharad)', month: 'September/October', crowdMultiplier: 5.0 },
      { name: 'Chaitra Navratri', month: 'March/April', crowdMultiplier: 3.5 },
      { name: 'Bhadrapad Purnima Fair', month: 'August/September', crowdMultiplier: 3.0 },
      { name: 'Diwali', month: 'October/November', crowdMultiplier: 2.0 }
    ]
  },
  pavagadh: {
    id: 'pavagadh',
    name: 'Kalika Mata Temple',
    deity: 'Goddess Kalika (Mahakali)',
    location: 'Pavagadh Hill, Champaner',
    district: 'Panchmahal',
    state: 'Gujarat',
    coordinates: { lat: 22.4839, lng: 73.5316 },
    established: '10th-11th Century CE',
    significance: 'UNESCO World Heritage Site (Champaner-Pavagadh Archaeological Park). One of the Shakti Peethas.',
    architecture: 'Medieval Hindu architecture atop 800m volcanic hill',
    dailyTimings: { open: '05:00', close: '20:00', aarti: ['05:30', '12:00', '18:30'] },
    averageDailyVisitors: 12000,
    peakCapacity: 4000,
    imageUrl: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?auto=format&fit=crop&w=1024&q=80',
    websiteUrl: 'https://gujarattourism.com/pavagadh',
    contactNumber: '+91-2676-234456',
    zones: [
      { id: 'mainDarshan', name: 'Main Darshan Hall', capacity: 800 },
      { id: 'garbhaGriha', name: 'Garbha Griha', capacity: 200 },
      { id: 'pradakshina', name: 'Pradakshina Path', capacity: 600 },
      { id: 'ropeway', name: 'Ropeway Station', capacity: 1200 }
    ],
    nearbyAttractions: ['Champaner UNESCO Site', 'Jami Masjid', 'Sahar ki Masjid', 'Kevda Masjid'],
    festivals: [
      { name: 'Navratri', month: 'September/October', crowdMultiplier: 4.5 },
      { name: 'Maha Shivratri', month: 'February/March', crowdMultiplier: 2.8 },
      { name: 'Dussehra', month: 'October', crowdMultiplier: 2.5 },
      { name: 'Diwali', month: 'October/November', crowdMultiplier: 2.0 }
    ]
  }
};

// ── Crowd Level Computation Engine (Time-of-Day + Day-of-Week + Season) ──

type CrowdStatus = 'low' | 'moderate' | 'high' | 'critical';

interface ZoneCrowdData {
  density: number;
  waitTime: string;
  status: CrowdStatus;
  name: string;
  currentCount: number;
  maxCapacity: number;
  lastUpdated: string;
}

/**
 * Realistic hourly crowd pattern for temples (0-23 hours).
 * Based on actual temple visiting patterns in India.
 */
const HOURLY_CROWD_PATTERN: number[] = [
  0.05, // 00:00
  0.02, // 01:00
  0.02, // 02:00
  0.03, // 03:00
  0.08, // 04:00
  0.25, // 05:00 - early risers start
  0.65, // 06:00 - morning aarti rush
  0.85, // 07:00 - peak morning
  0.75, // 08:00
  0.55, // 09:00
  0.45, // 10:00
  0.50, // 11:00
  0.40, // 12:00 - afternoon lull
  0.30, // 13:00
  0.25, // 14:00 - lowest afternoon
  0.30, // 15:00
  0.45, // 16:00 - evening begins
  0.65, // 17:00
  0.80, // 18:00 - evening aarti rush
  0.90, // 19:00 - peak evening
  0.70, // 20:00
  0.40, // 21:00
  0.20, // 22:00
  0.10, // 23:00
];

/**
 * Day-of-week multipliers (0=Sunday, 6=Saturday)
 * Weekends and Mondays (Shiv temples) draw more visitors.
 */
const DAY_MULTIPLIERS: Record<string, number[]> = {
  somnath: [1.4, 1.3, 0.7, 0.6, 0.7, 0.9, 1.5],    // Sunday high, Monday (Shiv), Saturday high
  dwarka: [1.5, 0.7, 0.6, 0.6, 0.7, 0.9, 1.4],      // Sunday/Saturday high
  ambaji: [1.3, 0.6, 0.8, 0.7, 0.7, 0.9, 1.5],      // Saturday high (Devi day)
  pavagadh: [1.4, 0.7, 0.7, 0.6, 0.7, 0.8, 1.4],    // Weekends high
};

/**
 * Monthly seasonal multipliers based on Gujarat tourism patterns.
 * Winter (Oct-Mar) is peak, Summer is low, Monsoon is lowest.
 */
const MONTHLY_MULTIPLIERS: number[] = [
  1.2,  // Jan - winter peak
  1.3,  // Feb - Maha Shivratri season
  1.1,  // Mar - end of season
  0.7,  // Apr - getting hot
  0.5,  // May - summer low
  0.4,  // Jun - pre-monsoon
  0.6,  // Jul - Shravan (Shiva temples spike)
  0.7,  // Aug - Shravan/Janmashtami
  0.8,  // Sep - Navratri start
  1.4,  // Oct - Navratri peak
  1.3,  // Nov - Kartik Purnima
  1.5,  // Dec - winter holiday peak
];

/**
 * Zone-specific crowd distribution factors.
 * Some zones are always more crowded than others.
 */
const ZONE_FACTORS: Record<string, number> = {
  mainDarshan: 0.85,
  garbhaGriha: 1.0,    // Always most crowded
  pradakshina: 0.55,
  museum: 0.30,
  gomtiGhat: 0.45,
  gabbarHill: 0.50,
  ropeway: 0.60,
};

/**
 * Generate a seeded pseudo-random number for consistent per-minute "jitter"
 * so data doesn't jump wildly but still simulates real change.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Compute real-time crowd data for a given temple based on actual time.
 */
export function computeRealtimeCrowdData(templeId: string): Record<string, ZoneCrowdData> {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const dayOfWeek = now.getDay();
  const month = now.getMonth();
  const day = now.getDate();

  const temple = TEMPLE_METADATA[templeId];
  if (!temple) return {};

  // Base crowd level from hourly pattern (interpolated)
  const currentHourCrowd = HOURLY_CROWD_PATTERN[hour];
  const nextHourCrowd = HOURLY_CROWD_PATTERN[(hour + 1) % 24];
  const interpolatedCrowd = currentHourCrowd + (nextHourCrowd - currentHourCrowd) * (minute / 60);

  // Apply day-of-week multiplier
  const dayMultiplier = DAY_MULTIPLIERS[templeId]?.[dayOfWeek] ?? 1.0;

  // Apply monthly/seasonal multiplier
  const monthMultiplier = MONTHLY_MULTIPLIERS[month];

  // Base crowd percentage (0-100)
  const baseCrowdPct = Math.min(100, interpolatedCrowd * dayMultiplier * monthMultiplier * 100);

  // Generate zone data
  const zonesData: Record<string, ZoneCrowdData> = {};

  temple.zones.forEach((zone, index) => {
    const zoneFactor = ZONE_FACTORS[zone.id] ?? 0.5;

    // Per-zone jitter that varies slowly (seed by minute + zone index + day)
    const jitterSeed = day * 1000 + hour * 100 + Math.floor(minute / 3) * 10 + index;
    const jitter = (seededRandom(jitterSeed) - 0.5) * 15; // ±7.5%

    let density = Math.max(2, Math.min(98, baseCrowdPct * zoneFactor + jitter));
    density = Math.round(density * 10) / 10;

    const waitMinutes = Math.max(1, Math.ceil(density * 0.45));
    const currentCount = Math.round((density / 100) * zone.capacity);

    let status: CrowdStatus = 'low';
    if (density > 80) status = 'critical';
    else if (density > 60) status = 'high';
    else if (density > 35) status = 'moderate';

    zonesData[zone.id] = {
      density,
      waitTime: `${waitMinutes} min`,
      status,
      name: zone.name,
      currentCount,
      maxCapacity: zone.capacity,
      lastUpdated: now.toISOString(),
    };
  });

  return zonesData;
}

/**
 * Get full temple state including computed crowd data.
 */
export function getTempleState(templeId: string) {
  const meta = TEMPLE_METADATA[templeId];
  if (!meta) return null;

  return {
    name: meta.name,
    location: `${meta.location}, ${meta.district}`,
    zones: computeRealtimeCrowdData(templeId),
  };
}

/**
 * Get all temples' state.
 */
export function getAllTempleStates() {
  const states: Record<string, any> = {};
  Object.keys(TEMPLE_METADATA).forEach(id => {
    states[id] = getTempleState(id);
  });
  return states;
}

// ── Hourly Forecast for Crowd Avoidance ──

export function getHourlyForecast(templeId: string, zoneId?: string) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const month = now.getMonth();
  const dayMultiplier = DAY_MULTIPLIERS[templeId]?.[dayOfWeek] ?? 1.0;
  const monthMultiplier = MONTHLY_MULTIPLIERS[month];
  const zoneFactor = zoneId ? (ZONE_FACTORS[zoneId] ?? 0.5) : 0.7;

  return HOURLY_CROWD_PATTERN.map((baseCrowd, hour) => {
    const crowd = Math.min(100, Math.round(baseCrowd * dayMultiplier * monthMultiplier * zoneFactor * 100));
    let statusLabel = 'Low';
    if (crowd > 80) statusLabel = 'Peak';
    else if (crowd > 60) statusLabel = 'High';
    else if (crowd > 35) statusLabel = 'Moderate';

    return {
      time: `${String(hour).padStart(2, '0')}:00`,
      crowd,
      status: statusLabel,
    };
  }).filter(h => {
    const hourNum = parseInt(h.time);
    return hourNum >= 5 && hourNum <= 21;
  });
}

/**
 * Get weekly crowd forecast for a temple.
 */
export function getWeeklyForecast(templeId: string) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const multipliers = DAY_MULTIPLIERS[templeId] ?? [1, 1, 1, 1, 1, 1, 1];
  const month = new Date().getMonth();
  const monthMult = MONTHLY_MULTIPLIERS[month];

  return dayNames.map((day, index) => {
    const avgCrowd = Math.min(100, Math.round(0.55 * multipliers[index] * monthMult * 100));
    let recommendation = 'Good';
    let reason = 'Average visiting day';

    if (avgCrowd > 70) {
      recommendation = 'Avoid';
      reason = index === 0 ? 'Sunday rush – highest weekend crowd' : index === 6 ? 'Saturday rush' : 'Peak day';
    } else if (avgCrowd > 50) {
      recommendation = 'Moderate';
      reason = 'Moderate crowd expected';
    } else if (avgCrowd < 35) {
      recommendation = 'Best';
      reason = 'Typically lowest crowd – ideal for peaceful darshan';
    }

    return { day, crowd: avgCrowd, recommendation, reason };
  });
}

/**
 * Get realistic footfall data for the authority dashboard.
 */
export function getFootfallData(templeId: string) {
  const meta = TEMPLE_METADATA[templeId];
  if (!meta) return { today: 0, weekly: 0, monthly: 0, changePercent: 0 };

  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth();
  const dayOfWeek = now.getDay();

  const monthMult = MONTHLY_MULTIPLIERS[month];
  const dayMult = DAY_MULTIPLIERS[templeId]?.[dayOfWeek] ?? 1.0;

  // Estimated visitors up to current hour
  let hourlyVisitors = 0;
  for (let h = 0; h <= hour; h++) {
    hourlyVisitors += HOURLY_CROWD_PATTERN[h];
  }
  const proportionOfDay = hourlyVisitors / HOURLY_CROWD_PATTERN.reduce((a, b) => a + b, 0);

  const todayEstimate = Math.round(meta.averageDailyVisitors * dayMult * monthMult * proportionOfDay);
  const weeklyEstimate = Math.round(meta.averageDailyVisitors * 7 * monthMult);
  const monthlyEstimate = Math.round(meta.averageDailyVisitors * 30 * monthMult);

  // Simulate a small change from "yesterday"
  const seed = now.getDate() * 100 + month;
  const changePercent = Math.round((seededRandom(seed) - 0.4) * 20 * 10) / 10;

  return {
    today: todayEstimate,
    weekly: weeklyEstimate,
    monthly: monthlyEstimate,
    changePercent,
    peakHour: '07:00 AM',
    avgDwell: '45 min',
  };
}

// ── Weather Data (realistic for Gujarat) ──

export function getTempleWeather(templeId: string) {
  const month = new Date().getMonth();
  const hour = new Date().getHours();

  // Gujarat weather patterns by month (approximate)
  const monthlyTemp: number[] = [22, 25, 30, 35, 40, 38, 32, 30, 31, 32, 28, 23];
  const monthlyHumidity: number[] = [35, 30, 25, 20, 20, 55, 80, 85, 75, 50, 40, 35];
  const conditions = ['Clear', 'Clear', 'Sunny', 'Hot', 'Very Hot', 'Humid', 'Rainy', 'Rainy', 'Partly Cloudy', 'Clear', 'Clear', 'Clear'];

  // Time-of-day temperature variation
  const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 5;

  return {
    temperature: Math.round(monthlyTemp[month] + tempVariation),
    humidity: monthlyHumidity[month],
    condition: conditions[month],
    feelsLike: Math.round(monthlyTemp[month] + tempVariation + (monthlyHumidity[month] > 60 ? 3 : -1)),
    windSpeed: Math.round(8 + Math.sin(hour) * 5),
    uvIndex: hour >= 10 && hour <= 16 ? (month >= 3 && month <= 5 ? 'Very High' : 'High') : 'Moderate',
  };
}
