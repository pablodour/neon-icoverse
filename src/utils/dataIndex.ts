
export * from './types';
export * from './artistsData';
export * from './eventsData';
export * from './universeData';

// Consolidated artist finder function
export const findArtistById = (id: string): any | undefined => {
  // First check in the standalone artists array
  const artist = findArtistById(id);
  if (artist) return artist;
  
  // If not found, check in the universe structure
  return findArtistByIdInUniverse(id);
};
