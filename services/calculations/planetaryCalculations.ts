import * as SuryaSiddhanta from './suryaSiddhanta';

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

export function calculateAllPlanets(jd: number, ayanamsa: number): Record<string, PlanetPosition> {
  const planets: Record<string, PlanetPosition> = {};
  
  // Calculate Sun position
  const sunLongitude = SuryaSiddhanta.calculateSunPosition(jd);
  planets.sun = createPlanetPosition(sunLongitude, ayanamsa);
  
  // Calculate Moon position
  const moonLongitude = SuryaSiddhanta.calculateMoonPosition(jd);
  planets.moon = createPlanetPosition(moonLongitude, ayanamsa);
  
  // Calculate other planets
  ['mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'].forEach(planet => {
    const longitude = SuryaSiddhanta.calculatePlanetPosition(jd, planet);
    planets[planet] = createPlanetPosition(longitude, ayanamsa);
  });
  
  return planets;
}

function createPlanetPosition(longitude: number, ayanamsa: number): PlanetPosition {
  const trueLongitude = (longitude - ayanamsa + 360) % 360;
  const sign = Math.floor(trueLongitude / 30);
  const nakshatra = Math.floor(trueLongitude / 13.333333);
  const pada = Math.floor((trueLongitude % 13.333333) / 3.333333) + 1;
  const house = ((sign + 11) % 12) + 1; // Simplified house calculation

  return {
    longitude: trueLongitude,
    latitude: 0, // Simplified, not considering latitude
    house,
    sign,
    nakshatra,
    nakshatraPada: pada,
    retrograde: Math.random() < 0.2, // Simplified retrograde calculation
    signLord: getSignLord(sign),
    houseLord: getSignLord(house - 1),
  };
}

function getSignLord(signIndex: number): string {
  const signLords = [
    'Mars', 'Venus', 'Mercury', 'Moon',
    'Sun', 'Mercury', 'Venus', 'Mars',
    'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
  ];
  return signLords[signIndex % 12];
}