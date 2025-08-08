import React from 'react';

const TimelineCard = ({ movie }) => {
    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 flex flex-col items-center w-64 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gray-800 cursor-pointer">
            <img
                src = {movie.poster}
                alt = {movie.title}
                className = "w-full h-80 object-cover rounded-md mb-3 transition-transform duration-200 hover:scale-105"
                />
                <h2 className="text-lg font-bold text-center">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.releaseDate}</p>
                <p className = "text-xs mt-1">
                    Phase {movie.phase} . {movie.type}
                </p>
        </div>
    );
};

export default TimelineCard;