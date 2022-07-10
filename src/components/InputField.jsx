export function InputField({ label, textarea, id, children, ...props }) {
	let input = <input id={id} {...props} />;
	if (textarea) {
		input = <textarea id={id} {...props} />;
	}

	return (
		<div className="input-field">
			<label htmlFor={id}>{label}</label>
			{input}
			{children}
		</div>
	);
}

export function DropdownField({ label, id, children, ...props }) {
	return (
		<div className="input-field">
			<label htmlFor={id}>{label}</label>
			<select id={id} {...props}>
				{children}
			</select>
		</div>
	);
}

export function CheckboxField({ label, id, children, ...props }) {
	return (
		<div className="input-field checkbox-field">
			<label htmlFor={id}>{label}</label>
			<input type="checkbox" id={id} {...props} />
		</div>
	);
}
