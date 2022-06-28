function neighbors(M, row, col) {
	const neighbors = [
		[row - 1, col],
		[row + 1, col],
		[row, col - 1],
		[row, col + 1],
	];
	const arr = [];
	for (const [r, c] of neighbors) {
		if (validate(M, r, c)) {
			arr.push([r, c]);
		}
	}
	return arr;
}

function validate(M, row, col) {
	return 0 <= row && row < M.length && 0 <= col && col < M[0].length && M[row][col];
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
	return res;
}

export default function BFS(M, row1, col1, row2, col2) {
	if (!M[row1] || !M[row1][col1] || !M[row2] || !M[row2][col2]) {
		return -1;
	}
	const src = [row1, col1];
	const des = [row2, col2];
	const queue = [src];
	M[row1][col1] = 0;
	const pre = {};
	pre[src] = 0;
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
			if (!seen.has(v)) {
				M[row][col] = 0;
				pre[v] = u;
				queue.push(v);
			}
		}
	}
	return -1;
}
