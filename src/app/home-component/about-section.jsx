import Image from "next/image";

export default function aboutSection() {
  return (
    <div className="bg-about-gradient" id="aboutus">
      <div className="mx-auto xl:max-w-[1440px] px-[1rem] md:px-[2.5rem] 2xl:px-0 pb-[5em] md:pb-[8em] xl:py-[10em] relative">
        <div className="blur-green-bg about-blur-green-bg absolute"></div>
        <h2 className="text-[#1670F5] mb-[20px]">About Us</h2>
        <div className="grid lg:grid-cols-2 gap-[2em] lg:gap-[50px] xl:gap-[100px] mb-[5em] lg:mb-[100px]">
          <p>
            Scaling a business in today's fast-paced market requires more than
            just good ideas—it takes the right strategies and innovative
            solutions. At Welture Solutions, we specialize in solving the
            challenges businesses face when trying to grow.
          </p>
          <p>
            We provide tailored sales strategies and digital transformation
            solutions that streamline your operations, increase efficiency, and
            unlock new growth opportunities. With our expert guidance and
            personalized approach, we ensure your business not only survives but
            thrives in an ever-evolving marketplace.
          </p>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-[20px]">
          <div
            className="bg-white p-[30px] md:p-[40px] xl:py-[100px] xl:px-[80px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] h-full"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <Image
              className="w-[60px] h-[60px] bg-[#1670F5] rounded-[15px] p-[15px]"
              src="./home-img/our-vision.svg"
              alt="our-vision"
              width={100}
              height={100}
              priority
            />
            <h4 className="my-[15px]">Our Vision</h4>
            <p>
              To be the 1st partner for businesses seeking strategic sales and
              digital transformation solutions.
            </p>
          </div>
          <div
            className="bg-white p-[30px] md:p-[40px] xl:py-[100px] xl:px-[80px] rounded-[30px] drop-shadow-[0_4px_6px_#0000001A] h-full"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <Image
              className="w-[60px] h-[60px] bg-[#1670F5] rounded-[15px] p-[15px]"
              src="./home-img/our-mission.svg"
              alt="our-mission"
              width={100}
              height={100}
              priority
            />
            <h4 className="my-[15px]">Our Mission</h4>
            <p>
              Expanding market reach and competitiveness with tailored sales and
              tech-driven solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
