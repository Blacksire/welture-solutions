"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// Data for the 5 items with background colors and images
const items = [
  {
    index: "01",
    title: "Holistic Solutions",
    description:
      "We integrate sales and digital strategies for comprehensive business growth.",
    imageSrc: "/home-img/image-1.svg",
    img: "/home-img/image-1.png",
    bgColor: "#39B6F4A3",
    pathData: "",
  },
  {
    index: "02",
    title: "Tailored Approach",
    description:
      "Our solutions are customized to meet your unique business needs.",
    imageSrc: "/home-img/image-2.svg",
    img: "/home-img/image-2.jpg",
    bgColor: "#CAFF00B0",
    pathData: "",
  },
  {
    index: "03",
    title: "Results-Focused",
    description: "We prioritize measurable outcomes to ensure your success.",
    imageSrc: "/home-img/image-3.svg",
    img: "/home-img/image-3.jpg",
    bgColor: "#9C5407",
    pathData: "",
  },
  {
    index: "04",
    title: "Seamless Execution",
    description:
      "From strategy to implementation, we ensure smooth, impactful results.",
    imageSrc: "/home-img/image-4.svg",
    img: "/home-img/image-4.jpg",
    bgColor: "#1670F5",
    pathData: "",
  },
  {
    index: "05",
    title: "Long-Term Partnership",
    description:
      "We build lasting relationships, adapting to your evolving business needs.",
    imageSrc: "/home-img/image-5.svg",
    img: "/home-img/image-5.jpg",
    bgColor: "#5AB280",
    pathData: "",
  },
];

export default function SetUsApartSection() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const indexRef = useRef(null);
  const bgRef = useRef(null);
  const [currentContent, setCurrentContent] = useState(items[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch SVG paths and update pathData
  useEffect(() => {
    const loadSvgPaths = async () => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].pathData) continue;

        try {
          const response = await fetch(items[i].imageSrc);
          if (!response.ok)
            throw new Error(`Failed to fetch ${items[i].imageSrc}`);
          const svgText = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");
          const path =
            doc.querySelector("path#main-path") || doc.querySelector("path");
          if (path) {
            items[i].pathData = path.getAttribute("d");
          } else {
            console.warn(
              `No <path> found in ${items[i].imageSrc}. Using empty path.`
            );
            items[i].pathData = "";
          }
        } catch (error) {
          console.error(`Error loading SVG ${items[i].imageSrc}:`, error);
          items[i].pathData = "";
        }
      }
      setCurrentContent({ ...items[0] });
    };
    loadSvgPaths();
  }, []);

  // ScrollTrigger and MorphSVG animation
  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const index = indexRef.current;
    const bg = bgRef.current;

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${items.length * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalItems = items.length;
        const newIndex = Math.min(
          Math.round(progress * totalItems),
          totalItems - 1
        );

        index.textContent = items[newIndex].index;
        title.textContent = items[newIndex].title;
        desc.textContent = items[newIndex].description;

        gsap.to(bg, {
          background: items[newIndex].bgColor,
          duration: 1,
          ease: "power2.out",
        });

        // Apply MorphSVG on desktop, static path update on mobile
        if (path) {
          if (window.innerWidth >= 1024) {
            gsap.to(path, {
              morphSVG: items[newIndex].pathData || "",
              duration: 1,
              ease: "power2.out",
            });
          } else {
            path.setAttribute("d", items[newIndex].pathData || "");
          }
        }

        setCurrentContent(items[newIndex]);
        setCurrentIndex(newIndex);
      },
    });

    if (svg) {
      svg.addEventListener("load", () => ScrollTrigger.refresh());
    }
    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", () => ScrollTrigger.refresh());
    };
  }, []);

  // Fade-up animation for text
  useEffect(() => {
    const title = titleRef.current;
    const desc = descRef.current;
    const index = indexRef.current;

    gsap.set([index, title, desc], {
      opacity: 0,
      y: 50,
    });

    gsap.to([index, title, desc], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, [currentIndex]);

  return (
    <div className="bg-[#F5F9FF] relative">
      <div
        className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 pt-[5em] xl:pt-[10em] xl:pb-0 relative"
        id="whyus"
      >
        <div className="flex justify-between items-center border-b border-[#D1D5DB] pb-[30px] mb-[30px]">
          <h2
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            What Sets Us Apart
          </h2>
          <Link
            href="/#contactus"
            className="relative overflow-hidden px-[25px] py-[10px] text-white w-auto hidden lg:flex items-center gap-[20px] font-bold button-effect text-[14px] z-10"
          >
            Contact Us
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
        <div className="grid lg:grid-cols-2 gap-[20px] md:gap-[100px] xl:gap-[200px]">
          <p className="lg:col-start-2">
            We stand out by combining strategic sales expertise with digital
            transformation to drive real, lasting growth and deliver measurable
            outcomes that support your unique business goals.
          </p>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 h-screen flex items-center justify-center"
      >
        <div className="grid lg:grid-cols-2 items-center gap-[50px] md:gap-[150px] xl:gap-[200px] w-full">
          <div className="relative">
            <div
              ref={bgRef}
              className="blur-blue-bg absolute blur-light-blue"
            ></div>
            <svg
              ref={svgRef}
              className="z-10 relative w-full xl:w-[600px] h-[410px] lg:h-[450px] overflow-unset will-change-transform"
              viewBox="0 0 489 368"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <mask id="pathMask">
                  <path
                    ref={pathRef}
                    d={currentContent.pathData}
                    fill="white"
                  />
                </mask>
              </defs>
              <image
                x="0"
                y="0"
                width="489"
                height="368"
                href={currentContent.img}
                mask="url(#pathMask)"
                preserveAspectRatio="xMidYMid meet"
                className="w-auto h-[410px] lg:h-[450px]"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-between h-full mobile-text">
            <div>
              <p className="font-[500] flex items-center gap-[10px] border-b border-[#D1D5DB] pb-[10px] mb-[30px] lg:mb-0 font-sft-medium !text-[18px]">
                <span ref={indexRef} className="text-[#1670F5]">
                  {currentContent.index}
                </span>
                <span>/</span>
                <span>05</span>
              </p>
            </div>
            <div>
              <h4
                ref={titleRef}
                className="font-[600] mb-[15px] font-sft-light"
              >
                {currentContent.title}
              </h4>
              <p ref={descRef} className="lg:w-[80%] mr-auto">
                {currentContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
