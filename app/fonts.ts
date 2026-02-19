// app/fonts.ts
import { Alata, Teachers } from "next/font/google";

export const alata = Alata({
  weight: ["400"],     // specify weight(s) you want
  subsets: ["latin"],  // always include latin if you need basic characters
  display: "swap",     // recommended
});

export const teachers = Teachers({
  weight: ["400", "700"], // example weights
  subsets: ["latin"],
  display: "swap",
});
