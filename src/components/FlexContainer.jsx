function FlexContainer({ children, ...props }) {
	return (
		<div className="flex-container" {...props}>
			{children}
		</div>
	);
}

export default FlexContainer;
