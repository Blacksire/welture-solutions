"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@heroui/react";
import TermsConditionsSection from "./terms-conditions-section";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CustomArrowImage = ({ isOpen }) => (
  <Image
    src="/home-img/privacy-arrow.svg"
    alt="Privacy Icon"
    width={13}
    height={13}
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-90" : "rotate-0"
    }`}
  />
);

export default function TermsConditionsBanner() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const pinStickyRef = useRef(null);

  useEffect(() => {
    // Handle accordion state based on screen size
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleMediaChange = (e) => {
      setSelectedKeys(e.matches ? new Set(["1"]) : new Set());
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Add listener for changes
    mediaQuery.addEventListener("change", handleMediaChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Apply pinning for screens >= 1280px with different end points
    if (pinStickyRef.current) {
      ScrollTrigger.matchMedia({
        // Screens >= 1600px
        "(min-width: 1600px)": function () {
          ScrollTrigger.create({
            trigger: pinStickyRef.current,
            start: "top 150px",
            end: "bottom center",
            pin: true,
            pinSpacing: false,
          });
        },
        // Screens between 1280px and 1599px
        "(min-width: 1280px) and (max-width: 1599px)": function () {
          ScrollTrigger.create({
            trigger: pinStickyRef.current,
            start: "top 100px",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        },
      });
    }

    // Smooth scroll for all Back to Top links using Lenis or native scrolling
    const isDesktop = window.matchMedia("(min-width: 1199px)").matches;
    const backToTopLinks = document.querySelectorAll(".back-to-top");
    const handleBackToTop = (e) => {
      e.preventDefault();
      const element = document.querySelector(".back-here");
      if (element) {
        const header = document.querySelector("header");
        const headerHeight = header ? header.offsetHeight : 0;
        if (isDesktop && window.lenis) {
          // Use Lenis smooth scroll on desktop
          window.lenis.scrollTo(element, {
            offset: -headerHeight,
            duration: 1,
            easing: (t) => t,
          });
        } else {
          // Use native scroll on mobile
          const top =
            element.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };
    backToTopLinks.forEach((link) => {
      link.addEventListener("click", handleBackToTop);
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      backToTopLinks.forEach((link) => {
        link.removeEventListener("click", handleBackToTop);
      });
    };
  }, []);

  const accordionItems = [
    {
      title: "Interpretation and Definitions",
      content: (
        <ul className="pl-[50px] underline underline-offset-2 space-y-[5px]">
          <li>
            <Link href="/terms-conditions/#terms-a">Interpretation</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-b">Definitions</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-c">
              Purpose of the collected information
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-d">Acknowledgment</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-e">
              Links to Other Websites
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-f">Termination</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-g">
              Limitation of Liability
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-h">
              "AS IS" and "AS AVAILABLE" Disclaimer
            </Link>
          </li>
        </ul>
      ),
      key: "1",
    },
    {
      title: "Severability and Waiver",
      content: (
        <ul className="pl-[50px] underline underline-offset-2 space-y-[5px]">
          <li>
            <Link href="/terms-conditions/#terms-i">Severability</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-j">Waiver</Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-k">
              Changes to These Terms and Conditions
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions/#terms-l">Contact Us</Link>
          </li>
        </ul>
      ),
      key: "2",
    },
  ];

  return (
    <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] xl:px-[3em] 2xl:px-0 pt-[8em] xl:pt-[10em] xl:grid grid-cols-[25%_75%] gap-[50px] back-here">
      <div className="pin-sticky" ref={pinStickyRef}>
        <h5 className="mb-[20px] font-bold">Table of contents</h5>
        <ul className="!list-decimal">
          <Accordion
            className="core-value-row privacy-sections border-b-1 border-b-[#D9D9D9] pb-[10px]"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.key}
                title={
                  <div className="flex flex-row-reverse justify-end gap-[30px] items-center cursor-pointer text-left underline underline-offset-2 mb-[10px] text-[#121A21B2]">
                    <li>
                      <span className="faq-title lg:w-full text-[#121A21B2] font-[400]">
                        {item.title}
                      </span>
                    </li>
                    <CustomArrowImage isOpen={selectedKeys.has(item.key)} />
                  </div>
                }
                textValue={item.title}
                icon={null}
                className="mb-[10px] relative z-10"
                titleClassName="font-bold p-4"
                contentClassName="p-4 text-black"
              >
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </ul>
        <Link
          href="/"
          className="back-to-top font-bold gap-[10px] items-center pt-[30px] hidden xl:flex"
        >
          Back To Top{" "}
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99986 3.82843V16H6.99986V3.82843L1.6359 9.1924L0.22168 7.7782L7.99986 0L15.7781 7.7782L14.3639 9.1924L8.99986 3.82843Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-[50px] xl:mt-0">
        <h2 className="!leading-none">Terms & Conditions</h2>
        <p className="!font-bold my-[30px]">Last updated June 3, 2025</p>
        <TermsConditionsSection />
        <Link
          href="/"
          className="back-to-top font-bold flex gap-[10px] items-center xl:pt-[30px] pb-[5em] xl:pb-[10em]"
        >
          Back To Top{" "}
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99986 3.82843V16H6.99986V3.82843L1.6359 9.1924L0.22168 7.7782L7.99986 0L15.7781 7.7782L14.3639 9.1924L8.99986 3.82843Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
