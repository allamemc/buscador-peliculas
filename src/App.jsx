import { useState } from 'react';
import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
	const [sort, setSort] = useState(false);
	const { search, setSearch, error } = useSearch();
	const { movies, loading, getMovies } = useMovies({ search, sort });

	const handleSubmit = (event) => {
		event.preventDefault();
		getMovies();
	};

	const handleSort = () => {
		setSort(!sort);
	};

	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	return (
		<div className='page'>
			<header>
				<h1>Buscador de Películas</h1>
				<form className='form' onSubmit={handleSubmit}>
					<input
						onChange={handleChange}
						name='query'
						value={search}
						placeholder='Avengers, Star Wars'
						style={{
							border: '1px solid transparent',
							borderColor: error ? 'red' : 'transparent',
						}}
					/>
					<input type='checkbox' onChange={handleSort} checked={sort} />
					<button type='submit'>Buscar</button>
				</form>
				{error && (
					<p
						style={{
							color: 'red',
						}}>
						{error}
					</p>
				)}
			</header>

			<main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
		</div>
	);
}

export default App;
