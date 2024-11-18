import type { BirthDetails } from '@/types/birthDetails';

const DASHA_YEARS = {
  ketu: 7,
  venus: 20,
  sun: 6,
  moon: 10,
  mars: 7,
  rahu: 18,
  jupiter: 16,
  saturn: 19,
  mercury: 17,
} as const;

const DASHA_SEQUENCE = [
  'ketu', 'venus', 'sun', 'moon', 'mars', 
  'rahu', 'jupiter', 'saturn', 'mercury'
] as const;

type Planet = keyof typeof DASHA_YEARS;

interface DashaPeriod {
  planet: Planet;
  startDate: Date;
  endDate: Date;
}

interface DashaResult {
  mahadasha: DashaPeriod;
  antardasha: DashaPeriod;
}

export function calculate(birthDetails: BirthDetails, planets: Record<string, any>): DashaResult {
  // Calculate birth star (nakshatra) from Moon's position
  const moonLongitude = planets.moon.longitude;
  const nakshatra = Math.floor(moonLongitude / 13.333333);
  const balance = (moonLongitude % 13.333333) / 13.333333;
  
  return calculateDashaPeriods(nakshatra, balance, new Date(birthDetails.dateOfBirth));
}

function calculateDashaPeriods(nakshatra: number, balance: number, birthDate: Date): DashaResult {
  // Map nakshatra to starting dasha lord
  const nakshatraLords: Planet[] = [
    'ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury', // 1-9
    'ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury', // 10-18
    'ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury'  // 19-27
  ];
  
  const startingLord = nakshatraLords[nakshatra];
  const startingLordIndex = DASHA_SEQUENCE.indexOf(startingLord);
  
  // Calculate total years elapsed before birth
  let totalYears = 0;
  for (let i = 0; i < startingLordIndex; i++) {
    totalYears += DASHA_YEARS[DASHA_SEQUENCE[i]];
  }
  
  // Add consumed years of current dasha
  const currentDashaFullYears = DASHA_YEARS[startingLord];
  const consumedYears = currentDashaFullYears * (1 - balance);
  totalYears += consumedYears;
  
  // Find current periods
  const birthTime = birthDate.getTime();
  let currentTime = new Date().getTime();
  
  // Calculate years elapsed since birth
  const yearsFromBirth = (currentTime - birthTime) / (365.25 * 24 * 60 * 60 * 1000);
  const totalElapsedYears = totalYears + yearsFromBirth;
  
  // Find current Mahadasha
  let mahadashaIndex = 0;
  let mahadashaStart = totalYears;
  while (mahadashaStart <= totalElapsedYears) {
    mahadashaIndex = (startingLordIndex + Math.floor(mahadashaStart / 120)) % 9;
    if (mahadashaStart + DASHA_YEARS[DASHA_SEQUENCE[mahadashaIndex]] > totalElapsedYears) {
      break;
    }
    mahadashaStart += DASHA_YEARS[DASHA_SEQUENCE[mahadashaIndex]];
  }
  
  // Calculate Mahadasha dates
  const mahadashaStartDate = new Date(birthTime + mahadashaStart * 365.25 * 24 * 60 * 60 * 1000);
  const mahadashaEndDate = new Date(birthTime + (mahadashaStart + DASHA_YEARS[DASHA_SEQUENCE[mahadashaIndex]]) * 365.25 * 24 * 60 * 60 * 1000);
  
  // Find current Antardasha
  const yearInMahadasha = totalElapsedYears - mahadashaStart;
  const mahadashaPlanet = DASHA_SEQUENCE[mahadashaIndex];
  let antardashaIndex = mahadashaIndex;
  let antardashaStart = mahadashaStart;
  
  while (antardashaStart <= totalElapsedYears) {
    antardashaIndex = (antardashaIndex + 1) % 9;
    const antardashaDuration = (DASHA_YEARS[DASHA_SEQUENCE[antardashaIndex]] * DASHA_YEARS[mahadashaPlanet]) / 120;
    if (antardashaStart + antardashaDuration > totalElapsedYears) {
      break;
    }
    antardashaStart += antardashaDuration;
  }
  
  // Calculate Antardasha dates
  const antardashaDuration = (DASHA_YEARS[DASHA_SEQUENCE[antardashaIndex]] * DASHA_YEARS[mahadashaPlanet]) / 120;
  const antardashaStartDate = new Date(birthTime + antardashaStart * 365.25 * 24 * 60 * 60 * 1000);
  const antardashaEndDate = new Date(birthTime + (antardashaStart + antardashaDuration) * 365.25 * 24 * 60 * 60 * 1000);
  
  return {
    mahadasha: {
      planet: mahadashaPlanet,
      startDate: mahadashaStartDate,
      endDate: mahadashaEndDate,
    },
    antardasha: {
      planet: DASHA_SEQUENCE[antardashaIndex],
      startDate: antardashaStartDate,
      endDate: antardashaEndDate,
    }
  };
} 