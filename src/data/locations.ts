export interface LocationData {
  slug: string;
  city: string;
  state: string;
  fullName: string;
  phone: string;
  // Office line shown as the location's own number. `phone` stays the 24/7 line used by every emergency label.
  officePhone?: string;
  address: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isHeadOffice?: boolean;
  isAppointmentOnly?: boolean;
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
    metaDescription: "Columbia MD data recovery lab at 10015 Old Columbia Rd. Hard drive, SSD, RAID and server recovery. Free evaluation. No data, no charge. Call (410) 937-7332.",
    heroDescription: "The Columbia lab is the working cleanroom for Maryland, DC, and Northern Virginia jobs. Drop off a failed disk, RAID member, or phone here. We image first, quote before paid work, and return files on new media.",
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
    metaDescription: "Baltimore data recovery via DiskDoctor’s Columbia MD lab. Hard drive, SSD, RAID and server recovery. Free evaluation. No data, no charge. Call (410) 937-7332.",
    heroDescription: "Baltimore-area recovery is handled at the Columbia laboratory, not a Harbor-front kiosk. Ship or drop the failed device. We image first and quote before paid work.",
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
    metaDescription: "Washington DC data recovery for government, legal, and business media at DiskDoctor’s Columbia MD lab. Free evaluation. Call (410) 937-7332.",
    heroDescription: "DC-area hard drive, SSD and RAID recovery through the Columbia laboratory. Built for legal, contractor, and office failures — not a tourist-page about monuments.",
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
    metaDescription: "Alexandria VA data recovery via DiskDoctor’s Columbia MD lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Northern Virginia recovery for Alexandria devices at the Columbia laboratory. Stop using a clicking drive. Do not rebuild a NAS.",
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
    metaDescription: "Arlington VA data recovery at DiskDoctor’s Columbia MD lab. RAID, SSD, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Arlington-area hard drive, SSD and RAID recovery through Columbia. Contractor and office media welcome with chain-of-custody on request.",
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
    metaDescription: "Rockville and Montgomery County data recovery at DiskDoctor’s Columbia lab. Hard drive, RAID, SSD, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Montgomery County recovery through the Columbia laboratory. Built for biotech, professional offices, and home NAS failures — not a park-guide page.",
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
    metaDescription: "Annapolis data recovery at DiskDoctor’s Columbia MD lab — not SEO services. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Anne Arundel recovery through the Columbia laboratory. Hard drives, SSDs and RAID — not “SEO strategies.”",
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
    metaDescription: "Frederick MD data recovery via DiskDoctor’s Columbia lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Frederick-area recovery at the Columbia laboratory. Stop using a clicking disk. Do not rebuild a NAS.",
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
    metaDescription: "McLean VA data recovery via our Tysons office (by appointment) and Columbia MD lab. Free evaluation. Call (410) 937-7332.",
    heroDescription: "McLean and Langley clients can meet us at the Tysons office by appointment or go straight to the Columbia lab. Recovery is laboratory work, not a mall kiosk.",
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
    officePhone: '(571) 202-8529',
    address: '8300 Boone Blvd Suite 513, Tysons, VA 22182',
    zipCode: '22182',
    coordinates: { lat: 38.9182, lng: -77.2228 },
    isAppointmentOnly: true,
    metaDescription: "Tysons VA data recovery office at 8300 Boone Blvd Suite 513, by appointment. Hard drive, SSD, RAID and server recovery. Free evaluation. Call (571) 202-8529.",
    heroDescription: "Our Northern Virginia office in Tysons, by appointment. Call ahead so someone is here to meet you.",
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
    metaDescription: "Great Falls VA data recovery at DiskDoctor’s Columbia lab, with a Tysons office by appointment. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Great Falls and Reston-area recovery through Columbia, with our Tysons office by appointment. Not a park brochure.",
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
    metaDescription: "Potomac MD data recovery via DiskDoctor’s Columbia lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.",
    heroDescription: "Potomac-area hard drive and RAID recovery at the Columbia laboratory. Stop using a failing disk.",
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
