import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["VIRTUAL GARDEN", "VIRTUAL REALITY", "VIRTUAL PLANTS"];

  return (
    <div className="flex  items-center justify-center px-4">
      <div className="text-[7rem] text-center font-bold text-black">
        
        <FlipWords words={words} /> <br />
        
      </div>
    </div>
  );
}
