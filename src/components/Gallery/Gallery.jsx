import React from "react";
import styles from "./Gallery.module.css";
import GalleryHero from "./GalleryHero";
import GalleryCategories from "./GalleryCategories";
import CustomerHighlights from "./CustomerHighlights";
import GallerySubmition from "./GallerySubmition";

const Gallery = () => {
  return (
    <div className={styles.galleryPage}>
      <GalleryHero />

      {/* Photo and Video Categories */}
      <div className={styles.gallerySection}>
        <GalleryCategories />

        {/* Customer Highlights */}
        {/* <CustomerHighlights /> */}

        {/* Gallery Submission */}
        {/* <GallerySubmition /> */}
      </div>
    </div>
  );
};

export default Gallery;
