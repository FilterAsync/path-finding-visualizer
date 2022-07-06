function MatrixCol({ value, row, col, source, dest, children, ...props }) {
	let role = value === 1 ? 'path' : 'obstacle';

	const isSource = row === source[0] && col === source[1];
	const isDest = row === dest[0] && col === dest[1];

	role += ' ';

	if (isSource) {
		role += 'source';
	} else if (isDest) {
		role += 'destination';
	}

	return (
		<span
			className={'matrix-col ' + role}
			id={value === 1 ? `${row},${col}` : undefined}
			{...props}
		>
			<div className="col-content">
				{row}
				<sub>{col}</sub>
			</div>
		</span>
	);
}

export default MatrixCol;
