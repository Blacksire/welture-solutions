"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { gsap } from "gsap";

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

export default function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Custom App Development",
      description:
        "Build tailored software and applications designed to meet your specific business needs.",
      image: "/home-img/services-1.jpg",
    },
    {
      id: "02",
      title: "Cloud Computing",
      description:
        "Scalable, secure, and cost-effective cloud solutions to store data and run applications efficiently.",
      image: "/home-img/services-2.jpg",
    },
    {
      id: "03",
      title: "Data Management",
      description:
        "Streamline how you collect, store, and analyze data to make smarter business decisions.",
      image: "/home-img/services-3.jpg",
    },
    {
      id: "04",
      title: "Cybersecurity",
      description:
        "Protect your business with advanced security measures to safeguard sensitive information and systems.",
      image: "/home-img/services-4.jpg",
    },
    {
      id: "05",
      title: "Green Energy",
      description:
        "Sustainable energy solutions like solar and wind power to reduce costs and environmental impact.",
      image: "/home-img/services-5.png",
    },
    {
      id: "06",
      title: "Advertising",
      description:
        "Data-driven campaigns to boost brand visibility and engagement across digital and traditional platforms.",
      image: "/home-img/services-6.jpg",
    },
  ];

  const [currentImage, setCurrentImage] = useState(services[0].image);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const imageRef = useRef(null);
  const swiperRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const animateImage = (direction) => {
    if (!imageRef.current) return;

    gsap.killTweensOf(imageRef.current);
    const initialX = direction === "next" ? "10%" : "-10%"; // Subtle slide
    gsap.set(imageRef.current, { x: initialX, opacity: 0 });
    gsap.to(imageRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    const prevIndex = prevIndexRef.current;

    let direction = "next";
    if (
      currentIndex < prevIndex ||
      (currentIndex === 0 && prevIndex === services.length - 1)
    ) {
      direction = "previous";
    }

    setCurrentImage(services[currentIndex].image);
    setActiveIndex(currentIndex);
    animateImage(direction);
    prevIndexRef.current = currentIndex;
  };

  const handleDragStart = (e) => {
    if (e.type === "touchstart") {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = e.clientX;
    }
    isDragging.current = true;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;

    let endX;
    if (e.type === "touchend") {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }

    const deltaX = dragStartX.current - endX;
    const threshold = 50; // Minimum drag distance to trigger slide change

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideNext();
      } else if (deltaX < 0 && swiperRef.current?.swiper) {
        swiperRef.current.swiper.slidePrev();
      }
    }

    isDragging.current = false;
    dragStartX.current = null;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    // No visual movement during drag
  };

  useEffect(() => {
    animateImage("next");

    const debouncedResize = debounce(() => {
      animateImage(prevIndexRef.current < activeIndex ? "next" : "previous");
    }, 200);

    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const CustomPrevButton = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
    >
      <path
        d="M12 19L5 12L12 5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12H5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CustomNextButton = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
    >
      <path
        d="M5 12H19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      className="bg-[#0F6FFF] text-[#F5F9FF] relative overflow-hidden"
      id="services"
    >
      <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 py-[5em] xl:py-[15em] relative">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 mb-[5em] lg:mb-[10em]">
          <div>
            <h2 className="mb-[30px] lg:mb-[20px]">Services</h2>
            <p className="border-t-1 border-t-[#FFFFFF] lg:border-0 pt-[30px] lg:pt-0">
              We offer end-to-end services including custom apps, cloud, data,
              cybersecurity, green energy, and advertising to solve business
              challenges and drive sustainable and secure growth.
            </p>
          </div>
        </div>
        {/* Mobile Swiper (<1199px) */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
              disabledClass: "swiper-button-disabled",
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <div className="flex flex-col-reverse items-center rounded-[30px]">
                  <div className="bg-[#F5F9FF] p-[30px] pb-[50px] md:p-[40px] text-[#121A21] w-full cursor-grab">
                    <div className="services-text">
                      <p className="!font-medium flex items-center gap-[10px] border-b-1 border-b-[#DADADA] pb-[10px] md:pb-[20px] mb-[20px] md:mb-[30px]">
                        <span className="text-[#1670F5]">{service.id}</span>
                        <span>/</span>
                        <span>06</span>
                      </p>
                      <h4 className="my-[15px]">{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                    <div className="flex items-center justify-start gap-[15px] mt-[20px] md:mt-[30px]">
                      <button
                        className="swiper-button-prev-custom bg-[#1670F5] hover:bg-[#003F9C] rounded-[50%] p-[12px] cursor-pointer"
                        aria-label="Previous slide"
                      >
                        <CustomPrevButton />
                      </button>
                      <button
                        className="swiper-button-next-custom bg-[#1670F5] hover:bg-[#003F9C] rounded-[50%] p-[12px] cursor-pointer"
                        aria-label="Next slide"
                      >
                        <CustomNextButton />
                      </button>
                    </div>
                  </div>
                  <Image
                    className="w-full h-[300px] object-cover xl:rounded-[30px]"
                    src={service.image}
                    alt={`service-${service.id}`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1199px) 100vw, 80vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop Layout (≥1199px) */}
        <div className="hidden lg:flex lg:flex-row items-center relative rounded-[30px]">
          <div className="bg-[#F5F9FF] p-[30px] md:p-[40px] lg:p-[80px] lg:rounded-[30px] text-[#121A21] w-full lg:w-[520px] lg:absolute z-20 cursor-grab">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
                disabledClass: "swiper-button-disabled",
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              className="mySwiper flex flex-col justify-between"
              onSlideChange={handleSlideChange}
            >
              {services.map((service, index) => (
                <SwiperSlide key={service.id}>
                  <div
                    className={`transition-opacity duration-500 services-text ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="!font-medium flex items-center gap-[10px] border-b-1 border-b-[#DADADA] lg:border-0 pb-[10px] md:pb-[20px] lg:pb-0 mb-[20px] md:mb-[30px] lg:mb-0">
                      <span className="text-[#1670F5]">{service.id}</span>
                      <span>/</span>
                      <span>06</span>
                    </p>
                    <h4 className="my-[15px]">{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </SwiperSlide>
              ))}
              <div className="flex items-center justify-start gap-[15px] mt-[20px] md:mt-[30px]">
                <button
                  className="swiper-button-prev-custom bg-[#1670F5] hover:bg-[#003F9C] rounded-[50%] p-[12px] cursor-pointer"
                  aria-label="Previous slide"
                >
                  <CustomPrevButton />
                </button>
                <button
                  className="swiper-button-next-custom bg-[#1670F5] hover:bg-[#003F9C] rounded-[50%] p-[12px] cursor-pointer"
                  aria-label="Next slide"
                >
                  <CustomNextButton />
                </button>
              </div>
            </Swiper>
          </div>
          <div
            className="lg:w-[80%] h-[300px] lg:h-[700px] 2xl:h-[800px] ml-auto z-10 cursor-grab"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDragMove}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onTouchMove={handleDragMove}
          >
            <Image
              ref={imageRef}
              className="lg:rounded-[30px] w-full h-full object-cover"
              src={currentImage}
              alt="service-image"
              width={1200}
              height={800}
              sizes="(max-width: 1199px) 100vw, 80vw"
              priority
              draggable={false}
            />
          </div>
          <Image
            className="absolute services-dots-svg h-[760px] object-cover"
            src="/home-img/services-dots.svg"
            alt="services-dots"
            width={300}
            height={1000}
            priority
          />
        </div>
      </div>
      <style jsx>{`
        .fixed-image-wrapper {
          position: relative;
          overflow: hidden;
        }
        .will-change-transform {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
