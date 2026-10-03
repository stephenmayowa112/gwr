/**
 * Prisma database seed script for Favour Ugegbe's 48-Hour French Marathon
 */

export const INITIAL_FAQS = [
  {
    category: "Venue & Access",
    question: "Where is the event taking place?",
    answer: "Landmark Centre, Plot 2 & 3, Water Corporation Drive, Victoria Island, Lagos, Nigeria. The venue is fully air-conditioned, secured, and equipped with ample parking and accessibility ramps.",
    order: 1
  },
  {
    category: "Venue & Access",
    question: "Do I need to pay to enter?",
    answer: "No. Entry is 100% FREE. You only need to register your free pass in advance so we can manage hall capacity and security protocols.",
    order: 2
  },
  {
    category: "Attendance",
    question: "Can I come and go during the 48 hours?",
    answer: "Yes, absolutely! You can come for ten minutes or stay for ten hours. The hall will remain open and active around the clock with rotating audiences, interactive exercises, and live cheering.",
    order: 3
  },
  {
    category: "Attendance",
    question: "Do I have to speak French to attend?",
    answer: "You do not have to speak French. You just have to show up. You will learn useful phrases, cheer Favour on, meet incredible people, and watch history unfold.",
    order: 4
  },
  {
    category: "Attendance",
    question: "Are children and cameras welcome?",
    answer: "Yes! Families with children are warmly welcomed. Photography and video for personal social media are strongly encouraged using the official hashtags #UgegbeGWR #FavourUgegbe #FrenchLanguageMarathon.",
    order: 5
  },
  {
    category: "Record & Rules",
    question: "How is the Guinness World Records attempt verified?",
    answer: "The attempt follows official GWR guidelines: continuous multi-angle video recording, two independent timekeepers, two independent specialist witnesses on rotating shifts, an official lesson logbook, and strictly regulated 5-minute rest breaks per completed hour.",
    order: 6
  }
];

export const INITIAL_PHRASES = [
  {
    french: "Ensemble, nous écrivons l'histoire.",
    english: "Together, we are writing history.",
    phonetic: "ahn-SAHM-bluh, noo z-ay-kree-VOHN lees-TWAHR",
    context: "The official spirit and motto of the 48-hour marathon.",
    dateStr: "2026-10-30"
  },
  {
    french: "La langue est un pont, pas une barrière.",
    english: "Language is a bridge, not a barrier.",
    phonetic: "lah LAHNG ay tuhn POHN, pah z-oon bah-RYEHR",
    context: "Celebrating Nigeria's connection with Francophone neighbors.",
    dateStr: "2026-10-31"
  },
  {
    french: "Le courage commence par un premier mot.",
    english: "Courage begins with a first word.",
    phonetic: "luh koo-RAHZH koh-MAHNS pahr uhn pruh-mee-AY MOH",
    context: "Inspiring every young Nigerian to embrace multilingualism.",
    dateStr: "2026-11-01"
  }
];

export const INITIAL_CONFIG = {
  id: "singleton",
  status: "UPCOMING",
  officialStartTime: "2026-10-30T18:00:00+01:00",
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  hourOverride: null,
  venueCapacity: 2500,
  waitlistActive: false,
  resultOutcome: "Guinness World Record Achieved: 48 Hours Completed!"
};

export const INITIAL_ADMIN = {
  email: "admin@ugegbegwr.com",
  passwordHash: "marathon2026",
  name: "Marathon Operations Team",
  role: "ADMIN"
};
