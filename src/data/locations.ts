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
    metaDescription: 'Professional data recovery services in Columbia, MD. 20+ years experience recovering data from hard drives, SSDs, RAID arrays, and mobile devices. Call (410) 937-7332',
    heroDescription: 'When you lose critical data in Columbia, Maryland, trust our expert team with 20+ years of experience to recover your valuable files from any storage device.',
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
    metaDescription: 'Expert data recovery services in Baltimore, MD. Recover lost data from crashed hard drives, corrupted SSDs, and damaged devices. Free evaluation. Call (410) 937-7332',
    heroDescription: 'Baltimore businesses and residents trust our certified data recovery specialists to restore critical files from failed storage devices with industry-leading success rates.',
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
    metaDescription: 'Professional data recovery services in Washington DC. Recover data from hard drives, SSDs, smartphones, and servers. Government & business specialists. Call (410) 937-7332',
    heroDescription: 'Washington DC organizations rely on our secure, certified data recovery services to restore mission-critical data from any storage device or system.',
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
    metaDescription: 'Trusted data recovery services in Alexandria, VA. Expert recovery from hard drives, RAIDs, and mobile devices. Serving Northern Virginia. Call (410) 937-7332',
    heroDescription: 'Alexandria residents and businesses count on our proven data recovery expertise to restore valuable data from failed drives and corrupted storage systems.',
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
    metaDescription: 'Professional data recovery services in Arlington, VA. Recover lost files from crashed drives, corrupted SSDs, and damaged devices. Free consultation. Call (410) 937-7332',
    heroDescription: 'Arlington professionals trust our advanced data recovery techniques to restore critical business and personal data from any type of storage failure.',
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
    metaDescription: 'Expert data recovery services in Rockville, MD. Recover data from hard drives, SSDs, RAID systems, and mobile devices. Montgomery County specialists. Call (410) 937-7332',
    heroDescription: 'Rockville area businesses and residents rely on our certified data recovery specialists to restore critical files from failed storage devices and systems.',
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
    metaDescription: 'Trusted data recovery services in Annapolis, MD. Professional recovery from hard drives, SSDs, and mobile devices. Anne Arundel County experts. Call (410) 937-7332',
    heroDescription: 'Annapolis area professionals trust our proven data recovery methods to restore valuable business and personal data from any type of storage failure.',
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
    metaDescription: 'Professional data recovery services in Frederick, MD. Recover lost data from crashed hard drives, corrupted SSDs, and damaged devices. Frederick County specialists. Call (410) 937-7332',
    heroDescription: 'Frederick County businesses and residents count on our advanced data recovery expertise to restore critical files from failed storage devices and systems.',
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
    metaDescription: 'Professional data recovery services in McLean, VA. Expert recovery from hard drives, SSDs, RAID systems, and mobile devices. Fairfax County specialists. Call (410) 937-7332',
    heroDescription: 'McLean area professionals trust our advanced data recovery expertise to restore critical business and personal data from any type of storage failure.',
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
    metaDescription: 'Expert data recovery services in Tysons, VA. Professional recovery from hard drives, SSDs, RAID arrays, and mobile devices. Fairfax County specialists. Call (410) 937-7332',
    heroDescription: 'Tysons businesses and residents rely on our certified data recovery specialists to restore critical files from failed storage devices and systems.',
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
    metaDescription: 'Trusted data recovery services in Great Falls, VA. Professional recovery from hard drives, SSDs, and mobile devices. Fairfax County experts. Call (410) 937-7332',
    heroDescription: 'Great Falls area professionals trust our proven data recovery methods to restore valuable business and personal data from any type of storage failure.',
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
    metaDescription: 'Professional data recovery services in Potomac, MD. Expert recovery from hard drives, SSDs, RAID systems, and mobile devices. Montgomery County specialists. Call (410) 937-7332',
    heroDescription: 'Potomac area businesses and residents count on our advanced data recovery expertise to restore critical files from failed storage devices and systems.',
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

export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locations.find(location => location.slug === slug);
};

export const getAllLocationSlugs = (): string[] => {
  return locations.map(location => location.slug);
};

export const getHeadOffice = (): LocationData => {
  return locations.find(location => location.isHeadOffice) || locations[0];
};
