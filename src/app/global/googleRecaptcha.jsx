"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const GoogleRecaptcha = forwardRef(({ onVerify }, ref) => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      setRecaptchaLoaded(true);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const verifyRecaptcha = useCallback(() => {
    if (!recaptchaLoaded || !window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return Promise.reject(new Error("reCAPTCHA not loaded"));
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
          .then((token) => {
            fetch("/api/recaptcha", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                  onVerify();
                  resolve();
                } else {
                  console.error("reCAPTCHA verification failed:", data.error);
                  reject(new Error("reCAPTCHA verification failed"));
                }
              })
              .catch((error) => {
                console.error("Error verifying reCAPTCHA:", error);
                reject(error);
              });
          })
          .catch((error) => {
            console.error("Error executing reCAPTCHA:", error);
            reject(error);
          });
      });
    });
  }, [onVerify, recaptchaLoaded]);

  useImperativeHandle(ref, () => ({
    verifyRecaptcha,
  }));

  return <div id="recaptcha" />;
});

export default GoogleRecaptcha;
