import React, { useContext } from 'react';
import MatrixContext from '../MatrixContext';
import { CreateUUID } from '../util';

const Matrix = React.memo(
	({ error, ...props }) => {
		const { matrix, source, dest } = useContext(MatrixContext);
		return (
			<div className="matrix" {...props}>
				{matrix.map((_row, i1) => {
					const row = (
						<div key={`row-${i1}`} className="matrix-row">
							{_row.map((col, i2) => {
								const role = col === 1 ? 'path' : 'obstacle';
								const isSource = i1 === source[0] && i2 === source[1] ? 'source' : '';
								const isDes = i1 === dest[0] && i2 === dest[1] ? 'destination' : '';
								return (
									<span
										key={CreateUUID() + `:${i1}${i2}`}
										id={col === 1 ? `${i1},${i2}` : undefined}
										className={'matrix-col ' + role + ' ' + (isSource || isDes)}
									>
										<div className="col-content">
											{i1}
											<sub>{i2}</sub>
										</div>
									</span>
								);
							})}
						</div>
					);
					return row;
				})}
			</div>
		);
	},
	(_prevProps, nextProps) => !!nextProps.error,
);

export default Matrix;
