export interface LocationData {
  slug: string;
  city: string;
  state: string;
  fullName: string;
  phone: string;
  address: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isHeadOffice?: boolean;
  metaDescription: string;
  heroDescription: string;
  localKeywords: string[];
  nearbyAreas: string[];
}

export const locations: LocationData[] = [
  {
    slug: 'columbia-md',
    city: 'Columbia',
    state: 'Maryland',
    fullName: 'Columbia, MD',
    phone: '(410) 937-7332',
    address: '10015 Old Columbia Rd Suite B 215, Columbia, MD 21046',
    zipCode: '21046',
    coordinates: { lat: 39.2037, lng: -76.8610 },
    isHeadOffice: true,
    metaDescription: "Offering top-notch IT services in Columbia, MD, near the Merriweather Post Pavilion. Customized solutions for businesses in Howard County.",
    heroDescription: "Discover unparalleled IT services in Columbia, MD, just moments from the scenic Merriweather Post Pavilion and vibrant Lakefront District. Experience tailored solutions to elevate your business in the heart of Howard County.",
    localKeywords: [
      'data recovery Columbia MD',
      'hard drive recovery Columbia Maryland',
      'SSD recovery Columbia',
      'RAID recovery Columbia MD',
      'iPhone data recovery Columbia',
      'laptop data recovery Columbia Maryland'
    ],
    nearbyAreas: [
      'Ellicott City',
      'Laurel',
      'Clarksville',
      'Fulton',
      'Savage',
      'North Laurel',
      'Jessup',
      'Elkridge'
    ]
  },
  {
    slug: 'baltimore-md',
    city: 'Baltimore',
    state: 'Maryland',
    fullName: 'Baltimore, MD',
    phone: '(410) 937-7332',
    address: 'Serving Baltimore Metro Area',
    zipCode: '21201',
    coordinates: { lat: 39.2904, lng: -76.6122 },
    metaDescription: "Experience Baltimore, MD, where history meets modernity at Fort McHenry and Inner Harbor. Dive into the local culture and taste iconic flavors at Lexington Market.",
    heroDescription: "Explore the vibrant culture of Baltimore, MD, with its rich history at Fort McHenry and a stunning harbor view. Discover local flavors at Lexington Market while soaking in the urban charm.",
    localKeywords: [
      'data recovery Baltimore MD',
      'hard drive recovery Baltimore Maryland',
      'server data recovery Baltimore',
      'business data recovery Baltimore MD',
      'emergency data recovery Baltimore'
    ],
    nearbyAreas: [
      'Towson',
      'Dundalk',
      'Catonsville',
      'Pikesville',
      'Essex',
      'Middle River',
      'Parkville',
      'Glen Burnie'
    ]
  },
  {
    slug: 'washington-dc',
    city: 'Washington',
    state: 'DC',
    fullName: 'Washington, DC',
    phone: '(410) 937-7332',
    address: 'Serving Washington DC Metro Area',
    zipCode: '20001',
    coordinates: { lat: 38.9072, lng: -77.0369 },
    metaDescription: "Explore Washington, DC, a city of history and innovation, where monumental landmarks and vibrant neighborhoods form a dynamic cultural mosaic.",
    heroDescription: "Discover Washington, DC's vibrant culture, from the iconic National Mall's monuments to the historic charm of Georgetown's cobblestone streets. Experience the city's dynamic blend of politics and cultural heritage in every corner.",
    localKeywords: [
      'data recovery Washington DC',
      'government data recovery DC',
      'federal data recovery Washington',
      'business data recovery DC',
      'secure data recovery Washington DC'
    ],
    nearbyAreas: [
      'Georgetown',
      'Capitol Hill',
      'Dupont Circle',
      'Adams Morgan',
      'Foggy Bottom',
      'Navy Yard',
      'Shaw',
      'U Street'
    ]
  },
  {
    slug: 'alexandria-va',
    city: 'Alexandria',
    state: 'Virginia',
    fullName: 'Alexandria, VA',
    phone: '(410) 937-7332',
    address: 'Serving Alexandria Metro Area',
    zipCode: '22301',
    coordinates: { lat: 38.8048, lng: -77.0469 },
    metaDescription: "Explore Alexandria, VA with its historic Old Town and vibrant Torpedo Factory Art Center, offering unique sights by the Potomac River.",
    heroDescription: "Discover the charm of Alexandria, VA, where the historic streets of Old Town meet the scenic beauty of the Potomac River, offering endless exploration. From the majestic George Washington Masonic National Memorial to the vibrant Torpedo Factory Art Center, adventure awaits at every corner.",
    localKeywords: [
      'data recovery Alexandria VA',
      'Northern Virginia data recovery',
      'hard drive recovery Alexandria Virginia',
      'RAID recovery Alexandria VA',
      'laptop data recovery Alexandria'
    ],
    nearbyAreas: [
      'Old Town Alexandria',
      'Del Ray',
      'Eisenhower Valley',
      'King Street',
      'Mount Vernon',
      'Belle Haven',
      'Potomac Yard',
      'Seminary Hill'
    ]
  },
  {
    slug: 'arlington-va',
    city: 'Arlington',
    state: 'Virginia',
    fullName: 'Arlington, VA',
    phone: '(410) 937-7332',
    address: 'Serving Arlington Metro Area',
    zipCode: '22201',
    coordinates: { lat: 38.8816, lng: -77.0910 },
    metaDescription: "Explore Arlington, VA, home to iconic sites such as Arlington National Cemetery and the modern Rosslyn skyline, offering diverse attractions for all.",
    heroDescription: "Discover the vibrant community of Arlington, VA, where historic landmarks like the Arlington National Cemetery and the futuristic Rosslyn skyline create a captivating blend of past and present. From scenic parks to lively shopping venues, Arlington offers a rich tapestry of experiences for every visitor.",
    localKeywords: [
      'data recovery Arlington VA',
      'Arlington Virginia data recovery',
      'business data recovery Arlington',
      'SSD recovery Arlington VA',
      'server recovery Arlington Virginia'
    ],
    nearbyAreas: [
      'Rosslyn',
      'Ballston',
      'Clarendon',
      'Court House',
      'Crystal City',
      'Pentagon City',
      'Shirlington',
      'Virginia Square'
    ]
  },
  {
    slug: 'rockville-md',
    city: 'Rockville',
    state: 'Maryland',
    fullName: 'Rockville, MD',
    phone: '(410) 937-7332',
    address: 'Serving Rockville Metro Area',
    zipCode: '20850',
    coordinates: { lat: 39.0840, lng: -77.1528 },
    metaDescription: "Explore Rockville, MD's thriving culture and scenic beauty at Rock Creek Regional Park, combining local charm with urban convenience for an unforgettable experience.",
    heroDescription: "Discover the vibrant community of Rockville, MD, nestled near the stunning Rock Creek Regional Park. Experience a blend of history and modernity in the heart of Montgomery County.",
    localKeywords: [
      'data recovery Rockville MD',
      'Montgomery County data recovery',
      'hard drive recovery Rockville Maryland',
      'RAID recovery Rockville MD',
      'business data recovery Rockville'
    ],
    nearbyAreas: [
      'North Bethesda',
      'Potomac',
      'Gaithersburg',
      'Derwood',
      'Twinbrook',
      'White Flint',
      'Montrose',
      'Garrett Park'
    ]
  },
  {
    slug: 'annapolis-md',
    city: 'Annapolis',
    state: 'Maryland',
    fullName: 'Annapolis, MD',
    phone: '(410) 937-7332',
    address: 'Serving Annapolis Metro Area',
    zipCode: '21401',
    coordinates: { lat: 39.1612, lng: -76.5197 },
    metaDescription: "Boost your Annapolis, MD presence with tailored SEO strategies. From State House to City Dock, engage more with optimized local content.",
    heroDescription: "Explore the charm of Annapolis from the iconic Chesapeake Bay to the historic Naval Academy grounds. Discover the vibrant harbor life in this picturesque capital city.",
    localKeywords: [
      'data recovery Annapolis MD',
      'Anne Arundel County data recovery',
      'Naval Academy data recovery Annapolis',
      'hard drive recovery Annapolis Maryland',
      'laptop data recovery Annapolis'
    ],
    nearbyAreas: [
      'Naval Academy',
      'Eastport',
      'West Annapolis',
      'Parole',
      'Arnold',
      'Severna Park',
      'Crownsville',
      'Davidsonville'
    ]
  },
  {
    slug: 'frederick-md',
    city: 'Frederick',
    state: 'Maryland',
    fullName: 'Frederick, MD',
    phone: '(410) 937-7332',
    address: 'Serving Frederick Metro Area',
    zipCode: '21701',
    coordinates: { lat: 39.4143, lng: -77.4105 },
    metaDescription: "Discover Frederick, MD's charm with its iconic Clustered Spires and scenic Carroll Creek Park, a haven for history enthusiasts and nature lovers alike.",
    heroDescription: "Explore Frederick, MD, where the historic Clustered Spires of the Monocacy River beckon alongside the vibrant charm of Carroll Creek Urban Park. Dive into the rich tapestry of culture and history in every corner of this lively city.",
    localKeywords: [
      'data recovery Frederick MD',
      'Frederick County data recovery',
      'hard drive recovery Frederick Maryland',
      'business data recovery Frederick MD',
      'RAID recovery Frederick'
    ],
    nearbyAreas: [
      'Urbana',
      'Ijamsville',
      'New Market',
      'Monrovia',
      'Buckeystown',
      'Ballenger Creek',
      'Spring Ridge',
      'Clover Hill'
    ]
  },
  {
    slug: 'mclean-va',
    city: 'McLean',
    state: 'Virginia',
    fullName: 'McLean, VA',
    phone: '(410) 937-7332',
    address: 'Serving McLean Metro Area',
    zipCode: '22101',
    coordinates: { lat: 38.9343, lng: -77.1775 },
    metaDescription: "Discover McLean, VA's vibrant lifestyle near Tysons Corner & Great Falls Park. Experience suburban charm with urban convenience and scenic beauty.",
    heroDescription: "Explore McLean, VA - a charming community nestled near the scenic Great Falls Park and the iconic Tysons Corner Center. Discover a blend of suburban tranquility and vibrant urban amenities.",
    localKeywords: [
      'data recovery McLean VA',
      'McLean Virginia data recovery',
      'business data recovery McLean',
      'SSD recovery McLean VA',
      'hard drive recovery McLean Virginia',
      'enterprise data recovery McLean'
    ],
    nearbyAreas: [
      'Tysons Corner',
      'Great Falls',
      'Vienna',
      'Falls Church',
      'Dunn Loring',
      'West McLean',
      'Langley',
      'Chevy Chase'
    ]
  },
  {
    slug: 'tysons-va',
    city: 'Tysons',
    state: 'Virginia',
    fullName: 'Tysons, VA',
    phone: '(410) 937-7332',
    address: 'Serving Tysons Metro Area',
    zipCode: '22102',
    coordinates: { lat: 38.9182, lng: -77.2228 },
    metaDescription: "Explore Tysons, VA's dynamic blend of shopping at Tysons Corner Center and nature at Scotts Run, offering a unique local experience in Virginia.",
    heroDescription: "Discover the vibrant energy of Tysons, VA, where the iconic Tysons Corner Center meets the lush tranquility of Scotts Run Nature Preserve. Explore the perfect balance of urban excitement and serene natural beauty.",
    localKeywords: [
      'data recovery Tysons VA',
      'Tysons Corner data recovery',
      'business data recovery Tysons',
      'RAID recovery Tysons VA',
      'enterprise data recovery Tysons',
      'hard drive recovery Tysons Virginia'
    ],
    nearbyAreas: [
      'Tysons Corner',
      'McLean',
      'Vienna',
      'Falls Church',
      'Dunn Loring',
      'West McLean',
      'Merrifield',
      'Oakton'
    ]
  },
  {
    slug: 'great-falls-va',
    city: 'Great Falls',
    state: 'Virginia',
    fullName: 'Great Falls, VA',
    phone: '(410) 937-7332',
    address: 'Serving Great Falls Metro Area',
    zipCode: '22066',
    coordinates: { lat: 39.0012, lng: -77.2883 },
    metaDescription: "Discover Great Falls, VA: enjoy scenic trails at Great Falls Park and delve into the past at Colvin Run Mill. Perfect for nature lovers and history buffs alike.",
    heroDescription: "Explore the serene beauty of Great Falls, VA, with its breathtaking views at Great Falls Park and the historic charm of Colvin Run Mill. Dive into a world where nature meets history and adventure awaits.",
    localKeywords: [
      'data recovery Great Falls VA',
      'Great Falls Virginia data recovery',
      'hard drive recovery Great Falls',
      'SSD recovery Great Falls VA',
      'business data recovery Great Falls',
      'laptop data recovery Great Falls'
    ],
    nearbyAreas: [
      'McLean',
      'Vienna',
      'Reston',
      'Herndon',
      'Sterling',
      'Potomac Falls',
      'Lansdowne',
      'Ashburn'
    ]
  },
  {
    slug: 'potomac-md',
    city: 'Potomac',
    state: 'Maryland',
    fullName: 'Potomac, MD',
    phone: '(410) 937-7332',
    address: 'Serving Potomac Metro Area',
    zipCode: '20854',
    coordinates: { lat: 39.0182, lng: -77.2086 },
    metaDescription: "Discover Potomac, MD, a vibrant community nestled by the Potomac River, with beautiful parks and local gems like the Great Falls Tavern. Explore today!",
    heroDescription: "Explore the charm of Potomac, MD, with its scenic views of the Potomac River and the historic Great Falls Tavern. Immerse yourself in the tranquility of the surrounding lush parks and trails.",
    localKeywords: [
      'data recovery Potomac MD',
      'Potomac Maryland data recovery',
      'hard drive recovery Potomac',
      'RAID recovery Potomac MD',
      'business data recovery Potomac',
      'SSD recovery Potomac Maryland'
    ],
    nearbyAreas: [
      'Bethesda',
      'Rockville',
      'Gaithersburg',
      'North Potomac',
      'Germantown',
      'Clarksburg',
      'Boyds',
      'Poolesville'
    ]
  }
];

export const getLocationBySlug = (slug: string) => {
  return locations.find(location => location.slug === slug);
};

export const getAllLocationSlugs = () => {
  return locations.map(location => location.slug);
};
