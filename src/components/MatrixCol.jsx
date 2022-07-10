function MatrixCol({ value, row, col, source, dest, children, ...props }) {
	let role = value === 0 ? 'obstacle' : 'path';

	const isSource = row === source[0] && col === source[1];
	const isDest = row === dest[0] && col === dest[1];

	role += ' ';

	if (isSource) {
		role += 'source';
	} else if (isDest) {
		role += 'destination';
	}

	let cost;

	if (value !== 0 && value !== 1) {
		cost = <div className="col-cost">{value}</div>;
	}

	return (
		<div
			className={'matrix-col ' + role}
			id={value === 1 ? `${row},${col}` : undefined}
			{...props}
		>
			{row}
			<sub>{col}</sub>
			{cost}
		</div>
	);
}

export default MatrixCol;
