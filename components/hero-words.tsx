import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["VIRTUAL GARDEN", "VIRTUAL REALITY", "VIRTUAL PLANTS"];

  return (
    <div className="flex w-full  items-center justify-center ">
      <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[7rem] text-center font-bold text-black mt-5">
        
        <FlipWords words={words} /> <br />
        
      </div>
    </div>
  );
}
