"use client";

import React, { createContext, useContext, useState } from "react";
interface BioContextType {
  output: { data: { bio: string }[] };
  setOutput: React.Dispatch<React.SetStateAction<{ data: { bio: string }[] }>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const BioContext = createContext<BioContextType>({
  output: { data: [] },
  setOutput: () => {},
  loading: false,
  setLoading: () => {},
});

export const BioProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState<{ data: { bio: string }[] }>({
    data: [],
  });
  const [loading, setLoading] = useState(false);
  console.log("output values =", output);
  return (
    <BioContext.Provider value={{ output, setOutput, loading, setLoading }}>
      {children}
    </BioContext.Provider>
  );
};
