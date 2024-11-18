interface AscendantResult {
  longitude: number;
  latitude: number;
  house: number;
  sign: number;
  nakshatra: number;
  nakshatraPada: number;
}

// Ayanamsa calculation (Lahiri)
export function calculateAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.85 + 0.0137 * T;
}

export function calculateAscendant(
  siderealTime: number,
  latitude: number,
  ayanamsa: number
): AscendantResult {
  // Convert sidereal time to degrees
  const lst = siderealTime * 15;

  // Calculate obliquity of ecliptic
  const epsilon = 23.4397; // Simplified obliquity

  // Calculate ascendant using North Indian method
  const tanLAsc = (Math.sin(lst * Math.PI / 180)) / 
    (Math.cos(lst * Math.PI / 180) * Math.sin(epsilon * Math.PI / 180) + 
    Math.tan(latitude * Math.PI / 180) * Math.cos(epsilon * Math.PI / 180));
  
  let ascendant = Math.atan(tanLAsc) * 180 / Math.PI;
  
  // Adjust quadrant
  if (lst > 180) {
    ascendant += 180;
  } else if (lst > 90) {
    ascendant += 180;
  }

  // Normalize to 0-360
  ascendant = ((ascendant % 360) + 360) % 360;

  // Apply ayanamsa correction for sidereal zodiac
  ascendant = (ascendant - ayanamsa + 360) % 360;

  // Calculate house, sign, nakshatra
  const sign = Math.floor(ascendant / 30);
  const nakshatra = Math.floor(ascendant / 13.333333);
  const pada = Math.floor((ascendant % 13.333333) / 3.333333) + 1;

  return {
    longitude: ascendant,
    latitude: latitude,
    house: 1,
    sign,
    nakshatra,
    nakshatraPada: pada,
  };
}

// Calculate Sun position using Surya Siddhanta method
export function calculateSunPosition(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  
  // Mean anomaly of the Sun
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  
  // Sun's equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * Math.PI / 180) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180) +
    0.000289 * Math.sin(3 * M * Math.PI / 180);
  
  // Sun's true longitude
  const L = 280.46646 + 36000.76983 * T + 0.0003032 * T * T + C;
  
  return ((L % 360) + 360) % 360;
}

// Calculate Moon position using Surya Siddhanta method
export function calculateMoonPosition(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  
  // Mean longitude of the Moon
  const Lm = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  
  // Mean anomaly of the Moon
  const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  
  // Moon's equation of center
  const C = 6.288750 * Math.sin(M * Math.PI / 180) +
    1.274018 * Math.sin((2 * Lm - M) * Math.PI / 180) +
    0.658309 * Math.sin(2 * Lm * Math.PI / 180);
  
  // Moon's true longitude
  const L = Lm + C;
  
  return ((L % 360) + 360) % 360;
}

// Calculate planetary positions using Surya Siddhanta method
export function calculatePlanetPosition(jd: number, planet: string): number {
  const T = (jd - 2451545.0) / 36525;
  
  // Mean orbital elements for planets
  const elements: Record<string, { L: number, n: number }> = {
    mars: {
      L: 355.45332 + 19140.30268 * T,  // Mean longitude
      n: 191.40827 + 19140.30268 * T    // Mean motion
    },
    mercury: {
      L: 252.25084 + 149472.67411 * T,
      n: 4.09233333 * 360 + 149472.67411 * T
    },
    jupiter: {
      L: 34.35669 + 3034.74612 * T,
      n: 30.34746120 * T
    },
    venus: {
      L: 181.97973 + 58517.81539 * T,
      n: 1.60213333 * 360 + 58517.81539 * T
    },
    saturn: {
      L: 50.07744 + 1222.11494 * T,
      n: 12.22114940 * T
    },
    rahu: {
      L: 125.04452 - 1934.13618 * T,
      n: 19.34136180 * T
    },
    ketu: {
      L: (125.04452 - 1934.13618 * T + 180) % 360,
      n: 19.34136180 * T
    }
  };

  if (!elements[planet]) {
    return 0;
  }

  // Calculate true longitude using simplified equations
  const L = elements[planet].L;
  const n = elements[planet].n;
  
  // Add basic perturbations
  let longitude = L + 
    2 * Math.sin((n * Math.PI) / 180) +
    0.5 * Math.sin((2 * n * Math.PI) / 180);

  // Normalize to 0-360
  longitude = ((longitude % 360) + 360) % 360;

  return longitude;
}

// Calculate Nakshatra name
export function getNakshatraName(nakshatraNumber: number): string {
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  
  return nakshatras[nakshatraNumber] || 'Unknown';
} 