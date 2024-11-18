export interface BirthDetails {
  name: string;
  dateOfBirth: Date;
  timeOfBirth: string;
  birthPlace: {
    latitude: number;
    longitude: number;
    timezone: string;
    locationName: string;
  };
  preferredLanguage: 'en' | 'hi' | 'bn';
  gender: 'male' | 'female' | 'other';
} 