import { useContext } from 'react';
import MatrixContext from '../MatrixContext';
import { matrixToStr, arrToCoordStr } from '../util';
import { InputField, DropdownField } from './InputField';
import { algorithms } from '../algs';

function Controller({
	error,
	onSubmit,
	onMatrixChanged,
	onSourceChanged,
	onDestChanged,
	onSpeedChanged,
	onAlgorithmChanged,
	onReload,
	...props
}) {
	const { matrix, source, dest } = useContext(MatrixContext);
	return (
		<form className="matrix-controller" onSubmit={onSubmit} {...props}>
			<InputField
				id="matrix-input"
				label="Matrix:"
				textarea={true}
				defaultValue={matrixToStr(matrix)}
				onChange={onMatrixChanged}
			/>
			<InputField
				id="source"
				label="Source:"
				type="text"
				defaultValue={arrToCoordStr(source)}
				onChange={onSourceChanged}
			/>
			<InputField
				id="destination"
				label="Destination:"
				type="text"
				defaultValue={arrToCoordStr(dest)}
				onChange={onDestChanged}
			/>
			<InputField
				id="speed"
				label="Speed (ms):"
				type="number"
				min={0}
				defaultValue={10}
				onChange={onSpeedChanged}
			/>
			<DropdownField id="algorithm" label="Algorithm:" onChange={onAlgorithmChanged}>
				{algorithms.map((algo) => (
					<option value={algo} key={algo}>
						{algo}
					</option>
				))}
			</DropdownField>
			<p hidden={!error} className="error-message">
				{error}
			</p>
			<div className="button-list-row">
				<button type="submit" disabled={!!error}>
					Perform
				</button>
				<button type="button" onClick={onReload}>
					Clear
				</button>
			</div>
		</form>
	);
}

export default Controller;
