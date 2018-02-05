export const extractLastLetter = (city: string): string => {
  const lastLetter = city.slice(-1).toLowerCase();
  if (lastLetter === 'ь' || lastLetter === 'й' || lastLetter === 'ъ' || lastLetter === 'ы') {
    return extractLastLetter(city.slice(0, city.length - 1));
  }
  return lastLetter;
};

declare const google: any;

export const initializeGoogleMapsService = (rootId: string) => {
  return new google.maps.places.PlacesService(document.getElementById(rootId));
};
