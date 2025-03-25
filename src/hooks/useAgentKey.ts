import { useEffect, useState } from "react";

export const useAgentKey = () => {
  const [apiKey, setApiKey] = useState(() => {
    try {
      const savedData = localStorage.getItem("API_KEY");
      if (savedData) {
        const parsedData: string = JSON.parse(savedData);
        if (parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error load from localStorage key API_KEY:", error);
    }
    return "";
  });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(apiKey);
      localStorage.setItem("API_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key API_KEY:", error);
    }
  }, [apiKey]);

  const deleteKey = () => {
    localStorage.removeItem("API_KEY");
    setApiKey("");
  };

  return { apiKey, setApiKey, deleteKey };
};
