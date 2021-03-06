import {
  Choice,
  PreviousSessions,
  GooglePrediction,
  YGeoObjectCollection,
} from '../interfaces';

declare const google: any;

export const initializeGoogleMapsPlacesService = (rootId: string) => {
  return new google.maps.places.PlacesService(document.getElementById(rootId));
};

export const initializeGoogleMapsAutocompleteService = () => {
  return new google.maps.places.AutocompleteService();
};

export const extractGeocode = (geoObjectCollection: YGeoObjectCollection) => {
  return geoObjectCollection.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
    .split(' ')
    .reverse();
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
  step: number,
): string => {
  let counter = step;
  const randomIndex = Math.floor(Math.random() * (cityArr.length - 1));
  const selectedCity = cityArr[randomIndex].structured_formatting.main_text;
  const isCityAlreadyChosed = !!prevChoices.find(
    (choice: Choice) =>
      choice.city.toLowerCase() === selectedCity.toLowerCase(),
  );
  if (isCityAlreadyChosed) {
    counter += 1;
    if (counter >= 1000) {
      throw new Error(
        'У компьютера закончились варианты, похоже, что вы победили.',
      );
    } else {
      return getRandomCityFromArray(cityArr, prevChoices, counter);
    }
  }
  return selectedCity;
};
