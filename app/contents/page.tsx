"use client";
import React, { useRef } from "react";
import { alata } from "../fonts";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase, ScrambleTextPlugin);

export default function TableOfContents() {
  const closeMenuRef = useRef<() => void>(() => {});

  useGSAP(() => {
    CustomEase.create("hop", "0.87,0,0.13,1");

    const scrambleElements = document.querySelectorAll(".scrambleText");
    const originalTexts = new Map<HTMLElement, string>();

    scrambleElements.forEach((element) => {
      originalTexts.set(element as HTMLElement, element.textContent || "");
    });

    const textContainers = document.querySelectorAll(".menu-col");
    let splitTextByContainer: any[] = [];

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll("a h1");
      let containerSplits: any[] = [];

      textElements.forEach((element) => {
        const split = SplitText.create(element as HTMLElement, {
          type: "lines",
          linesClass: "line",
        });

        containerSplits.push(split);
        gsap.set(split.lines, { y: "-100%" });
      });

      splitTextByContainer.push(containerSplits);
    });

    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const menuExitBtn = document.querySelector(".menu-exit-btn");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuOverlayContainer = document.querySelector(
      ".menu-overlay-content",
    );
    const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

    if (
      !menuToggleBtn ||
      !menuExitBtn ||
      !menuOverlay ||
      !menuOverlayContainer ||
      !hamburgerIcon
    ) {
      return;
    }

    let isMenuOpen = false;
    let isAnimating = false;

    // Define closeMenu and assign to ref
    const closeMenu = () => {
      if (!isMenuOpen || isAnimating) return;

      isAnimating = true;
      hamburgerIcon.classList.remove("active");

      const tl = gsap.timeline();

      tl.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      }).to(
        menuOverlayContainer,
        { yPercent: -50, duration: 1, ease: "hop" },
        "<",
      );

      tl.call(() => {
        splitTextByContainer.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap(
            (split: any) => split.lines || [],
          );
          gsap.set(copyLines, { y: "-110%" });
        });

        isAnimating = false;
        isMenuOpen = false;
      });
    };

    // Assign to ref so JSX can access it
    closeMenuRef.current = closeMenu;

    menuToggleBtn.addEventListener("click", () => {
      if (isAnimating) return;

      if (!isMenuOpen) {
        isAnimating = true;
        const tl = gsap.timeline();

        tl.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "hop",
        }).to(
          menuOverlayContainer,
          { yPercent: 0, duration: 1, ease: "hop" },
          "<",
        );

        splitTextByContainer.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap(
            (split: any) => split.lines || [],
          );

          tl.to(
            copyLines,
            {
              y: "0%",
              duration: 0.8,
              ease: "hop",
              stagger: 0.5,
            },
            "-=0.5",
          );
        });

        hamburgerIcon.classList.add("active");

        tl.call(() => {
          isAnimating = false;
        });

        isMenuOpen = true;
      } else {
        closeMenu();
      }
    });

    menuExitBtn.addEventListener("click", closeMenu);

    menuOverlay.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Scramble text hover effect
    scrambleElements.forEach((heading) => {
      const originalText = originalTexts.get(heading as HTMLElement) || "";
      const tl = gsap.timeline({ paused: true });

      tl.to(heading, {
        duration: 1.2,
        scrambleText: {
          text: originalText,
          revealDelay: 0.2,
          chars: "upperAndLowerCase",
        },
      });

      (heading as any)._tl = tl;
      (heading as any)._originalText = originalText;
    });
  }, []);

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as any)?._tl?.restart();
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const originalText = (e.currentTarget as any)._originalText;
    if (originalText) {
      gsap.set(e.currentTarget, { textContent: originalText });
    }
  };

  const handleNavClick = (sectionId: string) => {
    closeMenuRef.current();
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  return (
    <>
      {/* Menu Overlay */}
      <div
        className="top-0 left-0 z-199 fixed bg-[var(--white-background)] w-screen h-screen overflow-hidden pointer-events-none will-change-[clip-path] menu-overlay"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="top-0 left-0 fixed flex w-screen h-screen overflow-hidden -translate-y-1/2 pointer-events-auto will-change-transform menu-overlay-content">
          {/* Exit Button */}
          <div className="top-2 right-10 z-10 absolute hover:shadow-2xl p-2 border border-transparent rounded-xl duration-300 ease-in cursor-pointer menu-exit-btn">
            <div className="relative flex flex-col justify-center items-center w-8 h-8">
              <span className="absolute bg-neutral-800 w-4 h-[1.5px] rotate-45"></span>
              <span className="absolute bg-neutral-800 w-4 h-[1.5px] -rotate-45"></span>
            </div>
          </div>

          <div className="relative flex justify-center items-center w-full menu-content-wrapper">
            <div className="px-8 w-3/4 max-lg:w-full menu-content-main">
              <div className="flex justify-center">CONTENTS</div>
              <div className="gap-8 grid grid-rows-4">
                <div className="menu-col">
                  <h3 className="mb-2 text-neutral-400 text-sm">
                    KNOW MORE ABOUT ME!
                  </h3>
                  <a
                    href="#about"
                    className="block overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("about");
                    }}
                  >
                    <h1
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      className={`${alata.className} text-[55px] max-lg:text-5xl text-neutral-800 font-medium leading-[1.2] scrambleText`}
                    >
                      About Me
                    </h1>
                  </a>
                  <hr className="mt-4 border border-neutral-400" />
                </div>

                <div className="menu-col">
                  <h3 className="mb-2 text-neutral-400 text-sm">WHAT I DID</h3>
                  <a
                    href="#projects"
                    className="block overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("projects");
                    }}
                  >
                    <h1
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      className={`${alata.className} text-[55px] max-lg:text-5xl text-neutral-800 font-medium leading-[1.2] scrambleText`}
                    >
                      Projects
                    </h1>
                  </a>
                  <hr className="mt-4 border border-neutral-400" />
                </div>

                <div className="menu-col">
                  <h3 className="mb-2 text-neutral-400 text-sm">
                    WHAT CAN I DO?
                  </h3>
                  <a
                    href="#techstack"
                    className="block overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("techstack");
                    }}
                  >
                    <h1
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      className={`${alata.className} text-[55px] max-lg:text-5xl text-neutral-800 font-medium leading-[1.2] scrambleText`}
                    >
                      Tech Stack
                    </h1>
                  </a>
                  <hr className="mt-4 border border-neutral-400" />
                </div>

                <div className="menu-col">
                  <h3 className="mb-2 text-neutral-400 text-sm">
                    LET'S COLLABORATE!
                  </h3>
                  <a
                    href="#footer"
                    className="block overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("footer");
                    }}
                  >
                    <h1
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      className={`${alata.className} text-[55px] max-lg:text-5xl text-neutral-800 font-medium leading-[1.2] scrambleText`}
                    >
                      Contact
                    </h1>
                  </a>
                  <hr className="mt-4 border border-neutral-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .line {
          position: relative;
          will-change: transform;
          overflow: hidden;
        }

        .menu-hamburger-icon.active span:nth-child(1) {
          transform: translateY(0) rotate(45deg) scaleX(1.05) !important;
        }

        .menu-hamburger-icon.active span:nth-child(2) {
          transform: translateY(0) rotate(-45deg) scaleX(1.05) !important;
        }

        .menu-overlay.active {
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}
