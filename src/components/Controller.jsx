import { useContext } from 'react';
import MatrixContext from '../MatrixContext';
import { matrixToStr, arrToCoordStr } from '../util';
import { InputField, DropdownField, CheckboxField } from './InputField';
import { algorithms } from '../algs';
import FlexContainer from './FlexContainer';
import ButtonListRow from './ButtonListRow';

function Controller({
	error,
	onSubmit,
	onMatrixChanged,
	onSourceChanged,
	onDestChanged,
	onSpeedChanged,
	onAlgorithmChanged,
	onReload,
	onAllowDiagonalMovements,
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
			<DropdownField
				id="algorithm"
				label="Algorithm:"
				onChange={onAlgorithmChanged}
			>
				{algorithms.map((algo) => (
					<option value={algo} key={algo}>
						{algo}
					</option>
				))}
			</DropdownField>
			<FlexContainer id="form-flex-container">
				<CheckboxField
					id="allow-diagonal-movements"
					label="Diagonal Movements:"
					onChange={onAllowDiagonalMovements}
				/>
				<p hidden={!error} id="error-message">
					{error}
				</p>
				<ButtonListRow>
					<button type="submit" disabled={!!error}>
						Perform
					</button>
					<button type="button" onClick={onReload}>
						Clear
					</button>
				</ButtonListRow>
			</FlexContainer>
		</form>
	);
}

export default Controller;
