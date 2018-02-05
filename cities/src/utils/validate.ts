const regEx = new RegExp(`^[а-яёА-ЯЁ\s\'\-]+$`);

export const validateCityName = (city: string): boolean => {
  if (!city) {
    return false;
  }

  if (!regEx.test(city)) {
    return false;
  }

  return true;
};
