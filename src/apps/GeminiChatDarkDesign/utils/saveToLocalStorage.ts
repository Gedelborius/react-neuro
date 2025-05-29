export const saveToLocalStorage = (key: string, valueToStore: any) => {
  try {
    const date = JSON.stringify(valueToStore);
    localStorage.setItem(key, date);
  } catch (error) {
    console.error(`Error saving to localStorage key ${key}: `, error);
  }
};
