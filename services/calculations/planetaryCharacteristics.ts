export const PLANET_CHARACTERISTICS = {
  sun: {
    nature: 'Natural malefic',
    signifies: 'Soul, father, authority, government, vitality, ego',
    positiveTraits: 'Leadership, confidence, courage, dignity, willpower',
    negativeTraits: 'Ego, dominating nature, pride, arrogance',
    bodyParts: 'Heart, eyes, bones',
    professions: 'Government, administration, politics, leadership roles',
    colors: ['Gold', 'Copper', 'Orange'],
    metals: ['Gold', 'Copper'],
    gemstones: ['Ruby', 'Garnet', 'Red Spinel'],
    direction: 'East',
    dayOfWeek: 'Sunday',
  },
  moon: {
    nature: 'Natural benefic',
    signifies: 'Mind, mother, emotions, public, water, fertility',
    positiveTraits: 'Nurturing, intuitive, adaptable, emotional intelligence',
    negativeTraits: 'Moodiness, dependency, emotional instability',
    bodyParts: 'Blood, lymphatic system, breasts',
    professions: 'Healthcare, hospitality, public service, marine industries',
    colors: ['White', 'Pearl', 'Silver'],
    metals: ['Silver', 'Pearl'],
    gemstones: ['Pearl', 'Moonstone', 'White Coral'],
    direction: 'Northwest',
    dayOfWeek: 'Monday',
  },
  mars: {
    nature: 'Natural malefic',
    signifies: 'Energy, courage, siblings, property, warfare',
    positiveTraits: 'Courage, determination, strength, initiative',
    negativeTraits: 'Aggression, impulsiveness, anger, violence',
    bodyParts: 'Muscles, blood, bone marrow',
    professions: 'Military, sports, engineering, surgery',
    colors: ['Red', 'Crimson', 'Scarlet'],
    metals: ['Copper', 'Iron'],
    gemstones: ['Red Coral', 'Carnelian', 'Red Jasper'],
    direction: 'South',
    dayOfWeek: 'Tuesday',
  },
  mercury: {
    nature: 'Neutral',
    signifies: 'Intelligence, communication, business, education',
    positiveTraits: 'Intelligence, analytical skills, adaptability',
    negativeTraits: 'Nervousness, restlessness, indecision',
    bodyParts: 'Nervous system, skin, lungs',
    professions: 'Writing, teaching, accounting, trade',
    colors: ['Green', 'Emerald'],
    metals: ['Bronze', 'Brass'],
    gemstones: ['Emerald', 'Jade', 'Green Tourmaline'],
    direction: 'North',
    dayOfWeek: 'Wednesday',
  },
  jupiter: {
    nature: 'Great benefic',
    signifies: 'Wisdom, spirituality, wealth, children, fortune',
    positiveTraits: 'Wisdom, optimism, generosity, spirituality',
    negativeTraits: 'Overindulgence, extravagance, overconfidence',
    bodyParts: 'Liver, fat tissues, thighs',
    professions: 'Teaching, law, banking, religious work',
    colors: ['Yellow', 'Gold', 'Orange'],
    metals: ['Gold', 'Brass'],
    gemstones: ['Yellow Sapphire', 'Topaz', 'Citrine'],
    direction: 'Northeast',
    dayOfWeek: 'Thursday',
  },
  venus: {
    nature: 'Natural benefic',
    signifies: 'Love, marriage, luxury, arts, pleasure',
    positiveTraits: 'Artistic, romantic, diplomatic, refined',
    negativeTraits: 'Overindulgence, vanity, laziness',
    bodyParts: 'Reproductive system, kidneys, throat',
    professions: 'Arts, entertainment, beauty, luxury goods',
    colors: ['White', 'Silver', 'Pink'],
    metals: ['Silver', 'Platinum'],
    gemstones: ['Diamond', 'White Sapphire', 'Zircon'],
    direction: 'Southeast',
    dayOfWeek: 'Friday',
  },
  saturn: {
    nature: 'Great malefic',
    signifies: 'Longevity, karma, discipline, delays',
    positiveTraits: 'Discipline, responsibility, wisdom from experience',
    negativeTraits: 'Depression, delays, limitations, pessimism',
    bodyParts: 'Bones, teeth, knees',
    professions: 'Mining, agriculture, labor, public service',
    colors: ['Black', 'Dark Blue', 'Purple'],
    metals: ['Iron', 'Lead'],
    gemstones: ['Blue Sapphire', 'Amethyst', 'Black Pearl'],
    direction: 'West',
    dayOfWeek: 'Saturday',
  },
  rahu: {
    nature: 'Shadow malefic',
    signifies: 'Illusion, obsession, foreign influences',
    positiveTraits: 'Innovation, unconventional success, psychic abilities',
    negativeTraits: 'Deception, confusion, obsession',
    bodyParts: 'Nervous system disorders',
    professions: 'Research, occult sciences, foreign trade',
    colors: ['Smoky', 'Mixed colors'],
    metals: ['Lead', 'Mixed metals'],
    gemstones: ['Hessonite Garnet', 'Black Tourmaline'],
    direction: 'Southwest',
  },
  ketu: {
    nature: 'Shadow malefic',
    signifies: 'Spirituality, liberation, past life karma',
    positiveTraits: 'Spiritual insight, detachment, healing abilities',
    negativeTraits: 'Confusion, escapism, lack of direction',
    bodyParts: 'Chronic ailments',
    professions: 'Healing, spirituality, research',
    colors: ['Grey', 'Mixed colors'],
    metals: ['Mixed metals'],
    gemstones: ['Cat\'s Eye', 'Tiger\'s Eye'],
    direction: 'Southwest',
  },
};

export const DASHA_EFFECTS = {
  sun: {
    sun: 'Period of authority and recognition. Focus on career and father figures.',
    moon: 'Balance between authority and emotions. Good for public relations.',
    mars: 'High energy and ambition. Risk of conflicts with authority.',
    mercury: 'Intellectual achievements and communication skills shine.',
    jupiter: 'Success in career and spiritual growth. Government favors.',
    venus: 'Creative recognition and relationship with authority figures.',
    saturn: 'Challenges with authority. Need for patience and persistence.',
    rahu: 'Unconventional success. Foreign connections helpful.',
    ketu: 'Spiritual authority. Detachment from material success.',
  },
  moon: {
    // Add combinations for moon mahadasha
  },
  mars: {
    // Add combinations for mars mahadasha
  },
  // Add combinations for other planets
};

export const TRANSIT_EFFECTS = {
  jupiter: {
    1: 'Personal growth and new beginnings',
    2: 'Financial gains and family harmony',
    3: 'Communication skills improve',
    4: 'Property gains and emotional wellbeing',
    5: 'Children\'s progress and creative success',
    6: 'Victory over enemies and good health',
    7: 'Relationship opportunities',
    8: 'Spiritual transformation',
    9: 'Fortune and higher learning',
    10: 'Career advancement',
    11: 'Fulfillment of desires',
    12: 'Spiritual growth and expenses',
  },
  saturn: {
    // Add effects for saturn transit through houses
  },
  // Add effects for other transiting planets
}; 