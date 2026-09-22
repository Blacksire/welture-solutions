"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@heroui/react";
import PrivacySection from "./privacy-section";
import PrivacySectionBM from "./privacy-section-bm";
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

export default function PrivacyBanner() {
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
      title: "Privacy Policy",
      content: (
        <ul className="pl-[50px] underline underline-offset-2 space-y-[5px]">
          <li>
            <Link href="/privacy-policy/#en-a">
              Personal Data that we collect and how we collect it
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-b">Your Consent</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-c">
              Purpose of the collected information
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-d">
              Use and Disclosure of Personal Data
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-e">
              Storage and Retention of Personal Data
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-f">Security Measures</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-g">Data Subject Rights</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-h">Confidentiality</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-i">Third Party Websites</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-j">
              Your acceptance of these terms
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-k">Changes to this policy</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-l">Disclaimer</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-m">Language</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#en-n">Contact</Link>
          </li>
        </ul>
      ),
      key: "1",
    },
    {
      title: "Dasar Privasi",
      content: (
        <ul className="pl-[50px] underline underline-offset-2 space-y-[5px]">
          <li>
            <Link href="/privacy-policy/#bm-a">
              Data Peribadi yang kami kumpulkan dan cara kami mengumpulnya
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-b">Persetujuan Anda</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-c">
              Tujuan maklumat yang dikumpul
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-d">
              Penggunaan dan Pendedahan Data Peribadi
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-e">
              Penyimpanan dan Pengekalan Data Peribadi Anda
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-f">Langkah Keselamatan</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-g">Hak Subjek Data</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-h">Kerahsiaan</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-i">Laman Web Pihak Ketiga</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-j">
              Penerimaan anda terhadap syarat ini
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-k">Perubahan kepada dasar ini</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-l">Penafian</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-m">Bahasa</Link>
          </li>
          <li>
            <Link href="/privacy-policy/#bm-n">Hubungi</Link>
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
                      <span className="faq-title lg:w-full text-[#121A21B2]">
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
        <h2 className="!leading-none">Privacy Policy</h2>
        <p className="!font-bold my-[30px]">Last updated June 3, 2025</p>
        <PrivacySection />
        <h2 className="!leading-none pt-[48px] xl:pt-[80px] mb-[30px]">
          Dasar Privasi
        </h2>
        <PrivacySectionBM />
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
