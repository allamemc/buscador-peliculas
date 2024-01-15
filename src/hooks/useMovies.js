import { useState, useRef, useMemo } from 'react';
import { searchMovies } from '../service/movies';
export function useMovies({ search, sort }) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const previousSearch = useRef(search);

	const getMovies = async () => {
		if (previousSearch.current === search) {
			return;
		}
		try {
			setLoading(true);
			setError(null);
			previousSearch.current = search;
			const newMovies = await searchMovies({ search });
			setMovies(newMovies);
			setLoading(false);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const sortedMovies = useMemo(() => {
		return sort
			? [...movies].sort((a, b) => a.title.localeCompare(b.title))
			: movies;
	}, [sort, movies]);

	return { movies: sortedMovies, loading, getMovies };
}
