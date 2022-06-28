import { useState } from 'react';
import { removeAllSpaces, strToCoord, isValidMatrixStr } from './util';
import BFS from './bfs';
import Matrix from './components/Matrix';

const defaultValues = {
	matrix: [
		[1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
		[1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
		[1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
	],
	source: [1, 3],
	dest: [1, 6],
};

function App() {
	const [matrix, setMatrix] = useState(defaultValues.matrix);
	const [source, setSource] = useState(defaultValues.source);
	const [dest, setDest] = useState(defaultValues.dest);

	const [error, setError] = useState('');

	const MatrixRepresentation = Matrix(matrix, source, dest);

	const onSubmit = (event) => {
		event.preventDefault();
		const [row1, col1] = source;
		const [row2, col2] = dest;
		let _matrix;
		if (typeof structuredClone === 'function') {
			_matrix = structuredClone(matrix);
		} else {
			_matrix = Object.assign([], matrix);
		}
		const shortestPath = BFS(_matrix, row1, col1, row2, col2);
		if (shortestPath === -1) {
			setError('Invalid source or destination.');
			return;
		}
		for (const [row, col] of shortestPath) {
			const entry = document.getElementById(`${row},${col}`);
			entry.style.backgroundColor = '#ebc634';
		}
		setError('');
	};

	const onMatrixChanged = (event) => {
		const str = removeAllSpaces(event.target.value);
		const validate = isValidMatrixStr(str);
		if (!validate) {
			setError('Invalid matrix representation.');
			return;
		}
		setError('');
		try {
			setMatrix(JSON.parse(str));
		} catch (err) {}
	};

	const onSourceChanged = (event) => {
		const str = removeAllSpaces(event.target.value);
		const coord = strToCoord(str);
		if (!coord) {
			setError('Invalid coordinates');
			return;
		}
		setError('');
		setSource(coord);
	};

	const onDestChanged = (event) => {
		const str = removeAllSpaces(event.target.value);
		const coord = strToCoord(str);
		if (!coord) {
			setError('Invalid coordinates');
			return;
		}
		setError('');
		setDest(coord);
	};

	return (
		<>
			<div className="flex-container center">
				<div>
					<h2>Matrix Representation</h2>
					<MatrixRepresentation />
				</div>
				<div>
					<h2>Matrix Controller</h2>
					<form onSubmit={onSubmit}>
						<div>
							<label htmlFor="matrix">Matrix:</label>
							<br />
							<textarea
								name="matrix"
								defaultValue={`[[1,0,1,0,1,0,1,1,1,0,0],[0,0,1,1,1,0,1,0,1,1,0],[1,0,1,0,1,0,0,0,1,1,0],[1,0,1,0,1,1,1,1,1,0,0],[1,0,1,0,0,0,0,0,0,0,1]]`}
								onChange={onMatrixChanged}
							/>
							<p>
								Put <code>0</code> for obstacle, and <code>1</code> for path.
							</p>
							<p>Path movements are up, down, left, right</p>
						</div>
						<div>
							<label htmlFor="source">Source:</label>
							<input type="text" name="source" defaultValue="(1,3)" onChange={onSourceChanged} />
						</div>
						<br />
						<div>
							<label htmlFor="destination">Destination:</label>
							<input type="text" name="destination" defaultValue="(1,6)" onChange={onDestChanged} />
						</div>
						<p>
							Coordinates must be in the form (<i>x</i>, <i>y</i>).
						</p>
						<p hidden={!error} className="errorMessage">
							{error}
						</p>
						<div className="button-list-row">
							<button type="submit" disabled={!!error}>
								Perform BFS
							</button>
						</div>
					</form>
				</div>
			</div>
			<hr />
		</>
	);
}

export default App;
