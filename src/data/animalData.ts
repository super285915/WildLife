// Animal data interface
export interface Animal {
  id: number;
  name: string;
  scientificName?: string;
  description: string;
  image: string;
  habitat?: string;
  diet?: string;
  conservationStatus: string;
  region: string;
  activityTime?: string;
  highlighted?: boolean;
  highlightReason?: string;
}

// Status color mapping
export const statusColors = {
  'Least Concern': '#4caf50',
  'Near Threatened': '#8bc34a',
  'Vulnerable': '#ffc107',
  'Endangered': '#ff9800',
  'Critically Endangered': '#f44336',
  'Extinct in Wild': '#9c27b0',
  'Extinct': '#000000',
};

// Combined animal data with all details
export const animalData: Animal[] = [
  {
    id: 1,
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    description: 'The largest land animals on Earth, known for their intelligence and complex social structures. They can live up to 70 years in the wild.',
    image: 'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg',
    habitat: 'Savanna',
    diet: 'Herbivore',
    conservationStatus: 'Vulnerable',
    region: 'Africa',
    activityTime: 'Diurnal',
    highlighted: true,
    highlightReason: 'Conservation Success Story',
  },
  {
    id: 2,
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    description: 'A tiger subspecies native to the Indian subcontinent with a distinctive orange coat with black stripes. They can run at speeds up to 65 km/h.',
    image: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg',
    habitat: 'Forest',
    diet: 'Carnivore',
    conservationStatus: 'Endangered',
    region: 'Asia',
    activityTime: 'Nocturnal',
    highlighted: true,
    highlightReason: 'Flagship Conservation Species',
  },
  {
    id: 3,
    name: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    description: 'A bear native to China, known for its distinctive black and white coloring. They spend 10-16 hours a day feeding on bamboo.',
    image: 'https://images.pexels.com/photos/158109/kodiak-brown-bear-adult-portrait-wildlife-158109.jpeg',
    habitat: 'Forest',
    diet: 'Herbivore',
    conservationStatus: 'Vulnerable',
    region: 'Asia',
    activityTime: 'Crepuscular',
    highlighted: true,
    highlightReason: 'Symbol of Wildlife Conservation',
  },
  {
    id: 4,
    name: 'Komodo Dragon',
    scientificName: 'Varanus komodoensis',
    description: 'The largest living species of lizard, found in Indonesian islands. A powerful predator with venomous saliva that can take down large prey.',
    image: 'https://images.pexels.com/photos/6686455/pexels-photo-6686455.jpeg',
    habitat: 'Grassland',
    diet: 'Carnivore',
    conservationStatus: 'Endangered',
    region: 'Asia',
    activityTime: 'Diurnal',
    highlighted: true,
    highlightReason: 'Unique Island Species',
  },
  {
    id: 5,
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    description: 'A small, arboreal mammal native to the eastern Himalayas and southwestern China. They have a bushy tail and feed mainly on bamboo.',
    image: 'https://images.pexels.com/photos/145902/pexels-photo-145902.jpeg',
    habitat: 'Forest',
    diet: 'Omnivore',
    conservationStatus: 'Endangered',
    region: 'Asia',
    activityTime: 'Crepuscular',
    highlighted: true,
    highlightReason: 'Endangered Mountain Species',
  },
  {
    id: 6,
    name: 'African Lion',
    scientificName: 'Panthera leo',
    description: 'Known as the "king of the jungle," lions are the second-largest big cat after tigers. They live in prides and are apex predators.',
    image: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg',
    habitat: 'Savanna',
    diet: 'Carnivore',
    conservationStatus: 'Vulnerable',
    region: 'Africa',
    activityTime: 'Nocturnal',
    highlighted: false,
  },
  {
    id: 7,
    name: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    description: 'The largest land carnivore, adapted to life in the Arctic with thick fur and layers of fat. They primarily hunt seals on sea ice.',
    image: 'https://images.pexels.com/photos/3777200/pexels-photo-3777200.jpeg',
    habitat: 'Tundra',
    diet: 'Carnivore',
    conservationStatus: 'Vulnerable',
    region: 'Arctic',
    activityTime: 'Diurnal',
    highlighted: true,
    highlightReason: 'Climate Change Indicator Species',
  },
  {
    id: 8,
    name: 'Sumatran Orangutan',
    scientificName: 'Pongo abelii',
    description: 'Critically endangered great apes known for their intelligence. They share 96.4% of our DNA and can use tools and solve complex problems.',
    image: 'https://images.pexels.com/photos/1321794/pexels-photo-1321794.jpeg',
    habitat: 'Forest',
    diet: 'Herbivore',
    conservationStatus: 'Critically Endangered',
    region: 'Asia',
    activityTime: 'Diurnal',
    highlighted: true,
    highlightReason: 'Critically Endangered Primate',
  },
  {
    id: 9,
    name: 'Blue Poison Dart Frog',
    scientificName: 'Dendrobates tinctorius azureus',
    description: 'A small, brightly colored frog native to South America. Their skin secretes toxins used by indigenous people for hunting.',
    image: 'https://images.pexels.com/photos/674318/pexels-photo-674318.jpeg',
    habitat: 'Rainforest',
    diet: 'Carnivore',
    conservationStatus: 'Near Threatened',
    region: 'South America',
    activityTime: 'Diurnal',
    highlighted: false,
  },
  {
    id: 10,
    name: 'Galapagos Tortoise',
    scientificName: 'Chelonoidis niger',
    description: 'One of the longest-lived animals, with some individuals exceeding 100 years. They played a key role in Darwin\'s theory of evolution.',
    image: 'https://images.pexels.com/photos/2613148/pexels-photo-2613148.jpeg',
    habitat: 'Island',
    diet: 'Herbivore',
    conservationStatus: 'Vulnerable',
    region: 'South America',
    activityTime: 'Diurnal',
    highlighted: false,
  },
  {
    id: 11,
    name: 'Koala',
    scientificName: 'Phascolarctos cinereus',
    description: 'An arboreal herbivorous marsupial native to Australia. They sleep up to 20 hours a day and feed exclusively on eucalyptus leaves.',
    image: 'https://images.pexels.com/photos/3690511/pexels-photo-3690511.jpeg',
    habitat: 'Forest',
    diet: 'Herbivore',
    conservationStatus: 'Vulnerable',
    region: 'Australia',
    activityTime: 'Nocturnal',
    highlighted: false,
  },
  {
    id: 12,
    name: 'California Condor',
    scientificName: 'Gymnogyps californianus',
    description: 'The largest North American land bird with a wingspan of up to 3 meters. They were brought back from the brink of extinction through conservation efforts.',
    image: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg',
    habitat: 'Mountain',
    diet: 'Carnivore',
    conservationStatus: 'Critically Endangered',
    region: 'North America',
    activityTime: 'Diurnal',
    highlighted: true,
    highlightReason: 'Conservation Recovery Success',
  },
];

// Get highlighted animals
export const highlightedAnimals = animalData.filter(animal => animal.highlighted);

// Extract unique habitats, conservation statuses, and activity times
export const habitats = ['All', ...Array.from(new Set(animalData.map(animal => animal.habitat).filter(Boolean)))];
export const conservationStatuses = ['All', ...Array.from(new Set(animalData.map(animal => animal.conservationStatus)))];
export const activityTimes = ['All', ...Array.from(new Set(animalData.map(animal => animal.activityTime).filter(Boolean)))];

// Get unique regions from animal data
export const regions = ['All', ...Array.from(new Set(animalData.map(animal => animal.region)))];
