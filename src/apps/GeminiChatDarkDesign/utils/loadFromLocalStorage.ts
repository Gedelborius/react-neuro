export const loadFromLocalStorage = (key: string) => {
  let loadedData = null;
  try {
    const data = localStorage.getItem(key);
    if (data) {
      const parsedData = JSON.parse(data);
      loadedData = parsedData;
    }
  } catch (error) {
    console.error(`Error load from localStorage key ${key}:`, error);
  }
  return loadedData;
};
