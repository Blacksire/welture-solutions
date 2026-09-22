import TermsConditionsBanner from "./terms-conditions-component/terms-conditions-banner";

export const metadata = {
  title: "Welture Solutions - Terms & Conditions",
  description:
    "Please read these terms and conditions carefully before using Our Service.",
};

export default function TermsConditions() {
  return (
    <>
      <div className="">
        <TermsConditionsBanner />
      </div>
    </>
  );
}
