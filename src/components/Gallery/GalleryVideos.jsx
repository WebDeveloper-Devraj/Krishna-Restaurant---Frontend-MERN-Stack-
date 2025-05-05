import styles from "./Gallery.module.css";

const GalleryVideos = ({ videos }) => {
  return videos.map((video, index) => (
    <div key={index} className={styles.galleryItem}>
      <video src={video.url} controls muted></video>
    </div>
  ));
};

export default GalleryVideos;
