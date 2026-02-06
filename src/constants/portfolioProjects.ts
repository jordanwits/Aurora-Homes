// Portfolio project configuration
export const PORTFOLIO_PROJECTS = {
  RUAH_AFRRAME: {
    id: 'ruah-afrrame',
    name: 'Ruah Afrrame',
    mediaPath: '/portfolio/ruah-afrrame/',
    coverImage: '/portfolio/ruah-afrrame/ruahAframe-cover.webp',
  },
  MONTEAGLE: {
    id: 'monteagle',
    name: 'Monteagle',
    mediaPath: '/portfolio/monteagle/',
    coverImage: '/portfolio/monteagle/monteagle-cover.webp',
  },
  SANTE_FE_BUILD: {
    id: 'sante-fe-build',
    name: 'Sante Fe Build',
    mediaPath: '/portfolio/sante-fe-build/',
    coverImage: '/portfolio/sante-fe-build/santeFe-cover.webp',
  },
  SCARLETS_MOUNTAIN_ROAD: {
    id: 'scarlets-mountain-road',
    name: 'Scarlets Mountain Road',
    mediaPath: '/portfolio/scarlets-mountain-road/',
    coverImage: '/portfolio/scarlets-mountain-road/scarletsMtns-cover.webp',
  },
  ALTAMONT_BUILD: {
    id: 'altamont-build',
    name: 'Altamont Build',
    mediaPath: '/portfolio/altamont-build/',
    coverImage: '/portfolio/altamont-build/altomont-cover.webp',
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
