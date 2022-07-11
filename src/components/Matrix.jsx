import React, { useContext } from 'react';
import MatrixContext from '../MatrixContext';
import { CreateUUID } from '../util';
import { MatrixCol, MatrixRow } from './components';

// eslint-disable-next-line no-unused-vars
const Matrix = React.forwardRef(function Matrix({ error, ...props }, ref) {
	const { matrix, source, dest } = useContext(MatrixContext);
	return (
		<div id="matrix" {...props} ref={ref}>
			{matrix.map((row, i1) => (
				<MatrixRow key={'row-' + i1}>
					{row.map((col, i2) => (
						<MatrixCol
							key={'col-' + CreateUUID() + `:${i1}${i2}`}
							value={col}
							row={i1}
							col={i2}
							source={source}
							dest={dest}
						/>
					))}
				</MatrixRow>
			))}
		</div>
	);
});

const areEqual = (_prevProps, nextProps) => !!nextProps.error;

export default React.memo(Matrix, areEqual);
