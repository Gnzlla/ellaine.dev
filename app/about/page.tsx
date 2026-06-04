"use client";
import React from "react";
import Image from "next/image";
import { alata } from "../fonts";

export default function AboutPage({ id }: { id?: string }) {
  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-20 w-full min-h-screen"
      id={id}
    >
      <div className="items-center gap-10 lg:gap-20 grid grid-cols-1 lg:grid-cols-[1fr_1fr] mx-auto max-w-7xl h-full">
        {/* Stack of photos */}
        <div className="flex justify-center items-center">
          <Image
            src="/myself.png"
            width={500}
            height={500}
            alt="about_me"
            className=""
          />
        </div>

        {/* Text block */}
        <div className="flex justify-center items-center">
          <div className="max-w-xl text-justify">
            <h3
              className={`${alata.className} leading-tight mb-6
                text-5xl sm:text-6xl lg:text-7xl `}
            >
              Hi! It's me! 👋
            </h3>

            <p className="mb-8 text-lg sm:text-xl lg:text-2xl leading-relaxed">
              I'm Ellaine Gonzales, a{" "}
              <span className="text-[#E1B145]">
                frontend developer and designer
              </span>{" "}
              who loves turning ideas into engaging digital experiences through
              clean code, creative design, and seamless interactions.
            </p>

            <div className="flex [&>a]:flex flex-wrap [&>a]:items-center gap-3 [&>a]:gap-3 [&>a]:bg-[var(--white-background)] [&>a]:hover:bg-[var(--black-font)] [&>a]:hover:shadow-2xl [&>a]:p-2.5 [&>a]:px-7 [&>a]:border [&>a]:rounded-xl [&>a>img]:w-5 [&>a]:hover:text-[var(--yellow-font)] [&>a]:text-[var(--black-font)] text-sm sm:text-base [&>a]:duration-300 [&>a]:ease-in [&>a]:cursor-pointer">
              <a
                href="/GonzalesEllaine_Resume.pdf"
                target="Resume"
                rel="Resume"
              >
                <img src="./resume.svg" alt="Resume" />
                Resume
              </a>
              <a href="https://github.com/Gnzlla">
                <img src="./yellow-github.svg" alt="GitHub" />
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
