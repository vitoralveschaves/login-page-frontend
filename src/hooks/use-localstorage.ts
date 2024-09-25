import { useState } from "react";

export const useLocalstorage = (
  key: string
): [storeValue: string | null, setValue: (newValue: string | null) => void] => {
  const [storeValue, setStoreValue] = useState<string | null>(() => {
    try {
      const currentValue = localStorage.getItem(key);
      if (currentValue) return JSON.parse(currentValue);
      localStorage.setItem(key, JSON.stringify(null));
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const setValue = (newValue: string | null) => {
    setStoreValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storeValue, setValue];
};
