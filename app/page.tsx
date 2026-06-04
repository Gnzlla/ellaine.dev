"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Page Components
import Headroom from "@/components/Headroom";
import Loading from "./loading";
import LandingPage from "./landing/page";
import TableOfContents from "./contents/page";
import AboutPage from "./about/page";
import ProjectsPage from "./projects/page";
import Footerpage from "./footer/page";
// import TechStack from "./tech/page";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-[var(--white-background)] overflow-hidden">
      <div className="h-14 sm:h-16" aria-hidden="true" />
      <Headroom>
        <div className="bg-[var(--white-background)]/10 backdrop-blur-sm rounded-b-2xl w-full">
          <nav
            className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-14 sm:h-16"
            aria-label="Main navigation"
          >
            <a
              href="#"
              className="group flex items-center gap-2 cursor-pointer"
              aria-label="Laine — back to top"
            >
              <Image
                src="/notion.png"
                alt="Laine logo"
                width={40}
                height={40}
                className="group-hover:drop-shadow-[0_0_2px_#000] object-contain group-hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <span className="pt-0.5 font-teachers font-medium text-base sm:text-lg leading-none">
                Laine
              </span>
            </a>

            <button
              className="flex items-center gap-3 hover:shadow-2xl p-2 sm:p-2.5 border border-transparent rounded-xl duration-300 ease-in cursor-pointer menu-toggle-btn"
              aria-label="Open navigation menu"
              aria-expanded="false"
            >
              <div className="relative flex flex-col justify-center items-center w-8 h-8 menu-hamburger-icon">
                <span className="absolute bg-neutral-800 w-[18px] h-[1.25px] origin-center transition-all -translate-y-[4px] duration-[750ms] will-change-transform" />
                <span className="absolute bg-neutral-800 w-[18px] h-[1.25px] origin-center transition-all translate-y-[4px] duration-[750ms] will-change-transform" />
              </div>
            </button>
          </nav>
        </div>
      </Headroom>

      <LandingPage />
      <TableOfContents />
      <AboutPage id="about" />
      <ProjectsPage id="projects" />
      {/* <TechStack id="tech" /> */}
      <Footerpage id="footer" />
    </div>
  );
}
