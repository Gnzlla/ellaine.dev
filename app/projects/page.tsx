"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { alata } from "../fonts";
import { Paperclip, ArrowUpRight } from "lucide-react";
import { projects } from "./projectData";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage({ id }: { id?: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !trackRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    const totalScroll = trackRef.current.scrollWidth - window.innerWidth + 120;

    const hTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        scrub: 1.2,
        start: "top top",
        end: `+=${totalScroll + 450}`,
        id: "horizontal",
      },
    });

    // Move the whole track left
    hTl.to(trackRef.current, {
      x: -totalScroll,
      ease: "none",
    });

    gsap.from(".heading-text", {
      y: -80,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".underline-bar", {
      width: "100%",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".underline-bar",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, autoAlpha: 0, rotateZ: 4 - i * 0.8 },
        {
          y: 0,
          autoAlpha: 1,
          rotateZ: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: hTl,
            start: "left 90%",
            end: "left 50%",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        card.querySelector(".card-num"),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: hTl,
            start: "left 80%",
            end: "left 60%",
            scrub: 0.6,
          },
        },
      );

      const tags = card.querySelectorAll(".tag-pill");
      gsap.fromTo(
        tags,
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: hTl,
            start: "left 75%",
            end: "left 45%",
            scrub: 0.5,
          },
        },
      );
    });
  });

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div
        ref={trackRef}
        className="flex items-center h-screen"
        style={{
          width: "max-content",
          paddingLeft: "6vw",
          paddingRight: "6vw",
        }}
        id={id}
      >
        <div
          className="relative flex flex-col justify-end shrink-0"
          style={{ width: "42vw", height: "60vh" }}
        >
          <div className="top-10 left-0 absolute heading-text">
            <div className="relative flex items-center gap-2 text-neutral-500 text-sm uppercase tracking-widest">
              <Paperclip color="#F2D492" width={18} height={18} />
              <span className="relative">
                Things I've been working on
                <span
                  className="block -bottom-1 left-0 absolute bg-neutral-400 underline-bar"
                  style={{ width: 0, height: "1px" }}
                />
              </span>
            </div>
          </div>

          {/* Giant "projects" title — split letters */}
          <div
            className={`project-title-wrap ${alata.className} leading-45 text-[200px] select-none pointer-events-none`}
          >
            <span className="flex items-end gap-15">
              PROJ <Image src="/star.gif" alt="" width={160} height={100} />
              <br />
            </span>
            <span className="p-50 text-[var(--yellow-font)]">ECTS</span>
          </div>
        </div>

        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}

        <div className="shrink-0" style={{ width: "8vw" }} />
      </div>

      <div
        className="right-10 bottom-8 absolute flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest heading-text"
        style={{ opacity: 0.6 }}
      >
        <span>Scroll to explore</span>
        <span
          style={{
            display: "inline-block",
            animation: "nudge 1.4s ease-in-out infinite",
          }}
        >
          →
        </span>
      </div>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project: p,
  index: i,
}: {
  project: Project;
  index: number;
}) {
  const isDark = p.color === "#1A1A1A" || p.color === "#0D0D0D";
  const textColor = isDark ? "#F5F0E8" : "#1A1A1A";
  const subColor = isDark ? "rgba(245,240,232,0.45)" : "rgba(26,26,26,0.45)";

  const verticalOffset = i % 2 === 0 ? "3vh" : "-3vh";

  return (
    <div
      className="group relative cursor-pointer project-card shrink-0"
      style={{
        width: "clamp(280px, 26vw, 380px)",
        height: "clamp(340px, 52vh, 520px)",
        marginLeft: i === 0 ? "5vw" : "2.5vw",
        marginTop: verticalOffset,
        borderRadius: "4px",
        background: p.color,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: p.accent,
          opacity: 0.85,
        }}
      />

      {/* Card number */}
      <span
        className="card-num"
        style={{
          position: "absolute",
          top: 22,
          right: 20,
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: subColor,
        }}
      >
        {p.id} / {String(projects.length).padStart(2, "0")}
      </span>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "28px 28px 26px 34px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Category */}
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: subColor,
            marginBottom: "10px",
          }}
        >
          {p.category}
        </p>

        {/* Title */}
        <h4
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: textColor,
            marginBottom: "14px",
          }}
        >
          {p.title}
        </h4>

        {/* Divider */}
        <div
          style={{
            width: "32px",
            height: "1.5px",
            background: p.accent,
            marginBottom: "14px",
            transition: "width 0.3s ease",
          }}
          className="card-divider"
        />

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.65,
            color: subColor,
            marginBottom: "20px",
            maxWidth: "260px",
          }}
        >
          {p.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              className="tag-pill"
              style={{
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "2px",
                border: `1px solid ${p.accent}55`,
                color: isDark ? p.accent : p.accent,
                background: `${p.accent}15`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: p.accent,
            transition: "gap 0.2s ease",
          }}
          className="group-hover:gap-3"
        >
          <span>View project</span>
          <ArrowUpRight size={13} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `${p.accent}08`,
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
        className="group-hover:opacity-100"
      />
    </div>
  );
}
