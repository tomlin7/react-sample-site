import styles from "./newsCard.module.css";
import skeletons from "./skeletons.module.css";

/// News Skeleton shown while loading
const NewsSkeleton = () => (
  <div className={`${styles.newsCard} ${skeletons.skeleton}`}>
    <div className={styles.newsImageContainer}>
      <div className={`${styles.newsImage} ${skeletons.skeletonImage}`}></div>
      <div className={styles.newsTitle}>
        <h3 className={skeletons.skeletonText}></h3>
        <h3 className={skeletons.skeletonText}></h3>
      </div>
    </div>
    <div className={styles.newsContent}>
      <p className={skeletons.skeletonText}></p>
      <p className={skeletons.skeletonText}></p>
    </div>
  </div>
);

/// News Card
const NewsCard = ({ news }) => {
  return (
    <div className={styles.newsCard}>
      <div className={styles.newsImageContainer}>
        {/* { console.log(news) } */}
        <img
          src={news.multimedia[0].url}
          alt={news.title}
          width={news.multimedia[0].width}
          height={news.multimedia[0].height}
          className={styles.newsImage}
        />
        <div className={styles.newsTitle}>
          <h3>{news.title}</h3>
        </div>
      </div>
      <div className={styles.newsContent}>
        <p>{news.abstract}</p>
      </div>
    </div>
  );
};

export { NewsCard, NewsSkeleton };
