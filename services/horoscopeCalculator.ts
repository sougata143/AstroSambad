import type { BirthDetails } from '@/types/birthDetails';
import * as SuryaSiddhanta from './calculations/suryaSiddhanta';
import * as VimshottariDasha from './calculations/vimshottariDasha';
import * as PlanetaryCalculations from './calculations/planetaryCalculations';
import * as YogaCalculations from './calculations/yogaCalculations';

interface PlanetPosition {
  longitude: number;
  latitude: number;
  house: number;
  sign: number;
  nakshatra: number;
  nakshatraPada: number;
  retrograde: boolean;
  signLord: string;
  houseLord: string;
}

interface HoroscopeData {
  ascendant: {
    degree: number;
    sign: number;
    signName: string;
    signLord: string;
  };
  planets: Record<string, PlanetPosition>;
  houses: {
    number: number;
    degree: number;
    sign: number;
    signName: string;
    planets: string[];
    signLord: string;
    aspects: string[];
    significance: string;
  }[];
  dashas: {
    mahadasha: {
      planet: string;
      startDate: Date;
      endDate: Date;
    };
    antardasha: {
      planet: string;
      startDate: Date;
      endDate: Date;
    };
  };
  yogas: {
    name: string;
    description: string;
    strength: number;
  }[];
}

export class HoroscopeCalculator {
  private static readonly SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  private static readonly NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini',
    'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya',
    'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha',
    'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  static calculateHoroscope(birthDetails: BirthDetails): HoroscopeData {
    try {
      // Validate birth details
      if (!birthDetails?.dateOfBirth || !birthDetails?.timeOfBirth) {
        throw new Error('Missing birth date or time');
      }

      // Parse date properly
      const birthDate = new Date(birthDetails.dateOfBirth);
      if (isNaN(birthDate.getTime())) {
        throw new Error('Invalid birth date format');
      }

      // Parse time properly
      const [hours, minutes] = birthDetails.timeOfBirth.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid birth time format');
      }

      // Set the time on the birth date
      birthDate.setHours(hours, minutes, 0, 0);

      // Validate birth place
      if (!birthDetails.birthPlace?.latitude || !birthDetails.birthPlace?.longitude) {
        throw new Error('Invalid birth place coordinates');
      }

      // Calculate Julian Day Number
      const jdn = this.calculateJulianDayNumber(birthDate);
      
      // Calculate Ayanamsa
      const ayanamsa = this.calculateAyanamsa(jdn);
      
      // Calculate Local Sidereal Time
      const lst = this.calculateLocalSiderealTime(jdn, birthDetails.birthPlace.longitude);
      
      // Calculate Ascendant
      const ascendantResult = SuryaSiddhanta.calculateAscendant(
        lst,
        birthDetails.birthPlace.latitude,
        ayanamsa
      );
      
      const ascendant = {
        degree: ascendantResult.longitude % 30,
        sign: Math.floor(ascendantResult.longitude / 30),
        signName: this.SIGNS[Math.floor(ascendantResult.longitude / 30)] || 'Unknown',
        signLord: this.getSignLord(Math.floor(ascendantResult.longitude / 30)),
      };
      
      // Calculate Planet Positions
      const planets = PlanetaryCalculations.calculateAllPlanets(jdn, ayanamsa);
      
      // Calculate Houses
      const houses = this.calculateHouses(ascendant, planets);
      
      // Calculate Dashas
      const dashas = VimshottariDasha.calculate(birthDetails, planets);
      
      // Calculate Yogas
      const yogas = YogaCalculations.calculateAllYogas(planets, houses);

      return {
        ascendant,
        planets,
        houses,
        dashas,
        yogas
      };
    } catch (error) {
      console.error('Error calculating horoscope:', error);
      // Return default/empty data structure
      return {
        ascendant: {
          degree: 0,
          sign: 0,
          signName: 'Unknown',
          signLord: 'Unknown',
        },
        planets: {},
        houses: Array(12).fill(0).map((_, i) => ({
          number: i + 1,
          degree: 0,
          sign: 0,
          signName: 'Unknown',
          planets: [],
          signLord: 'Unknown',
          aspects: [],
          significance: '',
        })),
        dashas: {
          mahadasha: {
            planet: 'Unknown',
            startDate: new Date(),
            endDate: new Date(),
          },
          antardasha: {
            planet: 'Unknown',
            startDate: new Date(),
            endDate: new Date(),
          },
        },
        yogas: [],
      };
    }
  }

  private static calculateJulianDayNumber(birthDate: Date): number {
    // Extract date components
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1; // JavaScript months are 0-based
    const day = birthDate.getDate();
    const hours = birthDate.getHours();
    const minutes = birthDate.getMinutes();
    
    // Convert time to decimal hours (UT)
    const decimalHours = hours + minutes / 60;

    // Julian Day Number calculation (Meeus algorithm)
    const y = year;
    const m = month;
    const d = day + (decimalHours / 24.0);

    const a = Math.floor((14 - m) / 12);
    const y1 = y + 4800 - a;
    const m1 = m + (12 * a) - 3;

    let jdn = d + Math.floor((153 * m1 + 2) / 5) + (365 * y1) + 
              Math.floor(y1 / 4) - Math.floor(y1 / 100) + 
              Math.floor(y1 / 400) - 32045;

    // Adjust for time zone (approximate)
    const timeZoneOffset = new Date().getTimezoneOffset() / 60;
    jdn -= timeZoneOffset / 24;

    return jdn;
  }

  private static calculateAyanamsa(jdn: number): number {
    // Lahiri Ayanamsa calculation
    const t = (jdn - 2451545.0) / 36525; // Julian centuries from J2000.0
    return 23.85 + 0.0137 * t;
  }

  private static calculateLocalSiderealTime(jdn: number, longitude: number): number {
    // Calculate Greenwich Sidereal Time
    const t = (jdn - 2451545.0) / 36525;
    let gst = 280.46061837 + 360.98564736629 * (jdn - 2451545.0) +
              t * t * (0.000387933 - t / 38710000);
    
    // Normalize to 0-360 degrees
    gst = ((gst % 360) + 360) % 360;
    
    // Convert to Local Sidereal Time
    let lst = gst + longitude;
    lst = ((lst % 360) + 360) % 360;
    
    return lst;
  }

  private static calculatePlanetPositions(
    birthDetails: BirthDetails,
    jdn: number,
    ayanamsa: number
  ): Record<string, PlanetPosition> {
    return PlanetaryCalculations.calculateAllPlanets(jdn, ayanamsa);
  }

  private static calculateDashas(
    birthDetails: BirthDetails,
    planets: Record<string, PlanetPosition>
  ) {
    return VimshottariDasha.calculate(birthDetails, planets);
  }

  private static calculateYogas(
    planets: Record<string, PlanetPosition>,
    houses: any[]
  ) {
    return YogaCalculations.calculateAllYogas(planets, houses);
  }

  private static calculateHouses(ascendant: any, planets: Record<string, PlanetPosition>) {
    // Calculate house positions based on ascendant
    const houses = Array(12).fill(0).map((_, i) => {
      const houseNumber = i + 1;
      const signIndex = (ascendant.sign + i) % 12;
      const housePlanets = Object.entries(planets)
        .filter(([_, planet]) => planet.house === houseNumber)
        .map(([name, _]) => name);

      return {
        number: houseNumber,
        degree: (ascendant.degree + i * 30) % 360,
        sign: signIndex,
        signName: this.SIGNS[signIndex],
        planets: housePlanets,
        signLord: this.getSignLord(signIndex),
        aspects: this.getHouseAspects(houseNumber),
        significance: this.getHouseSignificance(houseNumber),
      };
    });

    return houses;
  }

  private static getSignLord(signIndex: number): string {
    const signLords = [
      'Mars',     // Aries
      'Venus',    // Taurus
      'Mercury',  // Gemini
      'Moon',     // Cancer
      'Sun',      // Leo
      'Mercury',  // Virgo
      'Venus',    // Libra
      'Mars',     // Scorpio
      'Jupiter',  // Sagittarius
      'Saturn',   // Capricorn
      'Saturn',   // Aquarius
      'Jupiter',  // Pisces
    ];
    return signLords[signIndex];
  }

  private static getHouseAspects(houseNumber: number): string[] {
    // Natural aspects based on Vedic astrology
    const aspects: Record<number, number[]> = {
      1: [7],     // 7th aspect
      2: [8],     // 8th aspect
      3: [9],     // 9th aspect
      4: [10],    // 10th aspect
      5: [11],    // 11th aspect
      6: [12],    // 12th aspect
      7: [1],     // 1st aspect
      8: [2],     // 2nd aspect
      9: [3],     // 3rd aspect
      10: [4],    // 4th aspect
      11: [5],    // 5th aspect
      12: [6],    // 6th aspect
    };
    
    return aspects[houseNumber]?.map(house => `House ${house}`) || [];
  }

  private static getHouseSignificance(houseNumber: number): string {
    const significances: Record<number, string> = {
      1: 'Self, personality, physical appearance, general well-being',
      2: 'Wealth, family, speech, early education, food habits',
      3: 'Siblings, courage, communication, short journeys',
      4: 'Mother, emotions, property, vehicles, education',
      5: 'Children, intelligence, romance, creative pursuits',
      6: 'Enemies, diseases, debts, service, daily routine',
      7: 'Marriage, business partnerships, foreign travel',
      8: 'Longevity, obstacles, occult, inheritance, sudden events',
      9: 'Fortune, higher learning, spirituality, father',
      10: 'Career, status, authority, government relations',
      11: 'Gains, aspirations, elder siblings, social network',
      12: 'Losses, expenses, spirituality, foreign residence',
    };
    return significances[houseNumber] || '';
  }

  static getNakshatraName(nakshatraIndex: number): string {
    return this.NAKSHATRAS[nakshatraIndex] || 'Unknown';
  }

  static getSignName(signIndex: number): string {
    return this.SIGNS[signIndex] || 'Unknown';
  }
} 