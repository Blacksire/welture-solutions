"use client";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Check if the screen width is above 768px (disable animation for mobile)
    const isDesktop = window.matchMedia("(min-width: 1199px)").matches;

    if (isDesktop) {
      const email = "enquiries@welturesolutions.com";
      const textBox = document.querySelector(".email-text");

      // Cursor blink
      gsap.to(".email-cursor", {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
      });

      const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      const typeTl = gsap.timeline();
      const deleteTl = gsap.timeline();
      let currentText = "";

      // Type each character
      email.split("").forEach((char) => {
        currentText += char;
        typeTl.set(
          textBox,
          {
            textContent: currentText,
          },
          "+=0.05"
        );
      });

      // Pause before deleting
      typeTl.to({}, { duration: 1.2 });

      // Delete characters one by one
      email.split("").forEach(() => {
        currentText = currentText.slice(0, -1);
        deleteTl.set(
          textBox,
          {
            textContent: currentText,
          },
          "+=0.05"
        );
      });

      masterTl.add(typeTl).add(deleteTl);
    } else {
      // On mobile, set the full email text without animation
      const textBox = document.querySelector(".email-text");
      if (textBox) {
        textBox.textContent = "enquiries@welturesolutions.com";
      }
    }
  }, []);

  return (
    <footer>
      <div className="footer-bg relative bg-[#F5F9FF]">
        <div className="xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] xl:px-[3em] 2xl:px-0 mx-auto pb-[2em] pt-[5em]">
          <div className="mb-0 talk-text">
            <h2 className="w-full text-[#1670F5] mb-[10px] font-[700] flex gap-[10px] items-center">
              Let's talk
              <Image
                className="w-[50px] h-[50px]"
                src="/home-img/speech-bubble.svg"
                alt="footer-logo"
                width={60}
                height={60}
                priority
              />
            </h2>
            <h3 className="flex items-center">
              <span className="email-text text-[#121A21]"></span>
              <span className="email-cursor ml-1 text-[#121A21] hidden lg:inline-block">
                |
              </span>
            </h3>
          </div>
          <div className="flex items-center font-[400] text-[14px] gap-[15px] text-[#484848] mt-[60px] mb-[10px] lg:hidden">
            <a href="/terms-conditions">Terms & Conditions</a>
            <p>•</p>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <div className="flex justify-between items-center lg:mt-[60px] pt-[10px] md:pt-0 lg:pt-[10px] border-t-1 border-t-[#D1D5DB]">
            <div className="flex justify-between items-center font-[400] text-[14px] gap-[15px] text-[#484848]">
              <p className="!text-[14px]">
                © {currentYear} Welture Solutions Sdn. Bhd. 202401035117
                (1580964W). All rights reserved.
              </p>
              <p className="hidden lg:block">•</p>
              <a href="/terms-conditions" className="hidden lg:block">
                Terms & Conditions
              </a>
              <p className="hidden lg:block">•</p>
              <a href="/privacy-policy" className="hidden lg:block">
                Privacy Policy
              </a>
            </div>
            <div>
              <Image
                className="w-[100px] md:w-[60px] md:h-[60px]"
                src="/home-img/footer-logo.svg"
                alt="footer-logo"
                width={60}
                height={60}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
