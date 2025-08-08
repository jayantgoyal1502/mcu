import React from 'react';
import mcuData from "../mcuData";
import TimelineCard from "../components/TimelineCard";

const Timeline = () => {
    // ...existing code...
    // Favorites state (localStorage)
    const [favorites, setFavorites] = React.useState(() => {
        const saved = localStorage.getItem('mcuFavorites');
        return saved ? JSON.parse(saved) : {};
    });
    React.useEffect(() => {
        localStorage.setItem('mcuFavorites', JSON.stringify(favorites));
    }, [favorites]);
    // OMDb API key
    const OMDB_API_KEY = "4c6ecf49";

    // Fetched details cache
    const [movieDetails, setMovieDetails] = React.useState({});
    const [loadingDetails, setLoadingDetails] = React.useState(false);

    // Fetch details from OMDb when a card is clicked
    const handleCardClick = async (movie) => {
        setSelectedMovie(movie);
        if (!movieDetails[movie.title]) {
            setLoadingDetails(true);
            try {
                const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`);
                const data = await res.json();
                setMovieDetails(prev => ({ ...prev, [movie.title]: data }));
            } catch (err) {
                setMovieDetails(prev => ({ ...prev, [movie.title]: { Error: "Failed to fetch details" } }));
            }
            setLoadingDetails(false);
        }
    };
    // Watchlist state (localStorage)
    const [watched, setWatched] = React.useState(() => {
        const saved = localStorage.getItem('mcuWatched');
        return saved ? JSON.parse(saved) : {};
    });

    // Save watched state to localStorage
    React.useEffect(() => {
        localStorage.setItem('mcuWatched', JSON.stringify(watched));
    }, [watched]);



    // Mark all/reset
    const markAllWatched = () => {
        const all = {};
        filteredData.forEach(m => { all[m.id] = true; });
        setWatched(all);
    };
    const resetProgress = () => setWatched({});
    const [sortType, setSortType] = React.useState('chronological');
    // Multi-select genres
    const genreList = ['Action','Adventure','Sci-Fi','Fantasy','Comedy','Drama','Thriller'];
    const [genreFilter, setGenreFilter] = React.useState([]); // array of selected genres
    const [phaseFilter, setPhaseFilter] = React.useState('all');
    const [search, setSearch] = React.useState('');
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    // Sorting
    const sortedData = [...mcuData].sort((a, b) => {
        if (sortType === 'release') {
            return new Date(a.releaseDate) - new Date(b.releaseDate);
        }
        if (sortType === 'title') {
            return a.title.localeCompare(b.title);
        }
        if (sortType === 'rating') {
            // Use OMDb rating if available, fallback to local
            const ar = a.rating || (a.omdb && a.omdb.imdbRating ? parseFloat(a.omdb.imdbRating) : 0);
            const br = b.rating || (b.omdb && b.omdb.imdbRating ? parseFloat(b.omdb.imdbRating) : 0);
            return br - ar;
        }
        return a.chronologicalOrder - b.chronologicalOrder;
    });

    // Filtering (multi-genre)
    const filteredData = sortedData.filter(movie => {
        const phaseMatch = phaseFilter === 'all' || movie.phase === Number(phaseFilter);
        const searchMatch = movie.title.toLowerCase().includes(search.toLowerCase());
        // Multi-genre match
        let genreMatch = true;
        if (genreFilter.length > 0) {
            const genres = movieDetails[movie.title]?.Genre?.split(',').map(g => g.trim()) || [];
            genreMatch = genreFilter.some(gf => genres.includes(gf));
        }
        return phaseMatch && searchMatch && genreMatch;
    });

    // Fetch OMDb details for all visible movies (filteredData) on mount or when filteredData changes
    React.useEffect(() => {
        const OMDB_API_KEY = "4c6ecf49";
        filteredData.forEach(movie => {
            if (!movieDetails[movie.title]) {
                fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        setMovieDetails(prev => ({ ...prev, [movie.title]: data }));
                    });
            }
        });
    }, [filteredData]);

    // Progress (must be after filteredData)
    const totalMovies = filteredData.length;
    const watchedCount = filteredData.filter(m => watched[m.id]).length;
    const progressPercent = totalMovies ? Math.round((watchedCount / totalMovies) * 100) : 0;

    // Responsive layout
    const isMobile = window.innerWidth < 768;

    // Next movie recommendation
    const nextMovie = filteredData.find(m => !watched[m.id]);

    // Related Marvel TV shows (static list for now)
    const marvelShows = [
        { title: "WandaVision", link: "https://www.disneyplus.com/series/wandavision/4Sr2yKSjJxE4" },
        { title: "Loki", link: "https://www.disneyplus.com/series/loki/6pARMvILBGzF" },
        { title: "Hawkeye", link: "https://www.disneyplus.com/series/hawkeye/5qIvj2k1XH5r" },
        { title: "Ms. Marvel", link: "https://www.disneyplus.com/series/ms-marvel/1ZdMZQZ4d6Z4" },
        { title: "Moon Knight", link: "https://www.disneyplus.com/series/moon-knight/4S3oOF1kn6Zy" },
    ];

    return (
        <div className="min-h-screen bg-black py-10">
            <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
                Marvel Cinematic Universe Timeline
            </h1>
            {/* Progress Bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                <div className="w-full max-w-md">
                    <div className="text-white mb-1 text-center">Progress: {watchedCount} / {totalMovies} movies watched</div>
                    <div className="w-full bg-gray-700 rounded h-4">
                        <div className="bg-green-500 h-4 rounded" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>
                <button onClick={markAllWatched} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Mark All as Watched</button>
                <button onClick={resetProgress} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reset Progress</button>
            </div>
            {/* Favorites Section */}
            {Object.keys(favorites).length > 0 && (
                <div className="w-full max-w-2xl mx-auto mb-8 bg-yellow-100 rounded-lg p-4 text-black shadow">
                    <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
                    <div className="flex flex-wrap gap-4">
                        {Object.keys(favorites).map(fid => {
                            const favMovie = mcuData.find(m => m.id === Number(fid));
                            return favMovie ? (
                                <div key={favMovie.id} className="flex items-center gap-2 bg-white rounded shadow px-2 py-1">
                                    <img src={favMovie.poster} alt={favMovie.title} className="w-10 h-14 object-cover rounded" />
                                    <span className="font-semibold">{favMovie.title}</span>
                                    <button onClick={() => setFavorites(f => { const copy = { ...f }; delete copy[favMovie.id]; return copy; })} className="text-red-500 hover:text-red-700 text-lg" title="Remove from favorites">&#10084;</button>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            )}
            {/* Personalized Recommendations */}
            <div className="w-full max-w-2xl mx-auto mb-8 bg-gray-900 rounded-lg p-4 text-white shadow">
                <h2 className="text-xl font-bold mb-2">Personalized Recommendations</h2>
                <div className="mb-2">
                    <span className="font-semibold">Next movie in timeline:</span>
                    {nextMovie ? (
                        <span className="ml-2 text-green-400">{nextMovie.title}</span>
                    ) : (
                        <span className="ml-2 text-gray-400">All movies watched!</span>
                    )}
                </div>
                <div>
                    <span className="font-semibold">Related Marvel TV Shows:</span>
                    <ul className="list-disc ml-6 mt-1">
                        {marvelShows.map(show => (
                            <li key={show.title}>
                                <a href={show.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-200">{show.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <select value={sortType} onChange={e => setSortType(e.target.value)} className="px-2 py-1 rounded">
                    <option value="chronological">Sort by MCU Timeline</option>
                    <option value="release">Sort by Release Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="rating">Sort by Rating</option>
                </select>
                <select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)} className="px-2 py-1 rounded">
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
                    onChange={e => setSearch(e.target.value)}
                    className="px-2 py-1 rounded"
                />
                {/* Multi-select Genre tag chips */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setGenreFilter([])}
                        className={`px-2 py-1 rounded ${genreFilter.length===0?'bg-blue-600 text-white':'bg-gray-200 text-black'}`}
                    >All Genres</button>
                    {genreList.map(genre => (
                        <button
                            key={genre}
                            onClick={() => {
                                setGenreFilter(f => f.includes(genre) ? f.filter(g => g!==genre) : [...f, genre]);
                            }}
                            className={`px-2 py-1 rounded ${genreFilter.includes(genre)?'bg-blue-600 text-white':'bg-gray-200 text-black'}`}
                        >{genre}</button>
                    ))}
                </div>
            </div>
            <div className={isMobile ? "flex flex-col items-center gap-6" : "flex flex-wrap justify-center gap-6"}>
                <div
                    className={isMobile ? "flex flex-row overflow-x-auto gap-6 pb-4" : "flex flex-wrap justify-center gap-6"}
                    style={isMobile ? { WebkitOverflowScrolling: 'touch' } : {}}
                >
                    {filteredData.map(movie => (
                        <div key={movie.id} className="relative min-w-[270px]">
                            <div onClick={() => handleCardClick(movie)} className="cursor-pointer">
                                <TimelineCard movie={movie} />
                            </div>
                            <input
                                type="checkbox"
                                checked={!!watched[movie.id]}
                                onChange={e => setWatched(w => ({ ...w, [movie.id]: e.target.checked }))}
                                className="absolute top-2 left-2 w-5 h-5 accent-green-500"
                                title="Mark as watched"
                            />
                            <button
                                onClick={() => setFavorites(f => ({ ...f, [movie.id]: true }))}
                                className={`absolute top-2 right-2 text-lg ${favorites[movie.id] ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
                                title={favorites[movie.id] ? 'Favorited' : 'Add to favorites'}
                            >&#10084;</button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal for movie details */}
            {selectedMovie && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-2">
                    <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative shadow-lg overflow-y-auto max-h-[90vh]">
                        <button className="absolute top-2 right-2 text-xl text-gray-700 hover:text-red-500 transition-colors" onClick={() => setSelectedMovie(null)} aria-label="Close">&times;</button>
                        <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full h-64 object-cover rounded mb-4" />
                        <h2 className="text-2xl font-bold mb-2 text-center">{selectedMovie.title}</h2>
                        <div className="flex flex-col md:flex-row md:justify-between mb-2">
                            <span>Release Date: <b>{selectedMovie.releaseDate}</b></span>
                            <span>Phase: <b>{selectedMovie.phase}</b></span>
                        </div>
                        <p className="mb-2">Type: <b>{selectedMovie.type}</b></p>
                        {/* OMDb details */}
                        {loadingDetails ? (
                            <p className="mb-4 text-gray-700">Loading details...</p>
                        ) : movieDetails[selectedMovie.title] ? (
                            movieDetails[selectedMovie.title].Error ? (
                                <p className="mb-4 text-red-600">{movieDetails[selectedMovie.title].Error}</p>
                            ) : (
                                <>
                                    <p className="mb-4 text-gray-700"><b>Synopsis:</b> {movieDetails[selectedMovie.title].Plot || "Not available."}</p>
                                    <div className="mb-2 flex flex-col gap-2">
                                        <span><b>IMDb Rating:</b> {movieDetails[selectedMovie.title].imdbRating ? `${movieDetails[selectedMovie.title].imdbRating}/10` : "N/A"}</span>
                                        <span><b>Genre:</b> {movieDetails[selectedMovie.title].Genre || "N/A"}</span>
                                        <span><b>Director:</b> {movieDetails[selectedMovie.title].Director || "N/A"}</span>
                                        <span><b>Actors:</b> {movieDetails[selectedMovie.title].Actors || "N/A"}</span>
                                        <span><b>IMDb:</b> {movieDetails[selectedMovie.title].imdbID ? <a href={`https://www.imdb.com/title/${movieDetails[selectedMovie.title].imdbID}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a> : "N/A"}</span>
                                    </div>
                                </>
                            )
                        ) : (
                            <p className="mb-4 text-gray-700">No details available.</p>
                        )}
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={!!watched[selectedMovie.id]}
                                onChange={e => setWatched(w => ({ ...w, [selectedMovie.id]: e.target.checked }))}
                                className="w-5 h-5 accent-green-500"
                                title="Mark as watched"
                                id="modal-watched"
                            />
                            <label htmlFor="modal-watched" className="text-sm">Mark as watched</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;