"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import GoogleRecaptcha from "@/app/global/googleRecaptcha";

export default function ContactUsSection() {
  const [formValues, setFormValues] = useState({
    Name: "",
    companyName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,}$/;

    if (!formValues.Name) return "Name is required.";
    if (!formValues.emailAddress || !emailRegex.test(formValues.emailAddress))
      return "A valid email address is required.";
    if (!formValues.phoneNumber || !phoneRegex.test(formValues.phoneNumber))
      return "A valid phone number is required.";
    if (!formValues.message) return "Message is required.";
    return "";
  };

  const onRecaptchaVerify = () => {
    // Proceed with form submission after reCAPTCHA verification
    submitForm();
  };

  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", formValues.Name);
      formData.append("companyName", formValues.companyName);
      formData.append("emailAddress", formValues.emailAddress);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("message", formValues.message);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      let result;
      try {
        result = text
          ? JSON.parse(text)
          : { message: "No response data", status: "error" };
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        throw new Error("Invalid response format from server.");
      }

      setMessage(result.message);
      setStatus(result.status);

      if (result.status === "success") {
        setFormValues({
          Name: "",
          companyName: "",
          emailAddress: "",
          phoneNumber: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setMessage(
        error.message || "An error occurred while submitting the form."
      );
      setStatus("error");
    }
  };

  const onContactFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (recaptchaRef.current && recaptchaRef.current.verifyRecaptcha) {
      try {
        await recaptchaRef.current.verifyRecaptcha();
        // onRecaptchaVerify will handle form submission
      } catch (error) {
        setErrorMessage("reCAPTCHA verification failed. Please try again.");
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please try again.");
    }
  };

  return (
    <div className="lg:bg-[#F5F9FF]" id="contactus">
      <div
        ref={sectionRef}
        className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 py-[5em] md:py-[8em] xl:py-0 xl:pb-[5em]"
      >
        <div className="grid lg:grid-cols-[40%_60%] lg:bg-white lg:p-[50px] rounded-[40px]">
          <div className="relative">
            <Image
              ref={imageRef}
              className="rounded-[30px] object-cover h-[400px] lg:h-[600px] w-full"
              src="/home-img/contact-us-bg.png"
              alt="headerBgImg"
              width={2000}
              height={100}
              priority
            />
            <div className="relative">
              <p className="w-[160px] md:w-[300px] lg:w-[200px] ml-auto p-[30px] md:p-[35px] bg-white rounded-tl-[30px] absolute right-0 bottom-0"></p>
              <div className="border-shape shape-bottom"></div>
              <div className="border-shape shape-top contact-shape-top"></div>
            </div>
          </div>
          <div
            ref={formRef}
            className="w-full lg:w-[90%] xl:w-[75%] lg:ml-auto mt-[3em] xl:m-auto"
          >
            <h2
              className="mb-[10px]"
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              Contact Us
            </h2>
            <p
              className="mb-[30px]"
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              Our team is just a message away
            </p>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-[25px]"
              onSubmit={onContactFormSubmit}
            >
              <div className="sm:col-span-2 floating-input relative">
                <input
                  type="text"
                  name="Name"
                  className="bg-transparent w-full h-[3.5em] rounded-[30px] border border-[#E9E9E9] text-[#121A21] text-[16px] placeholder:text-[#121A21] px-[25px] py-[10px]"
                  placeholder="Name*"
                  required
                  value={formValues.Name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="floating-input relative">
                <input
                  name="emailAddress"
                  type="email"
                  className="bg-transparent w-full h-[3.5em] rounded-[30px] border border-[#E9E9E9] text-[#121A21] text-[16px] placeholder:text-[#121A21] px-[25px] py-[10px]"
                  placeholder="Email address*"
                  required
                  value={formValues.emailAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="floating-input relative">
                <input
                  type="text"
                  name="phoneNumber"
                  className="bg-transparent w-full h-[3.5em] rounded-[30px] border border-[#E9E9E9] text-[#121A21] text-[16px] placeholder:text-[#121A21] px-[25px] py-[10px]"
                  placeholder="Phone Number*"
                  required
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2 floating-input relative">
                <input
                  type="text"
                  name="companyName"
                  className="bg-transparent w-full h-[3.5em] rounded-[30px] border border-[#E9E9E9] text-[#121A21] text-[16px] placeholder:text-[#121A21] px-[25px] py-[10px]"
                  placeholder="Company Name"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={4}
                  className="bg-transparent w-full rounded-[30px] border border-[#E9E9E9] text-[#121A21] text-[16px] placeholder:text-[#121A21] px-[25px] py-[20px]"
                  placeholder="Message*"
                  required
                  value={formValues.message}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-left md:col-span-2">
                <GoogleRecaptcha
                  onVerify={onRecaptchaVerify}
                  ref={recaptchaRef}
                />
                <button
                  type="submit"
                  className="bg-[#1670F5] rounded-[40px] px-[30px] md:px-[50px] py-[10px] text-white flex items-center justify-center gap-[15px] font-bold w-full cursor-pointer text-[14px]"
                >
                  Send
                  <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {errorMessage && (
                <div className="md:col-span-2 text-red-500 text-sm font-syne mt-4">
                  {errorMessage}
                </div>
              )}
            </form>
            {message && (
              <div
                className={`md:col-span-2 text-sm font-[500] mt-10 font-syne ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
