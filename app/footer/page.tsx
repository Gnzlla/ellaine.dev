import React from "react";
import { alata } from "../fonts";

export default function Footerpage() {
  return (
    <footer className="bg-[var(--black-font)] pt-5 pb-6">
      <div className="flex justify-between mb-10">
        {/* First Column */}
        <div className="">
          <h1
            className={`text-[var(--white-background)] text-[10rem] ${alata.className} leading-27`}
          >
            just <br />
            <span className="text-[var(--yellow-font)]">send</span> it.
          </h1>
        </div>

        {/* Second Column */}
        <div>
          <div className="flex justify-between text-[var(--white-background)] text-base text-wrap">
            <div>
              <h4 className="">Full Name</h4>
              <input className="outline-none" />
            </div>
            <div>
              <h4 className="">Email Addess</h4>
              <input className="outline-none" />
            </div>
          </div>
          <div className="mt-3 text-[var(--white-background)]">
            <h4 className="text-wrap">Message</h4>
            <textarea
              className="bg-transparent border-b outline-none w-full resize-none"
              style={{ width: "100%", height: "80px" }}
            />
          </div>
          <button className="bg-[var(--yellow-font)] hover:bg-[var(--black-font)] mt-2 p-2 px-7 rounded-2xl w-130 hover:text-[var(--yellow-font)] text-base cursor-pointer">
            Submit
          </button>
        </div>

        <div className="flex flex-col justify-between gap-3 mt-3 h-50 text-[var(--white-background)] text-base text-right">
          <p>ellainegonzales003@gmail.com</p>
          <p>(+63) 906 386 4236</p>
          <p>
            Phase 1 Block 40 Lot 5-A
            <br />
            Santa Lucia, Magalang, Pampanga
          </p>
          {/* Contact Icons */}
          <div className="flex [&>div]:flex justify-end [&>div]:justify-center [&>div]:items-center gap-3 [&>div]:bg-[var(--white-background)] [&>div]:hover:bg-[#F2D492] [&>div]:rounded-full [&>div]:w-12.5 [&>div>img]:w-5 [&>div]:h-12.5 [&>div]:transition [&>div]:duration-400">
            <div>
              <a href="https://www.linkedin.com/in/ellaine-gonzales-50770234b/">
                <img src="./linkedin.svg" alt="linkedIn"></img>
              </a>
            </div>
            <div>
              <img src="./github.svg" alt="Github"></img>
            </div>
            <div>
              <a>
                <img src="./instagram.svg" alt="Instagram"></img>
              </a>
            </div>
          </div>
          <p className="mt-2 text-neutral-400 text-xs">
            Copyright © 2026 Ellaine Gonzales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
