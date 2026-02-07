// Portfolio project configuration
export const PORTFOLIO_PROJECTS = {
  RUAH_AFRRAME: {
    id: 'ruah-afrrame',
    name: 'Ruah Afrrame',
    mediaPath: '/portfolio/ruah-afrrame/',
    coverImage: '/portfolio/ruah-afrrame/ruahAframe-cover.webp',
    images: [
      '/portfolio/ruah-afrrame/ruahAframe-cover.webp',
      '/portfolio/ruah-afrrame/dji_fly_20251003_144702_0131_1759524601834_photo.JPG.jpg',
      '/portfolio/ruah-afrrame/dji_fly_20251003_144714_0132_1759524601463_photo.JPG.jpg',
      '/portfolio/ruah-afrrame/dji_fly_20251003_144754_0134_1759524601078_photo.JPG.jpg',
      '/portfolio/ruah-afrrame/dji_fly_20251003_144914_0139_1759524599239_photo.JPG.jpg',
      '/portfolio/ruah-afrrame/IMG_0379.jpg.jpg',
      '/portfolio/ruah-afrrame/IMG_0546.jpg.jpg',
      '/portfolio/ruah-afrrame/IMG_0563.jpg.jpg',
      '/portfolio/ruah-afrrame/IMG_0574.jpg.jpg',
      '/portfolio/ruah-afrrame/IMG_0597.jpg.jpg',
      '/portfolio/ruah-afrrame/IMG_0605.jpg.jpg',
      '/portfolio/ruah-afrrame/tempImagejQbwVL.png.jpg',
    ],
  },
  MONTEAGLE: {
    id: 'monteagle',
    name: 'Monteagle',
    mediaPath: '/portfolio/monteagle/',
    coverImage: '/portfolio/monteagle/monteagle-cover.webp',
    images: [
      '/portfolio/monteagle/monteagle-cover.webp',
      '/portfolio/monteagle/TylerHagy_TH-EXT-03.jpg.webp.jpg',
      '/portfolio/monteagle/TylerHagy_TH-EXT-05.jpg.webp.jpg',
    ],
  },
  SANTE_FE_BUILD: {
    id: 'sante-fe-build',
    name: 'Sante Fe Build',
    mediaPath: '/portfolio/sante-fe-build/',
    coverImage: '/portfolio/sante-fe-build/santeFe-cover.webp',
    images: [
      '/portfolio/sante-fe-build/santeFe-cover.webp',
      '/portfolio/sante-fe-build/4-web-or-mls-2932+New+Hwy+7+-+004.webp',
      '/portfolio/sante-fe-build/12-web-or-mls-2932 New Hwy 7 - 004 (2).jpg.jpg',
      '/portfolio/sante-fe-build/21-web-or-mls-2932 New Hwy 7 - 013 (2).jpg.jpg',
      '/portfolio/sante-fe-build/38-web-or-mls-2932 New Hwy 7 - 030 (2).jpg.jpg',
      '/portfolio/sante-fe-build/50-web-or-mls-2932 New Hwy 7 - 042 (2).jpg.jpg',
      '/portfolio/sante-fe-build/54-web-or-mls-2932 New Hwy 7 - 046 (2).jpg.jpg',
      '/portfolio/sante-fe-build/81-web-or-mls-2932 New Hwy 7 - 073.jpg.jpg',
      '/portfolio/sante-fe-build/84-web-or-mls-2932 New Hwy 7 - 076.jpg.jpg',
      '/portfolio/sante-fe-build/88-web-or-mls-2932 New Hwy 7 - 080.jpg.jpg',
      '/portfolio/sante-fe-build/106-web-or-mls-2932 New Hwy 7 - 098.jpg.jpg',
      '/portfolio/sante-fe-build/124-web-or-mls-2932 New Hwy 7 - 025.jpg.jpg',
      '/portfolio/sante-fe-build/125-web-or-mls-2932 New Hwy 7 - 026.jpg.jpg',
    ],
  },
  SCARLETS_MOUNTAIN_ROAD: {
    id: 'scarlets-mountain-road',
    name: 'Scarlets Mountain Road',
    mediaPath: '/portfolio/scarlets-mountain-road/',
    coverImage: '/portfolio/scarlets-mountain-road/scarletsMtns-cover.webp',
    images: [
      '/portfolio/scarlets-mountain-road/scarletsMtns-cover.webp',
      '/portfolio/scarlets-mountain-road/3860399_1_2.webp',
      '/portfolio/scarlets-mountain-road/3860399_2.webp',
    ],
  },
  ALTAMONT_BUILD: {
    id: 'altamont-build',
    name: 'Altamont Build',
    mediaPath: '/portfolio/altamont-build/',
    coverImage: '/portfolio/altamont-build/altomont-cover.webp',
    images: [
      '/portfolio/altamont-build/altomont-cover.webp',
      '/portfolio/altamont-build/6-377 Valley View Dr - 006.jpg.jpg',
      '/portfolio/altamont-build/11-377 Valley View Dr - 011.jpg.jpg',
      '/portfolio/altamont-build/21-377 Valley View Dr - 021.jpg.jpg',
      '/portfolio/altamont-build/24-377 Valley View Dr - 024.jpg.jpg',
      '/portfolio/altamont-build/29-377 Valley View Dr - 029.jpg.jpg',
      '/portfolio/altamont-build/31-377 Valley View Dr - 031.jpg.jpg',
      '/portfolio/altamont-build/35-377 Valley View Dr - 035.jpg.jpg',
      '/portfolio/altamont-build/47-377 Valley View Dr - 047.jpg.jpg',
      '/portfolio/altamont-build/50-377 Valley View Dr - 050.jpg.jpg',
    ],
  },
  COLUMBIA_HISTORIC_RENOVATIONS: {
    id: 'columbia-historic-renovations',
    name: 'Columbia Historic Renovations',
    mediaPath: '/portfolio/columbia-historic-renovations/',
    coverImage: '/portfolio/columbia-historic-renovations/columbia-cover.webp',
  },
  OTHER_PROJECTS: {
    id: 'other-projects',
    name: 'Other Projects',
    mediaPath: '/portfolio/other-projects/',
  },
} as const;

// Shared assets paths
export const SHARED_PATHS = {
  LOGOS: '/shared/logos/',
  ICONS: '/shared/icons/',
} as const;

// Helper function to get project media URL
export const getProjectMedia = (projectId: string, filename: string) => {
  return `/portfolio/${projectId}/${filename}`;
};
