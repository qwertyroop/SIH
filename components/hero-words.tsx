import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["VIRTUAL GARDEN", "VIRTUAL REALITY", "VIRTUAL PLANTS"];

  return (
    <div className="flex w-full  items-center justify-center ">
      <div className="text-[7rem] text-center font-bold text-black">
        
        <FlipWords words={words} /> <br />
        
      </div>
    </div>
  );
}
