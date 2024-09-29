import React, { useEffect, useRef, useState } from "react";
import placeholder from "../assets/user.png";
import "../index.css";
import styles from "./entertainment.module.css";
const MovieSkeleton = () => (
  <div className={`${styles.movieCard} ${styles.skeleton}`}>
    <div className={`${styles.movieImage} ${styles.skeletonShimmer}`}></div>
  </div>
);

const CategorySkeleton = () => (
  <section className={styles.category}>
    <h3 className={`${styles.skeletonText} ${styles.skeletonShimmer}`}></h3>
    <div className={styles.movieGrid}>
      {[...Array(5)].map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  </section>
);

const EntertainmentPage = () => {
  const [movies, setMovies] = useState({
    Action: [],
    Thriller: [],
    Horror: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRefs = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=7e2b980ba6ab4bd8c3843ea18da90a1a"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const transformedMovies = {
          Action: data.results.filter((movie) => movie.genre_ids.includes(28)),
          Thriller: data.results.filter((movie) =>
            movie.genre_ids.includes(53)
          ),
          Horror: data.results.filter((movie) => movie.genre_ids.includes(27)),
        };

        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="appName">Super app</h1>
        <div className={styles.userAvatar}>
          <img
            className={styles.avatarImage}
            src={placeholder}
            alt="User avatar"
          />
        </div>
      </header>
      <main className={styles.main}>
        <h2 className={styles.title}>Entertainment according to your choice</h2>

        {loading ? (
          <>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          Object.entries(movies).map(([category, movieList]) => (
            <section key={category} className={styles.category}>
              <h3>{category}</h3>
              <div
                className={styles.movieCarousel}
                ref={(el) => (carouselRefs.current[category] = el)}
              >
                {movieList.concat(movieList).map((movie, index) => (
                  <div
                    key={`${movie.id}-${index}`}
                    className={styles.movieCard}
                  >
                    <img
                      className={styles.movieImage}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
};

export default EntertainmentPage;
