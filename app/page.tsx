"use client";
import React from "react";
import { useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

//Page Components
import Headroom from "@/components/Headroom";
import Loading from "./loading";
import LandingPage from "./landing/page";
import TableOfContents from "./contents/page";
import AboutPage from "./about/page";
import ProjectsPage from "./projects/page";
import Footerpage from "./footer/page";
import TechStack from "./tech/page";

export default function App() {
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    // simulate fetching data
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="bg-[var(--white-background)]">
      <Headroom>
        <div className="bg-[var(--white-background)]/10 backdrop-blur-xs rounded-b-2xl w-full">
          <nav className="flex justify-between items-center px-6 h-15">
            <div className="group relative flex items-center cursor-pointer">
              <Image
                src="/notion.png"
                alt=""
                width={50}
                height={15}
                className="group-hover:filter-[drop-shadow(0_0_2px_#000)] object-contain group-hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <h1 className="pt-1 font-teachers font-medium text-lg">Laine</h1>
            </div>

            {/* Menu Toggle Button */}
            <div className="flex items-center gap-3 hover:shadow-2xl p-2 border border-transparent rounded-xl duration-300 ease-in cursor-pointer menu-toggle-btn">
              <div className="relative flex flex-col justify-center items-center w-8 h-8 menu-hamburger-icon">
                <span className="absolute bg-neutral-800 w-[15px] h-[1.25px] origin-center transition-all -translate-y-[3px] duration-[750ms] will-change-transform"></span>
                <span className="absolute bg-neutral-800 w-[15px] h-[1.25px] origin-center transition-all translate-y-[3px] duration-[750ms] will-change-transform"></span>
              </div>
            </div>
          </nav>
        </div>
      </Headroom>

      <LandingPage />
      <TableOfContents />
      <AboutPage id="about" />
      <ProjectsPage id="projects" />
      <TechStack id="tech" />
      <Footerpage id="footer" />
    </section>
  );
}
