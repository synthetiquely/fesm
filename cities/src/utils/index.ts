import { Choice, PreviousSessions, GooglePrediction } from '../interfaces';

declare const google: any;

export const initializeGoogleMapsPlacesService = (rootId: string) => {
  return new google.maps.places.PlacesService(document.getElementById(rootId));
};

export const initializeGoogleMapsAutocompleteService = () => {
  return new google.maps.places.AutocompleteService();
};

export const extractLastLetter = (city: string): string => {
  const lastLetter = city.slice(-1).toLowerCase();
  if (
    lastLetter === 'ь' ||
    lastLetter === 'й' ||
    lastLetter === 'ъ' ||
    lastLetter === 'ы'
  ) {
    return extractLastLetter(city.slice(0, city.length - 1));
  }
  return lastLetter;
};

export const getOptionsForGoogleMapService = (
  query: string,
  options?: any,
): object => {
  return {
    query,
    ...options,
  };
};

export const getRandomCityFromArray = (
  cityArr: GooglePrediction[],
  prevChoices: Choice[],
): string => {
  const randomIndex = Math.floor(Math.random() * cityArr.length);
  const selectedCity = cityArr[randomIndex].structured_formatting.main_text;
  const isCityAlreadyChosed = !!prevChoices.find(
    (choice: Choice) =>
      choice.city.toLowerCase() === selectedCity.toLowerCase(),
  );
  if (isCityAlreadyChosed) {
    return getRandomCityFromArray(cityArr, prevChoices);
  }
  return selectedCity;
};
