"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionItem } from "@heroui/react";

const CustomArrowImage = ({ isOpen }) => (
  <Image
    src="/home-img/faq-arrow.svg"
    alt="FaqIcon"
    width={13}
    height={13}
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-45" : "rotate-0"
    }`}
  />
);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null); // null means all closed

  const accordionItems = [
    {
      title: "What industries does Welture Solutions serve?",
      content: (
        <>
          Our expertise spans a wide range of industries, including:
          <ul className="list-disc pl-5 mt-2">
            <li>
              Technology, Retail and E-commerce, Manufacturing, Professional
              Services, Healthcare, Financial Services.
            </li>
            <li>
              Regardless of your industry, we tailor our solutions to align with
              your unique market dynamics and goals.
            </li>
          </ul>
        </>
      ),
    },
    {
      title:
        "Does Welture Solutions offer ongoing support after implementing solutions?",
      content: (
        <>
          Yes, we believe in being a long-term partner in your success. After
          implementation, we provide:
          <ul className="list-disc pl-5 mt-2">
            <li>Regular check-ins to monitor progress.</li>
            <li>Performance reviews and feedback sessions.</li>
            <li>
              Adjustments to strategies as your business evolves or market
              conditions change.
            </li>
          </ul>
          You can count on us to stay invested in your journey.
        </>
      ),
    },
    {
      title:
        "How long does it take to see results from working with Welture Solutions?",
      content:
        "The timeline depends on the scope of the project and your specific goals. Some clients see immediate improvements (e.g., in streamlined processes), while others may experience gradual growth over several months. We'll set clear expectations during the initial consultation and keep you updated throughout the process.",
    },
    {
      title: "Who is behind Welture Solutions?",
      content:
        "Welture Solutions was founded by a team of experienced professionals with deep expertise in business growth, sales strategies, and digital transformation. Our leadership team combines years of industry knowledge with a passion for helping businesses innovate and scale effectively.",
    },
    {
      title: "Can Welture Solutions help startups and new businesses?",
      content:
        "Absolutely! Startups face unique challenges when scaling, and we love helping them build strong foundations. From crafting go-to-market strategies to implementing scalable systems, we ensure startups are equipped to compete and grow in their markets.",
    },
    {
      title: "What if I'm unsure about what my business needs?",
      content:
        "That's okay! Many clients come to us without a clear idea of what they need. During the consultation phase, we'll ask the right questions to understand your pain points, goals, and vision. From there, we'll propose actionable solutions tailored to your situation.",
    },
  ];

  const handleToggle = (index) => {
    try {
      setOpenIndex(openIndex === index ? null : index);
    } catch (error) {
      console.error("Error in handleToggle:", error);
      setOpenIndex(null); // Fallback to all closed
    }
  };

  return (
    <div className="bg-[#F5F9FF]" id="faq">
      <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 py-[5em] md:py-[8em] xl:py-[15em] relative">
        <div className="blur-light-blue-bg absolute"></div>
        <div className="grid lg:grid-cols-[40%_60%]">
          <div className="mb-[3em] lg:mb-0 text-center lg:text-left">
            <h3
              className="mb-[15px] lg:w-[280px]"
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              Frequently Asked Questions
            </h3>
            <p className="mb-[30px]">Haven't found an answer to your query?</p>
            <Link
              href="/#contactus"
              className="relative overflow-hidden px-[25px] py-[10px] text-white w-max flex items-center gap-[20px] font-bold button-effect text-[14px] z-10 m-auto lg:m-0"
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
          <div>
            <Accordion className="core-value-row" selectionMode="single">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={
                    <div
                      className="flex justify-between items-center cursor-pointer text-left"
                      onClick={() => handleToggle(index)}
                    >
                      <span className="w-[90%] md:w-[80%] faq-title lg:w-full">
                        {item.title}
                      </span>
                      <CustomArrowImage isOpen={openIndex === index} />
                    </div>
                  }
                  textValue={item.title}
                  icon={null}
                  className="bg-[#FFFFFF] rounded-[20px] px-[25px] py-[20px] mb-[10px] relative z-10"
                  titleClassName="font-bold p-4"
                  contentClassName="bg-white p-4 text-black"
                  isOpen={openIndex === index}
                >
                  <div className="mt-[20px] text-[16px]">{item.content}</div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
