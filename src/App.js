import { useEffect, useState } from 'react';
import { removeAllSpaces, strToCoord, isValidMatrixStr, getRandomEntry } from './util';
import { BFS, DFS, algorithms } from './algs';
import Matrix from './components/Matrix';
import Controller from './components/Controller';
import matrices from './matrices.json';
import MatrixContext from './MatrixContext';
import { wait, memo } from './util';

const randomMatrix = getRandomEntry(matrices);

// TODO add more algorithms
const algorithmMap = {
	'Breadth-first': memo(BFS),
	'Depth-first': memo(DFS),
};

const errors = {
	invalidMatrix: 'Invalid matrix representation.',
	invalidSrcOrDest: 'Invalid source or destination.',
	invalidCoords: 'Invalid coordinates.',
};

// this is a bug on the `onSubmit` event
// where the previous path is still processing
// even after the state has been updated
let update = false;

function App() {
	const [matrix, setMatrix] = useState(randomMatrix.matrix);
	const [source, setSource] = useState(randomMatrix.source);
	const [dest, setDest] = useState(randomMatrix.dest);

	const [error, setError] = useState('');

	const [speed, setSpeed] = useState(10);

	const [algorithm, setAlgorithm] = useState(algorithms[0]);

	useEffect(() => {
		// when one of the inputs changes, we need to update the state
		update = true;
	}, [matrix, source, dest, error, speed, algorithm]);

	const onSubmit = async (event) => {
		console.log(update);
		event.preventDefault();
		// it's already being processed, don't bother trying to reprocess
		if (!update) {
			return;
		}
		// update the state the next time around to prevent it from being processed again
		update = false;
		const [row1, col1] = source;
		const [row2, col2] = dest;
		let _matrix;
		if (typeof structuredClone === 'function') {
			_matrix = structuredClone(matrix);
		} else {
			_matrix = Object.assign([], matrix);
		}

		const pathFinder = algorithmMap[algorithm];
		const path = pathFinder(_matrix, row1, col1, row2, col2);
		if (path === -1) {
			setError(errors.invalidSrcOrDest);
			return;
		}
		// a bug where the path starts with the destination and ends with the source
		if (path[0][0] === dest[0] && path[0][1] === dest[1]) {
			path.reverse();
		}
		for (const [row, col] of path) {
			// if it's up-to-date, then we're done with the current running path
			if (update) {
				break;
			}
			const entry = document.getElementById(`${row},${col}`);
			if (speed > 0) {
				await wait(speed);
			}
			entry.style.backgroundColor = '#ebc634';
		}
	};

	const onMatrixChanged = (event) => {
		const str = removeAllSpaces(event.target.value);
		const validate = isValidMatrixStr(str);
		if (!validate) {
			setError(errors.invalidMatrix);
			return;
		}
		if (error === errors.invalidMatrix) {
			setError('');
		}
		try {
			setMatrix(JSON.parse(str));
		} catch (err) {}
	};

	const changeCoords = (value) => {
		const str = removeAllSpaces(value);
		const coord = strToCoord(str);
		if (!coord) {
			setError(errors.invalidCoords);
			return;
		}
		if (error === errors.invalidCoords) {
			setError('');
		}
		return coord;
	};

	const onSourceChanged = (event) => {
		const coord = changeCoords(event.target.value);
		if (coord) {
			setSource(coord);
		}
	};

	const onDestChanged = (event) => {
		const coord = changeCoords(event.target.value);
		if (coord) {
			setDest(coord);
		}
	};

	const onSpeedChanged = (event) => {
		setSpeed(+event.target.value);
	};

	const onAlgorithmChanged = (event) => {
		setAlgorithm(event.target.value);
	};

	const events = {
		onSubmit,
		onMatrixChanged,
		onSourceChanged,
		onDestChanged,
		onSpeedChanged,
		onAlgorithmChanged,
	};

	return (
		<MatrixContext.Provider
			value={{
				matrix,
				source,
				dest,
			}}
		>
			<Controller {...{ error, ...events }} />
			<div className="center">
				<Matrix error={!!error} />
			</div>
		</MatrixContext.Provider>
	);
}

export default App;
