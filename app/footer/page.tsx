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
import { Contact } from "@/hooks/use-submit";
import { useSubmit } from "@/hooks/use-submit";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ContactSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Please input email"),
  message: z.string().min(1, "Please input message"),
});

export type Schema = z.infer<typeof ContactSchema>;

interface ContactProps {
  contact?: Contact;
  id?: string;
}

export default function Footerpage({ contact, id }: ContactProps) {
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

  const { submitContact } = useSubmit(contact!);

  const handleSubmit = async (values: Schema) => {
    try {
      await submitContact(values);
      contactForm.reset();
    } catch (error) {
      throw error;
    }
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
    <footer
      className="relative lg:flex lg:items-center bg-[var(--black-font)] px-7 lg:px-16 py-10 w-full h-full min-h-screen"
      id={id}
    >
      <div
        className="gap-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] mx-auto max-w-7xl h-full"
        ref={sectionRef}
      >
        {/* First Column */}
        <div>
          <div className="flex md:flex">
            <h1
              className={`text-[var(--white-background)] leading-10 text-6xl lg:text-[8rem] xl:text-[10rem] ${alata.className} lg:leading-27`}
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
              className="md:block max-w-30"
            />
          </div>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:mt-10 [&>div]:text-[var(--white-background)] md:[&>div]:text-lg">
            {/* Location */}
            <div className="flex gap-5">
              <div className="relative flex shrink-0">
                <MessageCircleMore
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>
              <div className="flex flex-col">
                <p className={`${alata.className} text-xl lg:text-base`}>
                  Ready to have some coffee?
                </p>
                <p className="text-neutral-300 text-sm leading-4">
                  Phase 1 Block 40 Lot 5-A <br /> Santa Lucia, Magalang,
                  Pampanga
                </p>
              </div>
            </div>
            {/* Mail */}
            <div className="flex gap-5">
              <div className="relative flex shrink-0">
                <Mail
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>
              <div className="flex flex-col">
                <p className={`${alata.className} text-xl lg:text-base`}>
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
            <div className="flex gap-5">
              <div className="relative flex shrink-0">
                <PhoneCall
                  width={50}
                  height={50}
                  className="z-10 mt-3"
                  color="#F2EFEA"
                />
                <div className="absolute bg-[#F2D492] ml-3 rounded-full w-13 h-13"></div>
              </div>
              <div className="flex flex-col">
                <p className={`${alata.className} text-xl lg:text-base`}>
                  Don't hesitate to reach out!
                </p>
                <a
                  className="text-neutral-300 text-sm leading-4 cursor-pointer"
                  href="tel:(+63) 906 386 4236"
                >
                  (+63) 906 386 4236
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="">
          <div className="z-10 bg-[#F2EFEA] hover:shadow-[0_4px_20px_#F2D492] p-5 md:p-10 lg:p-7 border-[#F2D492] border-3 rounded-md w-full lg:w-110 xl:w-120 h-auto transition duration-300 ease-in-out">
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
                  <Button className="cursor-pointer">Send Message</Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-end">
            {" "}
            <p className="mt-5 text-[10px] text-neutral-500 md:text-xs">
              Copyright © {new Date().getFullYear()} Ellaine Gonzales. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
