import { useSelector } from "react-redux";
import styles from "./Gallery.module.css";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GalleryItems = () => {
  const { activeCategory, activeSubCategory } = useSelector(
    (store) => store.galleryCategories
  );

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch(`${BASE_URL}/restaurant/gallery`);
      const data = await res.json();

      if (data.success) {
        setGallery(data.items);
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: "Error in fetching gallery!",
            type: "error",
          })
        );
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const filterImages = gallery.filter(
    (galleryItem) =>
      galleryItem.type == "image" && galleryItem.category === activeCategory
  );
  const filterVideos = gallery.filter(
    (galleryItem) =>
      galleryItem.type == "video" && galleryItem.category === activeCategory
  );

  return (
    <div className={styles.galleryItems}>
      {loading ? (
        <LoadingSpinner />
      ) : activeSubCategory === "Photos" ? (
        filterImages.length === 0 ? (
          <p className={styles.no_gallery_msg}>
            No photos available in this category.
          </p>
        ) : (
          <GalleryPhotos images={filterImages} />
        )
      ) : filterVideos.length === 0 ? (
        <p className={styles.no_gallery_msg}>
          No videos available in this category.
        </p>
      ) : (
        <GalleryVideos videos={filterVideos} />
      )}
    </div>
  );
};

export default GalleryItems;
