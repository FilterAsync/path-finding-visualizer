import { useEffect, useReducer, useRef } from 'react';
import { strToCoord, isValidMatrixStr, getRandomEntry } from './util';
import { BFS, DFS, algorithms } from './algs';
import Matrix from './components/Matrix';
import Controller from './components/Controller';
import matrices from './matrices.json';
import MatrixContext from './MatrixContext';
import { wait } from './util';

const randomMatrix = getRandomEntry(matrices);

// TODO add more algorithms
const algorithmMap = {
	'Breadth-first': BFS,
	'Depth-first': DFS,
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

const reducer = function (state, action) {
	return {
		...state,
		[action.type]: action.data,
	};
};

// we export this here because it varies depending upon the value of update and speed
export async function paint([row, col]) {
	if (update) {
		return;
	}
	const block = document.getElementById(`${row},${col}`);
	await wait(paintSpeed);
	block.classList.add('visualized');
	return true;
}

let paintSpeed = 10;

export let allowDiagonalMovements = false;

function App() {
	const [states, dispatch] = useReducer(reducer, {
		...randomMatrix,
		error: '',
		speed: 10,
		algorithm: algorithms[0],
		reload: false,
	});

	const matrixRef = useRef(null);

	const { matrix, source, dest, error, speed, algorithm, reload } = states;

	// when one of the inputs changes, we need to update the state
	useEffect(() => {
		update = true;
		paintSpeed = speed;
	}, [matrix, source, dest, error, speed, algorithm, reload]); // dependency list must be an array literal

	const onSubmit = async (event) => {
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

		matrixRef.current.scrollIntoView();

		const pathFinder = algorithmMap[algorithm];
		const path = await pathFinder(_matrix, row1, col1, row2, col2);

		if (path === -1) {
			dispatch({
				type: 'error',
				data: errors.invalidSrcOrDest,
			});
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
			entry.classList.add('path-vertex');
		}
	};

	const onMatrixChanged = (event) => {
		const str = event.target.value.trimEnd();
		const validate = isValidMatrixStr(str);
		if (!validate) {
			dispatch({
				type: 'error',
				data: errors.invalidMatrix,
			});
			return;
		}
		if (error === errors.invalidMatrix) {
			dispatch({
				type: 'error',
				data: '',
			});
		}
		try {
			dispatch({
				type: 'matrix',
				data: JSON.parse(str),
			});
		} catch (err) {}
	};

	const changeCoords = (value) => {
		const str = value.trimEnd();
		const coord = strToCoord(str);
		if (!coord) {
			dispatch({
				type: 'error',
				data: errors.invalidCoords,
			});
			return;
		}
		if (error === errors.invalidCoords || error === errors.invalidSrcOrDest) {
			dispatch({
				type: 'error',
				data: '',
			});
		}
		return coord;
	};

	const onSourceChanged = (event) => {
		const coord = changeCoords(event.target.value);
		if (coord) {
			dispatch({
				type: 'source',
				data: coord,
			});
		}
	};

	const onDestChanged = (event) => {
		const coord = changeCoords(event.target.value);
		if (coord) {
			dispatch({
				type: 'dest',
				data: coord,
			});
		}
	};

	const onSpeedChanged = (event) =>
		dispatch({
			type: 'speed',
			data: +event.target.value,
		});

	const onAlgorithmChanged = (event) =>
		dispatch({
			type: 'algorithm',
			data: event.target.value,
		});

	const onReload = () => dispatch({ type: 'reload', data: !reload });

	const onAllowDiagonalMovements = (event) => {
		allowDiagonalMovements = event.target.checked;
		dispatch({ type: 'reload', data: !reload });
	};

	const events = {
		onSubmit,
		onMatrixChanged,
		onSourceChanged,
		onDestChanged,
		onSpeedChanged,
		onAlgorithmChanged,
		onAllowDiagonalMovements,
		onReload,
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
				<Matrix error={!!error} ref={matrixRef} />
			</div>
		</MatrixContext.Provider>
	);
}

export default App;
