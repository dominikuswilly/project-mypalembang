export const categories = [
  { id: 'destinations', name: 'Destinations', icon: 'MapPin', subcategories: ['Nature', 'Culture', 'Religi', 'Family', 'Adventure'] },
  { id: 'stay', name: 'Accommodation', icon: 'Bed', subcategories: ['Luxury', 'Budget', 'Alternative'] },
  { id: 'food', name: 'Gastronomy', icon: 'Utensils', subcategories: ['Legendary', 'Fine Dining', 'Cafe', 'Street Food'] },
  { id: 'mobility', name: 'Mobility', icon: 'Car', subcategories: ['Rentals', 'Public Transit', 'Airport Transfer'] },
  { id: 'essentials', name: 'Essentials', icon: 'ShieldCheck', subcategories: ['Health', 'Financial', 'Retail'] },
  { id: 'events', name: 'Events', icon: 'Calendar', subcategories: ['Calendar', 'Seasonal'] },
];

export const topSpots = [
  {
    id: 'ampera',
    name: 'Jembatan Ampera',
    category: 'destinations',
    subcategory: 'Culture',
    description: 'Iconic bridge of Palembang spanning the Musi River.',
    rating: 4.8,
    reviews: 1240,
    distance: 1.2,
    sustainability: true,
    image: 'https://images.unsplash.com/photo-1596438459194-f97544372ef8?q=80&w=800&auto=format&fit=crop',
    tags: ['Iconic', 'Landmark', 'View']
  },
  {
    id: 'kemaro',
    name: 'Pulau Kemaro',
    category: 'destinations',
    subcategory: 'Culture',
    description: 'Legendary island in the middle of Musi River with a multi-story pagoda.',
    rating: 4.6,
    reviews: 850,
    distance: 5.4,
    sustainability: false,
    image: 'https://images.unsplash.com/photo-1625244724123-1ee7ca90cbb4?q=80&w=800&auto=format&fit=crop',
    tags: ['Culture', 'Legend', 'Temple']
  },
  {
    id: 'alquran',
    name: 'Al-Qur\'an Al-Akbar',
    category: 'destinations',
    subcategory: 'Religi',
    description: 'The world\'s largest carved wooden Al-Qur\'an.',
    rating: 4.9,
    reviews: 2100,
    distance: 3.8,
    sustainability: true,
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
    tags: ['Religious', 'Craftsmanship', 'Art']
  },
  {
    id: 'puntikayu',
    name: 'Punti Kayu Park',
    category: 'destinations',
    subcategory: 'Nature',
    description: 'Large pine forest and recreation park in the heart of the city.',
    rating: 4.4,
    reviews: 620,
    distance: 7.1,
    sustainability: true,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
    tags: ['Nature', 'Family', 'Pine']
  },
  {
    id: 'pempek-vico',
    name: 'Pempek Vico',
    category: 'food',
    subcategory: 'Legendary',
    description: 'Famous shop for legendary Pempek, Palembang\'s signature dish.',
    rating: 4.7,
    reviews: 3400,
    distance: 0.5,
    sustainability: false,
    image: 'https://images.unsplash.com/photo-1606787366850-de63d052a2c6?q=80&w=800&auto=format&fit=crop',
    tags: ['Local', 'Food', 'Signature']
  }
];
