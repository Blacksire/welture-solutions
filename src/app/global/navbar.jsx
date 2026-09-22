"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["aboutus", "whyus", "services", "faq"];
    const observerOptions = {
      root: null, // Viewport
      rootMargin: "-100px 0px -50% 0px", // Adjust to trigger when section is mostly visible
      threshold: 0.1, // Trigger when 10% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <nav className="flex items-center justify-between gap-[90px] xl:mx-auto navbar-section relative">
      {/* Burger Menu Button - Visible on mobile only */}
      <button
        className="xl:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? (
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 1L1 16"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1.70703 1L16.707 16"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 4.44885H1C0.447715 4.44885 0 4.89657 0 5.44885C0 6.00114 0.447715 6.44885 1 6.44885H23C23.5523 6.44885 24 6.00114 24 5.44885C24 4.89657 23.5523 4.44885 23 4.44885Z"
              fill="black"
            />
            <path
              d="M23 11.4489H1C0.447715 11.4489 0 11.8966 0 12.4489C0 13.0011 0.447715 13.4489 1 13.4489H23C23.5523 13.4489 24 13.0011 24 12.4489C24 11.8966 23.5523 11.4489 23 11.4489Z"
              fill="black"
            />
            <path
              d="M23 18.4489H1C0.447715 18.4489 0 18.8966 0 19.4489C0 20.0011 0.447715 20.4489 1 20.4489H23C23.5523 20.4489 24 20.0011 24 19.4489C24 18.8966 23.5523 18.4489 23 18.4489Z"
              fill="black"
            />
          </svg>
        )}
      </button>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden xl:flex items-center justify-between gap-[70px] w-full menu-row">
        <Link
          href="/#aboutus"
          className={`${
            activeSection === "aboutus" ? "active text-[#1670f5]" : ""
          }`}
        >
          About Us
        </Link>
        <Link
          href="/#whyus"
          className={`${
            activeSection === "whyus" ? "active text-[#1670f5]" : ""
          }`}
        >
          Why Us
        </Link>
        <Link
          href="/#services"
          className={`${
            activeSection === "services" ? "active text-[#1670f5]" : ""
          }`}
        >
          Services
        </Link>
        <Link
          href="/#faq"
          className={`${
            activeSection === "faq" ? "active text-[#1670f5]" : ""
          }`}
        >
          FAQs
        </Link>
      </div>

      {/* Mobile Navigation - Visible when burger is clicked */}
      <div
        className={`xl:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 menu-row navbar-mobile h-screen ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-[1rem] md:px-[2.5rem] py-[20px] border-b-1 border-b-[#DADADA]">
          <Link href="/">
            <Image
              className="w-[100%] h-[25px] mt-[3px] md:mt-0"
              src="./home-img/mobile-logo.svg"
              alt="weltureLogo"
              width={100}
              height={100}
            />
          </Link>
          <Link
            href="/#contactus"
            className="relative overflow-hidden px-[25px] py-[10px] text-white w-auto items-center gap-[20px] font-bold button-effect text-[14px] hidden md:flex mr-[50px]"
          >
            Get In Touch
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[10px] h-[10px] relative bottom-[1px]"
            >
              <path
                d="M1 9.44922L9 1.44922M9 1.44922H1M9 1.44922V9.44922"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="flex flex-col h-full text-[40px] font-[SFTSchriftedMedium]">
          <Link
            href="/"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#aboutus"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/#whyus"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            Why Us
          </Link>
          <Link
            href="/#services"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/#faq"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            FAQs
          </Link>
          <Link
            href="/#contactus"
            className="flex border-b-1 border-b-[#DADADA] px-[1rem] md:px-[2.5rem] py-[5px]"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
