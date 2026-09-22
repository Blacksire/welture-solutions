"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apply white background and border when scrolling down
      setIsScrolled(window.scrollY > 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-[50] transition-colors duration-300 ${
        isScrolled
          ? "bg-white border-b border-[#DADADA]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className="mx-auto xl:max-w-[1440px]"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        <div className="flex items-center justify-between px-[1rem] md:px-[2.5rem] xl:px-[3em] 2xl:px-0 py-[20px] xl:py-[20px]">
          <Link href="/">
            <Image
              className="w-[70%] xl:w-[85%] h-full"
              src="./home-img/welture-logo.svg"
              alt="weltureLogo"
              width={100}
              height={100}
            />
          </Link>
          <Navbar />
          <Link
            href="/#contactus"
            className="relative overflow-hidden px-[25px] py-[10px] text-white w-auto items-center gap-[20px] font-bold button-effect text-[14px] hidden xl:flex"
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
      </div>
    </header>
  );
}
