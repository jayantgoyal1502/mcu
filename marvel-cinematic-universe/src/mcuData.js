const mcuData = [
  // Phase One (2008–2012)
  { id: 1, title: "Iron Man", releaseDate: "2008-05-02", phase: 1, type: "Movie", chronologicalOrder: 1, poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg", synopsis: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.", trailer: "https://www.youtube.com/watch?v=8hYlB38asDY", imdb: "https://www.imdb.com/title/tt0371746/", rating: 7.9, streaming: "Disney+" },
  { id: 2, title: "The Incredible Hulk", releaseDate: "2008-06-13", phase: 1, type: "Movie", chronologicalOrder: 2, poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_FMjpg_UX1000_.jpg", synopsis: "Bruce Banner seeks a cure to his unique condition, which causes him to turn into a giant green monster under emotional stress.", trailer: "https://www.youtube.com/watch?v=xbqNb2PFKrw", imdb: "https://www.imdb.com/title/tt0800080/", rating: 6.6, streaming: "Disney+" },
  { id: 3, title: "Iron Man 2", releaseDate: "2010-05-07", phase: 1, type: "Movie", chronologicalOrder: 3, poster: "https://upload.wikimedia.org/wikipedia/en/e/ed/Iron_Man_2_poster.jpg", synopsis: "Tony Stark faces pressure from various sources to share his technology with the military.", trailer: "https://www.youtube.com/watch?v=wKtcmiifycU", imdb: "https://www.imdb.com/title/tt1228705/", rating: 6.9, streaming: "Disney+" },
  { id: 4, title: "Thor", releaseDate: "2011-05-06", phase: 1, type: "Movie", chronologicalOrder: 4, poster: "https://m.media-amazon.com/images/M/MV5BNjRhNGZjZjEtYTQzYS00OWUxLThjNGEtMTIwMTE2ZDFlZTZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", synopsis: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth).", trailer: "https://www.youtube.com/watch?v=JOddp-nlNvQ", imdb: "https://www.imdb.com/title/tt0800369/", rating: 7.0, streaming: "Disney+" },
  { id: 5, title: "Captain America: The First Avenger", releaseDate: "2011-07-22", phase: 1, type: "Movie", chronologicalOrder: 5, poster: "https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America_The_First_Avenger_poster.jpg", synopsis: "Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a 'Super-Soldier serum'.", trailer: "https://www.youtube.com/watch?v=JerVrbLldXw", imdb: "https://www.imdb.com/title/tt0458339/", rating: 6.9, streaming: "Disney+" },
  { id: 6, title: "The Avengers", releaseDate: "2012-05-04", phase: 1, type: "Movie", chronologicalOrder: 6, poster: "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", synopsis: "Earth's mightiest heroes must come together and learn to fight as a team.", trailer: "https://www.youtube.com/watch?v=eOrNdBpGMv8", imdb: "https://www.imdb.com/title/tt0848228/", rating: 8.0, streaming: "Disney+" },

  // Phase Two (2013–2015)
  // ...existing code...
  { id: 7, title: "Iron Man 3", releaseDate: "2013-05-03", phase: 2, type: "Movie", chronologicalOrder: 7, poster: "https://m.media-amazon.com/images/M/MV5BMjIzMzAzMjQyM15BMl5BanBnXkFtZTcwNzM2NjcyOQ@@._V1_FMjpg_UX1000_.jpg" },
  { id: 8, title: "Thor: The Dark World", releaseDate: "2013-11-08", phase: 2, type: "Movie", chronologicalOrder: 8, poster: "https://upload.wikimedia.org/wikipedia/en/7/7f/Thor_The_Dark_World_poster.jpg" },
  { id: 9, title: "Captain America: The Winter Soldier", releaseDate: "2014-04-04", phase: 2, type: "Movie", chronologicalOrder: 9, poster: "https://m.media-amazon.com/images/M/MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc@._V1_.jpg" },
  { id: 10, title: "Guardians of the Galaxy", releaseDate: "2014-08-01", phase: 2, type: "Movie", chronologicalOrder: 10, poster: "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 11, title: "Avengers: Age of Ultron", releaseDate: "2015-05-01", phase: 2, type: "Movie", chronologicalOrder: 11, poster: "https://upload.wikimedia.org/wikipedia/en/f/ff/Avengers_Age_of_Ultron_poster.jpg" },
  { id: 12, title: "Ant-Man", releaseDate: "2015-07-17", phase: 2, type: "Movie", chronologicalOrder: 12, poster: "https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_.jpg" },

  // Phase Three (2016–2019)
  { id: 13, title: "Captain America: Civil War", releaseDate: "2016-05-06", phase: 3, type: "Movie", chronologicalOrder: 13, poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg" },
  { id: 14, title: "Doctor Strange", releaseDate: "2016-11-04", phase: 3, type: "Movie", chronologicalOrder: 14, poster: "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_FMjpg_UX1000_.jpg" },
  { id: 15, title: "Guardians of the Galaxy Vol. 2", releaseDate: "2017-05-05", phase: 3, type: "Movie", chronologicalOrder: 15, poster: "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 16, title: "Spider-Man: Homecoming", releaseDate: "2017-07-07", phase: 3, type: "Movie", chronologicalOrder: 16, poster: "https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Homecoming_poster.jpg" },
  { id: 17, title: "Thor: Ragnarok", releaseDate: "2017-11-03", phase: 3, type: "Movie", chronologicalOrder: 17, poster: "https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg" },
  { id: 18, title: "Black Panther", releaseDate: "2018-02-16", phase: 3, type: "Movie", chronologicalOrder: 18, poster: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_FMjpg_UX1000_.jpg" },
  { id: 19, title: "Avengers: Infinity War", releaseDate: "2018-04-27", phase: 3, type: "Movie", chronologicalOrder: 19, poster: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg" },
  { id: 20, title: "Ant-Man and the Wasp", releaseDate: "2018-07-06", phase: 3, type: "Movie", chronologicalOrder: 20, poster: "https://upload.wikimedia.org/wikipedia/en/2/2c/Ant-Man_and_the_Wasp_poster.jpg" },
  { id: 21, title: "Captain Marvel", releaseDate: "2019-03-08", phase: 3, type: "Movie", chronologicalOrder: 21, poster: "https://i.pinimg.com/1200x/55/e4/27/55e42784e3729523e78be581cc0f48ba.jpg" },
  { id: 22, title: "Avengers: Endgame", releaseDate: "2019-04-26", phase: 3, type: "Movie", chronologicalOrder: 22, poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" },
  { id: 23, title: "Spider-Man: Far From Home", releaseDate: "2019-07-02", phase: 3, type: "Movie", chronologicalOrder: 23, poster: "https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg" },

  // Phase Four (2021–2022)
  { id: 24, title: "Black Widow", releaseDate: "2021-07-09", phase: 4, type: "Movie", chronologicalOrder: 24, poster: "https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 25, title: "Shang-Chi and the Legend of the Ten Rings", releaseDate: "2021-09-03", phase: 4, type: "Movie", chronologicalOrder: 25, poster: "https://i.redd.it/tzhfn1ywo4u61.jpg" },
  { id: 26, title: "Eternals", releaseDate: "2021-11-05", phase: 4, type: "Movie", chronologicalOrder: 26, poster: "https://m.media-amazon.com/images/M/MV5BZTBiZjI2M2UtZTNiNy00NmU4LWJiMjYtZjk4MDIzMzhlMjFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 27, title: "Spider-Man: No Way Home", releaseDate: "2021-12-17", phase: 4, type: "Movie", chronologicalOrder: 27, poster: "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg" },
  { id: 28, title: "Doctor Strange in the Multiverse of Madness", releaseDate: "2022-05-06", phase: 4, type: "Movie", chronologicalOrder: 28, poster: "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg" },
  { id: 29, title: "Thor: Love and Thunder", releaseDate: "2022-07-08", phase: 4, type: "Movie", chronologicalOrder: 29, poster: "https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 30, title: "Black Panther: Wakanda Forever", releaseDate: "2022-11-11", phase: 4, type: "Movie", chronologicalOrder: 30, poster: "https://m.media-amazon.com/images/M/MV5BYWY5NDY1ZjItZDQxMy00MTAzLTgyOGQtNTQxYjFiMzZjMjUyXkEyXkFqcGc@._V1_.jpg" },

  // Phase Five (2023–2025)
  { id: 31, title: "Ant-Man and the Wasp: Quantumania", releaseDate: "2023-02-17", phase: 5, type: "Movie", chronologicalOrder: 31, poster: "https://upload.wikimedia.org/wikipedia/en/3/30/Ant-Man_and_the_Wasp_Quantumania_poster.jpg" },
  { id: 32, title: "Guardians of the Galaxy Vol. 3", releaseDate: "2023-05-05", phase: 5, type: "Movie", chronologicalOrder: 32, poster: "https://m.media-amazon.com/images/M/MV5BOTJhOTMxMmItZmE0Ny00MDc3LWEzOGEtOGFkMzY4MWYyZDQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 33, title: "The Marvels", releaseDate: "2023-11-10", phase: 5, type: "Movie", chronologicalOrder: 33, poster: "https://m.media-amazon.com/images/M/MV5BYzczOWM4MzItMWMyOS00ZDczLWIxMzctNzBmYTgzOTI1MzI3XkEyXkFqcGc@._V1_.jpg" },
  { id: 34, title: "Deadpool & Wolverine", releaseDate: "2024-07-26", phase: 5, type: "Movie", chronologicalOrder: 34, poster: "https://preview.redd.it/new-poster-for-deadpool-wolverine-v0-2hiz9d1qyk1d1.jpeg?width=1080&crop=smart&auto=webp&s=fdb10fc4e77e172ad969bd289f8ce6d50b274586" },
  { id: 35, title: "Captain America: Brave New World", releaseDate: "2025-02-14", phase: 5, type: "Movie", chronologicalOrder: 35, poster: "https://upload.wikimedia.org/wikipedia/en/a/a4/Captain_America_Brave_New_World_poster.jpg" },
  { id: 36, title: "Thunderbolts", releaseDate: "2025-05-02", phase: 5, type: "Movie", chronologicalOrder: 36, poster: "https://m.media-amazon.com/images/M/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc@._V1_.jpg" },

  // Phase Six (2025–2027)
  { id: 37, title: "The Fantastic Four: First Steps", releaseDate: "2025-07-25", phase: 6, type: "Movie", chronologicalOrder: 37, poster: "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 38, title: "Avengers: Doomsday", releaseDate: "2026-12-18", phase: 6, type: "Movie", chronologicalOrder: 38, poster: "https://m.media-amazon.com/images/M/MV5BMGNiN2RlZTMtMTkyZC00YjkwLTgyY2QtMDg1ZDNhODQwNWM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 39, title: "Avengers: Secret Wars", releaseDate: "2027-12-17", phase: 6, type: "Movie", chronologicalOrder: 39, poster: "https://m.media-amazon.com/images/M/MV5BYTQyZTQ5MWQtN2M4NC00YWQwLTg3ZTctM2JiZDE4NDBkZDJkXkEyXkFqcGc@._V1_.jpg" }
];

export default mcuData;
