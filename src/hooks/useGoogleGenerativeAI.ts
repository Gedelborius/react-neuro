import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMemo } from "react";

export const useGoogleGenerativeAI = (apiKey: string) => {
  const googleGenerativeAI = useMemo(() => {
    return new GoogleGenerativeAI(apiKey);
  }, [apiKey]);
  return { googleGenerativeAI };
};
