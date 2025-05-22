// Mock data for the app
// In a real app, this would be replaced with API calls

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  location: string;
  rating: number;
  category: string;
  entranceFee?: string;
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  location: string;
  rating: number;
  category: string;
  pricePerNight: number;
  amenities: string[];
}

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  type: 'attraction' | 'hotel';
}

// Sample attractions data
const attractions: Attraction[] = [
  {
    id: 1,
    name: 'Sultan Qaboos Grand Mosque',
    description: 'The Sultan Qaboos Grand Mosque is the main mosque in the Sultanate of Oman. It is in the capital city of Muscat, and was completed in 2001. The mosque is built from 300,000 tonnes of Indian sandstone, and the main prayer hall can hold 6,500 worshippers.',
    image: 'https://images.pexels.com/photos/3608409/pexels-photo-3608409.jpeg',
    location: 'Muscat',
    rating: 4.8,
    category: 'Historical',
    entranceFee: 'Free'
  },
  {
    id: 2,
    name: 'Wadi Shab',
    description: 'Wadi Shab is a wadi located in the Al Sharqiyah region of Oman. It is popular with both tourists and locals, and is known for its natural beauty, emerald green pools, and waterfalls.',
    image: 'https://images.pexels.com/photos/3608295/pexels-photo-3608295.jpeg',
    location: 'Al Sharqiyah',
    rating: 4.7,
    category: 'Natural'
  },
  {
    id: 3,
    name: 'Nizwa Fort',
    description: 'Nizwa Fort is a massive castle in Nizwa, Oman. It was built in the 1650s and is Oman\'s most visited national monument. The fort was the administrative seat of authority for the presiding Imams and Walis in times of peace and conflict.',
    image: 'https://images.pexels.com/photos/4740801/pexels-photo-4740801.jpeg',
    location: 'Nizwa',
    rating: 4.6,
    category: 'Historical',
    entranceFee: '5 OMR'
  },
  {
    id: 4,
    name: 'Jebel Shams',
    description: 'Jebel Shams (Mountain of Sun) is the highest mountain of the Hajar range and the country of Oman. It is a popular sightseeing area located around 240 km from Muscat. Jebel Shams is dubbed the "Grand Canyon of Oman" for the spectacular views of the surrounding canyon.',
    image: 'https://images.pexels.com/photos/9661077/pexels-photo-9661077.jpeg',
    location: 'Al Hamra',
    rating: 4.9,
    category: 'Natural'
  },
  {
    id: 5,
    name: 'Salalah Beaches',
    description: 'Salalah has some of the most beautiful beaches in Oman, known for their pristine white sand and clear blue waters. The beaches are particularly beautiful during the Khareef season when the surrounding landscape turns green.',
    image: 'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
    location: 'Salalah',
    rating: 4.5,
    category: 'Natural'
  },
  {
    id: 6,
    name: 'Wahiba Sands',
    description: 'Wahiba Sands, also known as Sharqiya Sands, is a desert area in Oman. The desert has been of scientific interest since a 1986 expedition by the Royal Geographical Society documented the diversity of the terrain, the flora and fauna, noting 16,000 invertebrates as well as 200 species of other wildlife.',
    image: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
    location: 'Sharqiya',
    rating: 4.7,
    category: 'Adventure'
  },
  {
    id: 7,
    name: 'Mutrah Souq',
    description: 'Mutrah Souq is a traditional market in Muscat, Oman. It is located in the heart of old Muscat, and is famous for its traditional Omani crafts, textiles, spices, and jewelry.',
    image: 'https://images.pexels.com/photos/2949293/pexels-photo-2949293.jpeg',
    location: 'Muscat',
    rating: 4.4,
    category: 'Cultural'
  },
  {
    id: 8,
    name: 'Bimmah Sinkhole',
    description: 'The Bimmah Sinkhole is a water-filled depression, structurally a sink hole, located in the Hawiyat Najm Park, Oman. It is a popular tourist destination and swimming location.',
    image: 'https://images.pexels.com/photos/9842420/pexels-photo-9842420.jpeg',
    location: 'Muscat',
    rating: 4.6,
    category: 'Natural'
  }
];

// Sample hotels data
const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Al Bustan Palace, a Ritz-Carlton Hotel',
    description: 'Set against the backdrop of the rugged Al Hajar mountains, this unparalleled luxury resort commands a prime beachfront location and is set within a former palace. The hotel features elegantly appointed rooms and suites with private balconies overlooking the sea or mountains.',
    image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
    location: 'Muscat',
    rating: 4.9,
    category: 'Luxury',
    pricePerNight: 350,
    amenities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant']
  },
  {
    id: 2,
    name: 'W Muscat',
    description: 'Located in the upbeat Shatti Al Qurum beachfront, W Muscat pulses from day to night with all things happening. Oman\'s rich heritage is seamlessly infused with the hotel\'s bold, surprising, and vibrant style, creating a lifestyle experience.',
    image: 'https://images.pexels.com/photos/2017802/pexels-photo-2017802.jpeg',
    location: 'Muscat',
    rating: 4.7,
    category: 'Luxury',
    pricePerNight: 290,
    amenities: ['wifi', 'pool', 'spa', 'breakfast']
  },
  {
    id: 3,
    name: 'Anantara Al Jabal Al Akhdar Resort',
    description: 'Perched 2,000 metres above sea level on the curving rim of a great canyon, Anantara Al Jabal Al Akhdar Resort is a remarkable base for exploring Oman\'s most breathtaking landscapes. The resort offers a total of 115 rooms and villas, each with its own private balcony or terrace.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    location: 'Nizwa',
    rating: 4.8,
    category: 'Resorts',
    pricePerNight: 400,
    amenities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant']
  },
  {
    id: 4,
    name: 'Crowne Plaza Muscat',
    description: 'The Crowne Plaza Muscat Hotel offers a perfect blend of relaxation and convenience for both business and leisure travelers. The hotel is located on its own private bay, with easy access to the beach and stunning views of the Gulf of Oman.',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    location: 'Muscat',
    rating: 4.5,
    category: 'Mid-range',
    pricePerNight: 180,
    amenities: ['wifi', 'pool', 'breakfast']
  },
  {
    id: 5,
    name: 'Salalah Rotana Resort',
    description: 'The luxurious 5-star Salalah Rotana Resort is set along the shores of the Indian Ocean, surrounded by tropical gardens. The resort boasts spacious rooms with luxury amenities, and is ideal for families and couples looking for a relaxing holiday.',
    image: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
    location: 'Salalah',
    rating: 4.6,
    category: 'Resorts',
    pricePerNight: 250,
    amenities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant']
  },
  {
    id: 6,
    name: 'Desert Nights Camp',
    description: 'Desert Nights Camp is the perfect place to experience the magic of the desert in Oman. Nestled among the dunes of Wahiba, the camp offers luxury tents with modern amenities, allowing guests to enjoy the tranquility of the desert while still enjoying comfort.',
    image: 'https://images.pexels.com/photos/135157/pexels-photo-135157.jpeg',
    location: 'Wahiba Sands',
    rating: 4.7,
    category: 'Mid-range',
    pricePerNight: 200,
    amenities: ['wifi', 'breakfast', 'restaurant']
  },
  {
    id: 7,
    name: 'Shangri-La Barr Al Jissah Resort & Spa',
    description: 'Nestled between rugged mountains and the Gulf of Oman, Shangri-La Barr Al Jissah Resort & Spa comprises three hotels: Al Waha, Al Bandar, and Al Husn. Each hotel caters to different needs, from family-friendly to luxurious and exclusive.',
    image: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
    location: 'Muscat',
    rating: 4.8,
    category: 'Luxury',
    pricePerNight: 320,
    amenities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant']
  },
  {
    id: 8,
    name: 'Al Baleed Resort Salalah by Anantara',
    description: 'Al Baleed Resort Salalah by Anantara offers luxury villas with private pools, nestled between a beach and freshwater lagoon. It\'s the first and only luxury villa resort of its kind in Salalah, perfect for experiencing the region\'s natural beauty and cultural treasures.',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    location: 'Salalah',
    rating: 4.9,
    category: 'Resorts',
    pricePerNight: 380,
    amenities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant']
  }
];

// Sample favorites data (empty for now, would be populated by user interactions)
const favorites: FavoriteItem[] = [
  {
    id: 1,
    name: 'Sultan Qaboos Grand Mosque',
    image: 'https://images.pexels.com/photos/3608409/pexels-photo-3608409.jpeg',
    location: 'Muscat',
    rating: 4.8,
    type: 'attraction'
  },
  {
    id: 3,
    name: 'Anantara Al Jabal Al Akhdar Resort',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    location: 'Nizwa',
    rating: 4.8,
    type: 'hotel'
  }
];

// Get featured items for home screen
export const fetchFeaturedData = () => {
  return {
    attractions: attractions.slice(0, 5),
    hotels: hotels.slice(0, 5)
  };
};

// Get all attractions
export const getAttractions = () => {
  return attractions;
};

// Get attraction by ID
export const getAttractionById = (id: number | string) => {
  const numId = typeof id === 'string' ? parseInt(id) : id;
  return attractions.find(attraction => attraction.id === numId) || attractions[0];
};

// Get all hotels
export const getHotels = () => {
  return hotels;
};

// Get hotel by ID
export const getHotelById = (id: number | string) => {
  const numId = typeof id === 'string' ? parseInt(id) : id;
  return hotels.find(hotel => hotel.id === numId) || hotels[0];
};

// Get favorite items
export const getFavorites = () => {
  return favorites;
};

// Add item to favorites (would be implemented with state management in a real app)
export const addToFavorites = (item: FavoriteItem) => {
  // Logic to add to favorites
  console.log('Added to favorites:', item);
};

// Remove item from favorites (would be implemented with state management in a real app)
export const removeFromFavorites = (id: number, type: 'attraction' | 'hotel') => {
  // Logic to remove from favorites
  console.log('Removed from favorites:', id, type);
};