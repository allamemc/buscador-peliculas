import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
	const { search, setSearch, error } = useSearch();
	const { movies, loading, getMovies } = useMovies({ search });

	const handleSubmit = (event) => {
		event.preventDefault();
		getMovies();
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
