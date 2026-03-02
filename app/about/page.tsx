import React from "react";
import StackImages from "./stackImages";
import StickerPeel from "@/components/StickerPeel";

import { alata } from "../fonts";

export default function AboutPage() {
  return (
    <>
      <section className="mt-45 w-full h-screen">
        <div className="gap-15 grid grid-cols-[40%_1fr] mx-15 p-2 h-full">
          <StickerPeel
            imageSrc="./wow.gif"
            width={220}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: 480, y: 60 }}
            peelDirection={0}
            className=""
          />
          <StickerPeel
            imageSrc="./flower.gif"
            width={130}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: 200, y: 500 }}
            peelDirection={0}
          />

          <div className="flex justify-center items-center h-7/11">
            <StackImages />
          </div>
          <div className="flex justify-center items-center">
            <div className="p-15 text-justify">
              <h3 className={`${alata.className} text-7xl mb-10`}>
                It’s Me! Hi!
              </h3>
              <p className="mb-6 pr-20 text-2xl">
                I’m Ellaine Gonzales, a{" "}
                <span className="text-[var(--yellow-font)]">
                  web developer & designer
                </span>
                ! I specialize in Frontend Development, focusing on building
                high quality web experiences through clean code and thoughtful
                design.{" "}
              </p>
              <div className="flex [&>a]:flex gap-2 [&>a]:gap-3 [&>a]:bg-[var(--white-background)] [&>a]:hover:bg-[var(--black-font)] [&>a]:hover:shadow-2xl [&>a]:p-2.5 [&>a]:px-7 [&>a]:border [&>a]:rounded-xl [&>a>img]:w-5 [&>a]:hover:text-[var(--yellow-font)] [&>a]:text-[var(--black-font)] [&>a]:duration-300 [&>a]:ease-in [&>a]:cursor-pointer">
                <a href="#">
                  <img src="./resume.svg" />
                  Resume
                </a>
                <a href="https://github.com/Gnzlla">
                  <img src="./yellow-github.svg" />
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
