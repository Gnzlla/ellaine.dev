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
          <div className="flex gap-5 w-auto text-[var(--white-background)] text-base text-wrap">
            <div>
              <h4 className="">Full Name</h4>
              <input />
            </div>
            <div>
              <h4 className="">Email Addess</h4>
              <input />
            </div>
          </div>
          <div className="mt-3 text-[var(--white-background)]">
            <h4 className="text-wrap" typeof="message">
              Message
            </h4>
            <textarea className="border-b w-130 h-20" />
          </div>
          <button className="bg-[var(--yellow-font)] mt-2 p-2 px-7 rounded-2xl w-130 tex-base">
            Submit
          </button>
        </div>

        <div className="flex flex-col justify-between gap-3 mt-5 h-50 text-[var(--white-background)] text-base text-right">
          <p>ellainegonzales003@gmail.com</p>
          <p>(+63) 906 386 4236</p>
          <p>
            Phase 1 Block 40 Lot 5-A
            <br />
            Santa Lucia, Magalang, Pampanga
          </p>
          {/* Contact Icons */}
          <div className="flex [&>div]:flex justify-end [&>div]:justify-center [&>div]:items-center gap-3 [&>div]:bg-[var(--white-background)] [&>div]:rounded-full [&>div]:w-12.5 [&>div>img]:w-5 [&>div]:h-12.5">
            <div>
              <img src="./linkedin.svg" alt="linkedIn"></img>
            </div>
            <div>
              <img src="./github.svg" alt="Github"></img>
            </div>
            <div>
              <img src="./instagram.svg" alt="Instagram"></img>
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
