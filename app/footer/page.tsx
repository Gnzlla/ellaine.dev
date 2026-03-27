"use client";
import React, { Suspense, useRef } from "react";
import { alata } from "../fonts";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircleMore, PhoneCall } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ContactSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Please input email"),
  message: z.string().min(1, "Please input message"),
});

type Schema = z.infer<typeof ContactSchema>;

export default function Footerpage({ id }: { id?: string }) {
  //GSAP refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const ImageRef = useRef<HTMLImageElement | null>(null);

  const contactForm = useForm<Schema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (userData: Schema) => {
    console.log("Wassap");
  };

  useGSAP(() => {
    if (!headerRef || !sectionRef || !ImageRef) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom bottom",
      },
    });

    let split = SplitText.create(headerRef.current, {
      type: "chars",
    });

    tl.from(split.chars, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
    })
      .from(
        ImageRef.current,
        {
          duration: 1,
          y: 100,
          autoAlpha: 0,
        },
        "-=0.7",
      )
      .from(
        ".contact",
        { y: 20, autoAlpha: 0, stagger: 0.05, duration: 1 },
        "-=0.5",
      );
  }, []);

  return (
    <footer className="bg-[var(--black-font)] h-150" id={id} ref={sectionRef}>
      <div className="justify-items-center grid grid-cols-[2fr_1fr] mb-10">
        {/* First Column */}
        <div className="px-5">
          <div className="flex">
            <h1
              className={`text-[var(--white-background)] text-[10rem] ${alata.className} leading-27`}
              ref={headerRef}
            >
              just <br />
              <span className="text-[var(--yellow-font)]"> send</span> it.
            </h1>
            <Image
              src="/butterflys.gif"
              alt=""
              width={170}
              height={100}
              ref={ImageRef}
            />
          </div>

          <div className="[&>div]:flex justify-between gap-5 [&>div]:gap-8 grid grid-cols-2 mt-15 h-50 [&>div]:text-[var(--white-background)] [&>div]:text-lg">
            {/* Location */}
            <div className="contact">
              <div className="relative flex">
                <MessageCircleMore
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>{" "}
              <div className="flex flex-col">
                <p className={`${alata.className} text-2xl`}>
                  Ready to have some coffee?
                </p>
                <p className="text-neutral-300 text-sm leading-4">
                  Phase 1 Block 40 Lot 5-A <br /> Santa Lucia, Magalang,
                  Pampanga
                </p>
              </div>
            </div>
            {/* Mail */}
            <div className="contact">
              <div className="relative flex">
                <Mail
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>{" "}
              <div className="flex flex-col">
                <p className={`${alata.className} text-2xl`}>
                  How can I assist you?
                </p>
                <a
                  href="mailto:ellainegonzales003@gmail.com"
                  className="text-neutral-300 text-sm leading-4 cursor-pointer"
                >
                  ellainegonzales003@gmail.com
                </a>
              </div>
            </div>
            {/* Phone */}
            <div className="contact">
              <div className="relative flex">
                <PhoneCall
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>{" "}
              <div className="flex flex-col">
                <p className={`${alata.className} text-2xl`}>
                  Don't hesitate to reach out!
                </p>
                <a
                  className="text-neutral-300 text-sm leading-4 cursor-pointer"
                  href="tel: (+63) 906 386 4236"
                >
                  (+63) 906 386 4236
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="">
          <div className="z-10 bg-[#F2EFEA] hover:shadow-[0_4px_20px_#F2D492] p-10 border-[#F2D492] border-3 rounded-md w-120 h-auto transition duration-300 ease-in-out">
            <h3 className={` text-xl ${alata.className} mb-5`}>
              Let's Collab!🤝
            </h3>
            <Form {...contactForm}>
              <form onSubmit={contactForm.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-5">
                  {/* Full Name */}
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="name">
                          Full Name
                          <span className="text-neutral-500 text-xs">
                            &nbsp;&nbsp;(Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Jane Doe"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Email Address */}
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            autoComplete="off"
                            placeholder="janedoe@gmail.com"
                            required
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="message"
                            placeholder="Leave a message."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button>Send Message</Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-end">
            {" "}
            <p className="mt-5 text-neutral-500 text-xs">
              Copyright © {new Date().getFullYear()} Ellaine Gonzales. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
