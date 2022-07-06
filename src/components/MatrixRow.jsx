function MatrixRow({ children, ...props }) {
	return (
		<div className="matrix-row" {...props}>
			{children}
		</div>
	);
}

export default MatrixRow;
