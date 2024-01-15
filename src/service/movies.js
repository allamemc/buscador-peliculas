const API_KEY = import.meta.env.VITE_API_KEY;

export const searchMovies = async ({ search }) => {
	const API = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;

	if (search === '') {
		return null;
	}

	try {
		const response = await fetch(API);
		const data = await response.json();

		const movies = data.Search;

		return movies?.map((movie) => ({
			id: movie.imdbID,
			title: movie.Title,
			year: movie.Year,
			poster: movie.Poster,
		}));
	} catch (error) {
		throw new Error(error);
	}
};
