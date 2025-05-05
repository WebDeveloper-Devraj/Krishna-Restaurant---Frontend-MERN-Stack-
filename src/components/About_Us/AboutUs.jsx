import React from "react";
import styles from "./AboutUs.module.css";
import AboutUsHero from "./AboutUsHero";
import Story from "./Story";
import SignatureCuisine from "./SignatureCuisine";
import Team from "./team";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
// import Faq from "./Faq";

const AboutUs = () => {
  return (
    <div className={styles.aboutUsPage}>
      <AboutUsHero />
      <Story />
      <SignatureCuisine />
      <Team />
      <Review />
      <ReviewForm />
      {/* <Faq /> */}
    </div>
  );
};

export default AboutUs;
