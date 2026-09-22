import PrivacyBanner from "./privacy-policy-component/privacy-banner";

export const metadata = {
  title: "Welture Solutions - Privacy Policy",
  description:
    "This Privacy Policy governs the manner in which Welture Solutions collects, uses, maintains and discloses information collected.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <div className="">
        <PrivacyBanner />
      </div>
    </>
  );
}
