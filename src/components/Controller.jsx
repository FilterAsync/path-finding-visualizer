import { matrixToStr, arrToCoordStr } from '../util';
import InputField from './InputField';

export function Controller(
	{ matrix, source, dest, error },
	{ onSubmit, onMatrixChanged, onSourceChanged, onDestChanged },
) {
	return (props) => (
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
			<div>
				<label htmlFor="destination">Destination:</label>
				<input
					type="text"
					name="destination"
					defaultValue={arrToCoordStr(dest)}
					onChange={onDestChanged}
				/>
			</div>
			<p>
				Coordinates must be in the form (<i>x</i>, <i>y</i>).
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
