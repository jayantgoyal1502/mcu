import React from "react";
import mcuData from "../mcuData";
import TimelineCard from "../components/TimelineCard";

const Timeline = () => {
  // State initialization
  const [favorites, setFavorites] = React.useState(() => {
    const saved = localStorage.getItem("mcuFavorites");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [movieDetails, setMovieDetails] = React.useState({});
  const [loadingDetails, setLoadingDetails] = React.useState(false);
  
  const [watched, setWatched] = React.useState(() => {
    const saved = localStorage.getItem("mcuWatched");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [sortType, setSortType] = React.useState("chronological");
  const [genreFilter, setGenreFilter] = React.useState([]);
  const [phaseFilter, setPhaseFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  // Constants
  const TMDB_API_KEY = "293efb0065d79b9e696fe8275049db26";
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const genreList = [
    "Action",
    "Adventure",
    "Sci-Fi",
    "Fantasy",
    "Comedy",
    "Drama",
    "Thriller",
  ];

  // Effects
  React.useEffect(() => {
    localStorage.setItem("mcuFavorites", JSON.stringify(favorites));
  }, [favorites]);

  React.useEffect(() => {
    localStorage.setItem("mcuWatched", JSON.stringify(watched));
  }, [watched]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Debounce resize handler
    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Data processing
  const sortedData = React.useMemo(() => {
    return [...mcuData].sort((a, b) => {
      if (sortType === "release")
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      if (sortType === "title") return a.title.localeCompare(b.title);
      if (sortType === "rating") {
        const ar = movieDetails[a.title]?.vote_average || 0;
        const br = movieDetails[b.title]?.vote_average || 0;
        return br - ar;
      }
      return a.chronologicalOrder - b.chronologicalOrder;
    });
  }, [mcuData, sortType, movieDetails]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter((movie) => {
      const phaseMatch =
        phaseFilter === "all" || movie.phase === Number(phaseFilter);
      const searchMatch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());
      let genreMatch = true;
      if (genreFilter.length > 0) {
        const genres =
          movieDetails[movie.title]?.genres?.map((g) => g.name) || [];
        genreMatch = genreFilter.some((gf) => genres.includes(gf));
      }
      return phaseMatch && searchMatch && genreMatch;
    });
  }, [sortedData, phaseFilter, search, genreFilter, movieDetails]);

  // TMDB API calls
  const fetchTMDBDetails = React.useCallback(async (title) => {
    try {
      const searchRes = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          title
        )}`
      );
      const searchData = await searchRes.json();
      if (!searchData.results || searchData.results.length === 0)
        return { error: "Movie not found" };

      const movieId = searchData.results[0].id;
      const detailsRes = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,external_ids`
      );
      const detailsData = await detailsRes.json();

      return {
        title: detailsData.title,
        overview: detailsData.overview,
        genres: detailsData.genres,
        vote_average: detailsData.vote_average,
        director:
          detailsData.credits?.crew?.find((c) => c.job === "Director")?.name ||
          "N/A",
        actors:
          detailsData.credits?.cast
            ?.slice(0, 5)
            .map((c) => c.name)
            .join(", ") || "N/A",
        imdb_id: detailsData.external_ids?.imdb_id || null,
      };
    } catch {
      return { error: "Failed to fetch details" };
    }
  }, []);

  // Event handlers
  const handleCardClick = React.useCallback(async (movie) => {
    setSelectedMovie(movie);
    if (!movieDetails[movie.title]) {
      setLoadingDetails(true);
      const data = await fetchTMDBDetails(movie.title);
      setMovieDetails((prev) => ({ ...prev, [movie.title]: data }));
      setLoadingDetails(false);
    }
  }, [movieDetails, fetchTMDBDetails]);

  // Prefetch visible movie details
  React.useEffect(() => {
    const prefetchDetails = async () => {
      const promises = filteredData.map(async (movie) => {
        if (!movieDetails[movie.title]) {
          const data = await fetchTMDBDetails(movie.title);
          setMovieDetails((prev) => ({ ...prev, [movie.title]: data }));
        }
      });
      
      // Limit concurrent requests to avoid mobile performance issues
      const batchSize = 3;
      for (let i = 0; i < promises.length; i += batchSize) {
        await Promise.all(promises.slice(i, i + batchSize));
      }
    };
    
    prefetchDetails();
  }, [filteredData]);

  // Derived values
  const totalMovies = filteredData.length;
  const watchedCount = filteredData.filter((m) => watched[m.id]).length;
  const progressPercent = totalMovies
    ? Math.round((watchedCount / totalMovies) * 100)
    : 0;
  const nextMovie = filteredData.find((m) => !watched[m.id]);

  // Related Marvel TV shows
  const marvelShows = React.useMemo(() => [
    {
      title: "WandaVision",
      link: "https://www.disneyplus.com/series/wandavision/4Sr2yKSjJxE4",
    },
    {
      title: "Loki",
      link: "https://www.disneyplus.com/series/loki/6pARMvILBGzF",
    },
    {
      title: "Hawkeye",
      link: "https://www.disneyplus.com/series/hawkeye/5qIvj2k1XH5r",
    },
    {
      title: "Ms. Marvel",
      link: "https://www.disneyplus.com/series/ms-marvel/1ZdMZQZ4d6Z4",
    },
    {
      title: "Moon Knight",
      link: "https://www.disneyplus.com/series/moon-knight/4S3oOF1kn6Zy",
    },
  ], []);

  // Progress actions
  const markAllWatched = () => {
    const all = {};
    filteredData.forEach((m) => {
      all[m.id] = true;
    });
    setWatched(all);
  };
  
  const resetProgress = () => setWatched({});

  return (
    <div className="min-h-screen bg-black py-4 md:py-10 px-2 md:px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500 mb-6 md:mb-8">
        Marvel Cinematic Universe Timeline
      </h1>

      {/* Progress Bar */}
      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        <div className="w-full max-w-md">
          <div className="text-white mb-1 text-center text-sm md:text-base">
            Progress: {watchedCount} / {totalMovies} movies watched
          </div>
          <div className="w-full bg-gray-700 rounded h-3 md:h-4">
            <div
              className="bg-green-500 h-3 md:h-4 rounded"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllWatched}
            className="bg-green-600 text-white px-2 py-1 text-sm md:px-3 md:py-1 md:text-base rounded hover:bg-green-700"
          >
            Mark All
          </button>
          <button
            onClick={resetProgress}
            className="bg-red-600 text-white px-2 py-1 text-sm md:px-3 md:py-1 md:text-base rounded hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Favorites */}
      {Object.keys(favorites).length > 0 && (
        <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 bg-yellow-100 rounded-lg p-3 md:p-4 text-black shadow">
          <h2 className="text-lg md:text-xl font-bold mb-2">Your Favorites</h2>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {Object.keys(favorites).map((fid) => {
              const favMovie = mcuData.find((m) => m.id === Number(fid));
              return favMovie ? (
                <div
                  key={favMovie.id}
                  className="flex items-center gap-1 md:gap-2 bg-white rounded shadow px-1 md:px-2 py-0 md:py-1"
                >
                  <img
                    src={favMovie.poster}
                    alt={favMovie.title}
                    className="w-8 h-10 md:w-10 md:h-14 object-cover rounded"
                    loading="lazy"
                  />
                  <span className="font-semibold text-xs md:text-sm">
                    {favMovie.title}
                  </span>
                  <button
                    onClick={() =>
                      setFavorites((f) => {
                        const copy = { ...f };
                        delete copy[favMovie.id];
                        return copy;
                      })
                    }
                    className="text-red-500 hover:text-red-700 text-sm md:text-lg"
                  >
                    &#10084;
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 bg-gray-900 rounded-lg p-3 md:p-4 text-white shadow">
        <h2 className="text-lg md:text-xl font-bold mb-2">Recommendations</h2>
        <div className="mb-2 text-sm md:text-base">
          <span className="font-semibold">Next movie:</span>
          {nextMovie ? (
            <span className="ml-1 md:ml-2 text-green-400">{nextMovie.title}</span>
          ) : (
            <span className="ml-1 md:ml-2 text-gray-400">All watched!</span>
          )}
        </div>
        <div className="text-sm md:text-base">
          <span className="font-semibold">Marvel TV Shows:</span>
          <ul className="list-disc ml-4 md:ml-6 mt-1">
            {marvelShows.map((show) => (
              <li key={show.title}>
                <a
                  href={show.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-200 text-xs md:text-sm"
                >
                  {show.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-center gap-3 mb-4 md:mb-6 px-2">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 py-1 rounded text-sm md:text-base flex-grow max-w-xs"
          >
            <option value="chronological">MCU Timeline</option>
            <option value="release">Release Date</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>
          
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-2 py-1 rounded text-sm md:text-base flex-grow max-w-xs"
          >
            <option value="all">All Phases</option>
            <option value="1">Phase 1</option>
            <option value="2">Phase 2</option>
            <option value="3">Phase 3</option>
            <option value="4">Phase 4</option>
            <option value="5">Phase 5</option>
            <option value="6">Phase 6</option>
          </select>
          
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 rounded text-sm md:text-base flex-grow max-w-xs"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 w-full">
          <button
            onClick={() => setGenreFilter([])}
            className={`px-2 py-1 rounded text-xs md:text-sm ${
              genreFilter.length === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All
          </button>
          {genreList.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setGenreFilter((f) =>
                  f.includes(genre)
                    ? f.filter((g) => g !== genre)
                    : [...f, genre]
                );
              }}
              className={`px-2 py-1 rounded text-xs md:text-sm ${
                genreFilter.includes(genre)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Cards */}
      <div
        className={
          isMobile
            ? "flex overflow-x-auto gap-3 p-2 no-scrollbar"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2"
        }
      >
        {filteredData.map((movie) => (
          <div
            key={movie.id}
            className={`${
              isMobile ? "flex-shrink-0 w-40" : "relative"
            } transition-transform hover:scale-105`}
          >
            <div
              onClick={() => handleCardClick(movie)}
              className="cursor-pointer"
            >
              <TimelineCard movie={movie} />
            </div>
            <input
              type="checkbox"
              checked={!!watched[movie.id]}
              onChange={(e) =>
                setWatched((w) => ({ ...w, [movie.id]: e.target.checked }))
              }
              className="absolute top-2 left-2 w-4 h-4 md:w-5 md:h-5 accent-green-500"
            />
            <button
              onClick={() => setFavorites((f) => ({ ...f, [movie.id]: true }))}
              className={`absolute top-2 right-2 text-base md:text-lg ${
                favorites[movie.id] ? "text-red-500" : "text-gray-400"
              } hover:text-red-600`}
            >
              &#10084;
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-2 md:px-4">
          <div className="bg-white text-black rounded-lg p-4 md:p-6 w-full max-w-md relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-1 right-1 md:top-2 md:right-2 text-xl text-gray-700 hover:text-red-500"
              onClick={() => setSelectedMovie(null)}
            >
              &times;
            </button>
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-full h-48 md:h-64 object-cover rounded mb-3 md:mb-4"
              loading="lazy"
            />
            <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-center">
              {selectedMovie.title}
            </h2>
            <div className="flex flex-col md:flex-row md:justify-between mb-1 md:mb-2 text-sm md:text-base">
              <span>
                Release: <b>{selectedMovie.releaseDate}</b>
              </span>
              <span>
                Phase: <b>{selectedMovie.phase}</b>
              </span>
            </div>
            <p className="mb-1 md:mb-2 text-sm md:text-base">
              Type: <b>{selectedMovie.type}</b>
            </p>

            {loadingDetails ? (
              <p className="mb-3 md:mb-4 text-gray-700 text-sm md:text-base">Loading...</p>
            ) : movieDetails[selectedMovie.title] ? (
              movieDetails[selectedMovie.title].error ? (
                <p className="mb-3 md:mb-4 text-red-600 text-sm md:text-base">
                  {movieDetails[selectedMovie.title].error}
                </p>
              ) : (
                <>
                  <p className="mb-3 md:mb-4 text-gray-700 text-sm md:text-base">
                    <b>Synopsis:</b>{" "}
                    {movieDetails[selectedMovie.title].overview ||
                      "Not available."}
                  </p>
                  <div className="mb-2 flex flex-col gap-1 md:gap-2 text-sm md:text-base">
                    <span>
                      <b>Rating:</b>{" "}
                      {movieDetails[selectedMovie.title].vote_average
                        ? `${movieDetails[selectedMovie.title].vote_average}/10`
                        : "N/A"}
                    </span>
                    <span>
                      <b>Genre:</b>{" "}
                      {movieDetails[selectedMovie.title].genres
                        ?.map((g) => g.name)
                        .join(", ") || "N/A"}
                    </span>
                    <span>
                      <b>Director:</b>{" "}
                      {movieDetails[selectedMovie.title].director}
                    </span>
                    <span>
                      <b>Actors:</b> {movieDetails[selectedMovie.title].actors}
                    </span>
                    <span>
                      <b>IMDb:</b>{" "}
                      {movieDetails[selectedMovie.title].imdb_id ? (
                        <a
                          href={`https://www.imdb.com/title/${
                            movieDetails[selectedMovie.title].imdb_id
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </>
              )
            ) : (
              <p className="mb-3 md:mb-4 text-gray-700 text-sm md:text-base">No details available.</p>
            )}

            <div className="mt-3 md:mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!watched[selectedMovie.id]}
                onChange={(e) =>
                  setWatched((w) => ({
                    ...w,
                    [selectedMovie.id]: e.target.checked,
                  }))
                }
                className="w-4 h-4 md:w-5 md:h-5 accent-green-500"
                id="modal-watched"
              />
              <label htmlFor="modal-watched" className="text-xs md:text-sm">
                Mark as watched
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;