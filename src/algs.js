import { paint, allowDiagonalMovements } from './App';

function neighbors(M, row, col) {
	let neighbors = [
		[row - 1, col],
		[row, col + 1],
		[row + 1, col],
		[row, col - 1],
	];
	if (allowDiagonalMovements) {
		neighbors = [
			[row - 1, col - 1],
			[row - 1, col + 1],
			[row + 1, col + 1],
			[row + 1, col - 1],
		].concat(neighbors);
	}
	const arr = [];
	for (const [row, col] of neighbors) {
		if (validate(M, row, col)) {
			arr.push([row, col]);
		}
	}
	return arr;
}

function validate(M, row, col) {
	return (
		0 <= row && row < M.length && 0 <= col && col < M[0].length && M[row][col]
	);
}

function pathify(pre, s, v, res) {
	if (s === v) {
		res.push(s);
	} else if (!pre[v]) {
		return;
	} else {
		res.push(v);
		pathify(pre, s, pre[v], res);
	}
	return res.reverse();
}

export async function BFS(M, row1, col1, row2, col2) {
	if (!validate(M, row1, col1) || !validate(M, row2, col2)) {
		return -1;
	}
	const src = [row1, col1];
	const des = [row2, col2];
	const queue = [src];
	M[row1][col1] = 0;
	const pre = {};
	pre[src] = null;

	const seen = new Set();
	while (queue.length > 0) {
		const u = queue.shift();
		const [row, col] = u;
		if (row === row2 && col === col2) {
			return pathify(pre, src, des, []);
		}
		seen.add(u);
		for (const v of neighbors(M, row, col)) {
			const [row, col] = v;
			await paint(v);
			if (!seen.has(v)) {
				M[row][col] = 0;
				pre[v] = u;
				queue.push(v);
			}
		}
	}
	return -1;
}

export function DFS(M, row1, col1, row2, col2) {
	if (!validate(M, row1, col1) || !validate(M, row2, col2)) {
		return -1;
	}
	const seen = new Set(),
		pre = {};
	const src = [row1, col1],
		des = [row2, col2];
	pre[src] = null;
	const _DFS = async function (u) {
		const [row, col] = u;
		if (row === row2 && col === col2) {
			return pathify(pre, src, des, []);
		}
		for (const w of neighbors(M, row, col)) {
			if (!seen.has(w)) {
				seen.add(w);
				await paint(w);
				M[row][col] = 0;
				pre[w] = u;
				const res = await _DFS(w);
				if (res !== -1) {
					return res;
				}
			}
		}
		return -1;
	};
	return _DFS(src);
}

export const algorithms = ['Breadth-first', 'Depth-first', 'A*'];
