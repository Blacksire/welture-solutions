import Image from "next/image";
import Link from "next/link";

export default function HowWeWorkSection() {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 py-[5em] md:py-[8em] xl:py-[15em] relative">
        <div className="blur-blue-bg how-we-blur-blue-bg absolute"></div>
        <div className="blur-pink-bg absolute"></div>
        <div className="grid lg:grid-cols-2 items-center gap-[20px]">
          <div
            className="bg-[#0F6FFF] p-[30px] md:p-[50px] lg:py-[100px] lg:px-[80px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] text-center text-white h-full flex flex-col justify-center"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div>
              <h3 className="my-[15px]">How We Work</h3>
              <p className="mb-[30px]">
                We understand challenges, craft strategies, and deliver
                scalable, results-driven business solutions.
              </p>
              <Link
                href="/#contactus"
                className="relative overflow-hidden px-[25px] py-[10px] text-white w-max m-auto flex items-center gap-[20px] font-bold button-effect blue-button-effect text-[14px] z-10"
              >
                Get Started
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
          <div className="flex flex-col gap-[20px]">
            <div
              className="bg-white p-[30px] lg:px-[50px] lg:py-[40px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] md:flex lg:block gap-[20px] items-center"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <Image
                className="w-[50px] h-[50px] bg-[#1670F5] rounded-[15px] p-[12px]"
                src="./home-img/understanding.svg"
                alt="understanding"
                width={100}
                height={100}
                priority
              />
              <h5 className="mt-[20px] md:mt-0 lg:mt-[20px]">
                Understanding Your Business Challenges
              </h5>
            </div>
            <div
              className="bg-white p-[30px] lg:px-[50px] lg:py-[40px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] md:flex lg:block gap-[20px] items-center"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <Image
                className="w-[50px] h-[50px] bg-[#1670F5] rounded-[15px] p-[12px]"
                src="./home-img/creating.svg"
                alt="creating"
                width={100}
                height={100}
                priority
              />
              <h5 className="mt-[20px] md:mt-0 lg:mt-[20px]">
                Creating Tailored Strategies
              </h5>
            </div>
            <div
              className="bg-white p-[30px] lg:px-[50px] lg:py-[40px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] md:flex lg:block gap-[20px] items-center"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              <Image
                className="w-[50px] h-[50px] bg-[#1670F5] rounded-[15px] p-[12px]"
                src="./home-img/implementing.svg"
                alt="implementing"
                width={100}
                height={100}
                priority
              />
              <h5 className="mt-[20px] md:mt-0 lg:mt-[20px]">
                Implementing Scalable, Results-Focused Solutions
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
