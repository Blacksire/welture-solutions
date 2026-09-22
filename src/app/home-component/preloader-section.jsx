"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import DisableRightClick from "../global/disable-right-click";

export default function PreLoader({ setIsLoading }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);
  const progressContainerRef = useRef(null);
  const whereSalesRef = useRef(null);
  const navigateSuccessRef = useRef(null);
  const progressContainerParentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const progressBar = progressBarRef.current;
    const percentage = percentageRef.current;
    const progressContainer = progressContainerRef.current;
    const progressContainerParent = progressContainerParentRef.current;
    const whereSales = whereSalesRef.current;
    const navigateSuccess = navigateSuccessRef.current;

    if (
      section &&
      content &&
      progressBar &&
      percentage &&
      progressContainer &&
      progressContainerParent &&
      whereSales &&
      navigateSuccess
    ) {
      const progressTl = gsap.timeline({
        onComplete: () => {
          // No action here; handle hide in onUpdate at 100%
        },
      });

      progressTl
        .fromTo(
          progressBar,
          { width: "0%" },
          {
            width: "100%",
            duration: 5,
            ease: "linear",
            delay: 0.1,
          }
        )
        .to(
          percentage,
          {
            duration: 5,
            ease: "linear",
            delay: 0.1,
            onUpdate: () => {
              // Use timeline progress to calculate percentage (0 to 100)
              const percent = Math.round(progressTl.progress() * 100);
              percentage.textContent = `${percent}%`; // Update percentage text

              // Show "Where Sales" at 30% with fade-up animation
              if (percent === 30 && !whereSales._gsap) {
                gsap.fromTo(
                  whereSales,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                );
              }

              // Show "Navigate Success" at 50% with fade-up animation
              if (percent === 50 && !navigateSuccess._gsap) {
                gsap.fromTo(
                  navigateSuccess,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                );
              }

              // Fade out progress container parent at 93%
              if (percent === 93 && !progressContainerParent._gsap) {
                gsap.to(progressContainerParent, {
                  opacity: 0,
                  y: 20,
                  duration: 1,
                  ease: "power2.out",
                });
              }

              // Fade out sectionRef (background elements) at 100%
              if (percent === 100 && !section._gsap) {
                gsap.to(section, {
                  opacity: 0,
                  duration: 1,
                  ease: "power2.out",
                  onComplete: () => {
                    // Hide preloader after section fade-out
                    setIsLoading(false);
                  },
                });
              }
            },
          },
          0
        );

      gsap.fromTo(
        content,
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 5,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [setIsLoading]);

  return (
    <>
      <div className="bg-white h-screen relative">
        {/* SectionRef now only wraps the background elements to fade out */}
        <div ref={sectionRef}>
          <div className="blur-blue-bg preloader-blue-blur absolute"></div>
          <div className="blur-green-bg preloader-green-blur absolute"></div>
        </div>
        {/* ContentRef wraps all content, unaffected by sectionRef fade-out */}
        <div
          ref={contentRef}
          className="translate-y-full opacity-0" // Set initial state to match GSAP's "from"
        >
          <div
            ref={progressContainerParentRef}
            className="mx-auto xl:max-w-[1440px] w-full px-[1rem] md:px-[2.5rem] 2xl:px-0 absolute left-[50%] -translate-x-[50%]"
          >
            <h1 ref={percentageRef} className="mb-[20px] !text-[150px]">
              0%
            </h1>
            <div
              ref={progressContainerRef}
              className="relative h-[10px] bg-[#1670f54d] rounded-full overflow-hidden"
            >
              <div
                ref={progressBarRef}
                className="h-full bg-[#1670f5] rounded-full"
              ></div>
            </div>
          </div>
          <div className="mx-auto xl:max-w-[1440px] w-full px-[1rem] md:px-[2.5rem] 2xl:px-0 py-[5em] xl:py-[15em] relative">
            <div className="relative">
              <div className="h-screen">
                <h1 ref={whereSalesRef} className="opacity-0 translate-y-5">
                  Where Sales
                </h1>
                <h1
                  ref={navigateSuccessRef}
                  className="text-[#1670F5] flex items-center gap-[20px] opacity-0 translate-y-5"
                >
                  Navigate{" "}
                  <Image
                    className="rounded-[20px] w-[140px] h-[70px] object-cover"
                    src="/home-img/header-img.png"
                    alt="headerImg"
                    width={500}
                    height={500}
                    priority
                  ></Image>
                  Success
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisableRightClick />
    </>
  );
}
