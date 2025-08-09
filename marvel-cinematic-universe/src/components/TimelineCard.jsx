import React from 'react';

const TimelineCard = ({ movie }) => {
    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-3 md:p-4 flex flex-col items-center w-48 md:w-64 transition-transform duration-200 hover:scale-105 hover:shadow-xl md:hover:shadow-2xl hover:bg-gray-800 cursor-pointer active:scale-95">
            <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-md mb-2 md:mb-3 transition-transform duration-200 hover:scale-105"
                loading="lazy"
                decoding="async"
            />
            <div className="w-full text-center">
                <h2 className="text-sm md:text-lg font-bold line-clamp-2">{movie.title}</h2>
                <p className="text-xs md:text-sm text-gray-400">{movie.releaseDate}</p>
                <p className="text-xs mt-1 text-gray-300">
                    Phase {movie.phase} • {movie.type}
                </p>
            </div>
        </div>
    );
};

export default React.memo(TimelineCard);