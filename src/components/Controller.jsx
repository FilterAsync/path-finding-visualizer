import { useContext } from 'react';
import MatrixContext from '../MatrixContext';
import { matrixToStr, arrToCoordStr } from '../util';
import InputField from './InputField';

function Controller({
	error,
	onSubmit,
	onMatrixChanged,
	onSourceChanged,
	onDestChanged,
	...props
}) {
	const { matrix, source, dest } = useContext(MatrixContext);
	return (
		<form onSubmit={onSubmit} {...props}>
			<InputField
				name="matrix"
				label="Matrix:"
				textarea={true}
				defaultValue={matrixToStr(matrix)}
				onChange={onMatrixChanged}
			>
				<p>
					Put <code>0</code> for obstacle, and <code>1</code> for path.
				</p>
				<p>
					<b>Note:</b> Path movements are up, down, left, right.
				</p>
			</InputField>
			<InputField
				name="source"
				label="Source:"
				type="text"
				defaultValue={arrToCoordStr(source)}
				onChange={onSourceChanged}
			/>
			<InputField
				name="destination"
				label="Destination:"
				type="text"
				defaultValue={arrToCoordStr(dest)}
				onChange={onDestChanged}
			/>
			<p>
				<b>Note:</b> Coordinates must be of the form (<i>x</i>, <i>y</i>).
			</p>
			<p hidden={!error} className="error-message">
				{error}
			</p>
			<div className="button-list-row">
				<button type="submit" disabled={!!error}>
					Perform BFS
				</button>
			</div>
		</form>
	);
}

export default Controller;
