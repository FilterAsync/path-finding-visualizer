function ButtonListRow({ children, ...props }) {
	return (
		<div className="button-list-row" {...props}>
			{children}
		</div>
	);
}

export default ButtonListRow;
