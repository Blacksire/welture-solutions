import Image from "next/image";

export default function HeaderBanner() {
  return (
    <div className="bg-white">
      <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 pt-[8em] md:pt-[10em] pb-[5em] md:pb-[8em] xl:pb-0 xl:pt-[15em]">
        <div className="relative">
          <div className="blur-blue-bg absolute"></div>
          <div className="blur-green-bg absolute"></div>
          <h1 className="relative z-10">Where Sales</h1>
          <h1 className="text-[#1670F5] hidden md:flex items-center gap-[15px] xl:gap-[20px]">
            Navigate{" "}
            <Image
              className="rounded-[20px] w-[140px] h-[60px] xl:h-[70px] object-cover"
              src="/home-img/header-img.png"
              alt="headerImg"
              width={500}
              height={500}
              priority
            ></Image>
            Success
          </h1>
          <h1 className="text-[#1670F5] md:hidden relative z-10">
            Navigate
            <span className="flex items-center gap-[20px]">
              Success
              <Image
                className="rounded-[20px] w-[120px] h-[50px] xl:h-[70px] object-cover"
                src="/home-img/header-img.png"
                alt="headerImg"
                width={500}
                height={500}
                priority
              ></Image>
            </span>
          </h1>
          <div
            className="relative"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <Image
              className="rounded-[30px] object-cover h-[400px] md:h-[600px] mt-[50px]"
              src="/home-img/header-bg.jpg"
              alt="headerBgImg"
              width={2000}
              height={100}
              priority
            ></Image>
            <div className="relative hidden md:block">
              <p className="w-[300px] lg:w-[540px] ml-auto lg:px-[30px] lg:pt-[15px] lg:pb-0 p-[35px] bg-white rounded-tl-[30px] absolute right-0 bottom-0 !font-[600] text-close">
                We drive your growth with tailored digital solutions and expert
                sales strategies because you matter.
              </p>
              <div className="border-shape shape-bottom"></div>
              <div className="border-shape shape-top"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
