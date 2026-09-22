"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";
import "./extra-style.scss";
import Header from "./global/header";
import Footer from "./global/footer";
import Lenis from "@studio-freight/lenis";
import PreLoader from "./home-component/preloader-section";
import AOS from "aos";
import "aos/dist/aos.css";
import DisableRightClick from "./global/disable-right-click";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure scrollbar is visible during preloader
    document.body.style.overflowY = "auto";

    // Check if the screen width is above 1199px
    const isDesktop = window.matchMedia("(min-width: 1300px)").matches;

    // Check if the current route is /privacy-policy
    const isPrivacyPolicy = pathname === "/privacy-policy";
    const isTermsConditions = pathname === "/terms-conditions";

    let lenis = null;

    // Initialize Lenis only on desktop
    if (isDesktop) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => t,
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.1,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } else {
      // Ensure native scrolling on mobile
      document.body.style.overflow = "auto";
    }

    // Skip preloader on mobile or for /privacy-policy
    if (!isDesktop || isPrivacyPolicy || isTermsConditions) {
      setIsLoading(false);
    }

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      disable: window.innerWidth < 768,
    });

    // Refresh AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };
    window.addEventListener("resize", handleResize);

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.hash) {
        e.preventDefault();
        const hash = target.hash;
        const element = document.querySelector(hash);
        if (element) {
          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight : 0;
          if (isDesktop && lenis) {
            // Use Lenis smooth scroll on desktop
            lenis.scrollTo(element, {
              offset: -headerHeight,
              duration: 0.8,
              easing: (t) => t,
            });
          } else {
            // Use native scroll on mobile
            const top =
              element.getBoundingClientRect().top +
              window.scrollY -
              headerHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
    };

    const handleRouteChange = (url) => {
      const hash = url.split("#")[1];
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(`#${hash}`);
          if (element) {
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 0;
            if (isDesktop && lenis) {
              // Use Lenis smooth scroll on desktop
              lenis.scrollTo(element, {
                offset: -headerHeight,
                duration: 0.8,
                easing: (t) => t,
              });
            } else {
              // Use native scroll on mobile
              const top =
                element.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }
        }, 100);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", () =>
      handleRouteChange(window.location.href)
    );

    return () => {
      if (lenis) lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", () =>
        handleRouteChange(window.location.href)
      );
      window.removeEventListener("resize", handleResize);
      document.body.style.overflowY = ""; // Reset scroll
      AOS.refresh();
    };
  }, [router, pathname]);

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {isLoading ? (
          <PreLoader setIsLoading={setIsLoading} />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
            <DisableRightClick />
          </>
        )}
      </body>
    </html>
  );
}
