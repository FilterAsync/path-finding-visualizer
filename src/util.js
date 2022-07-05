export function removeAllSpaces(str) {
	if (typeof str !== 'string') {
		return '';
	}
	return str.trim();
}

export function getRandomEntry(arr) {
	return arr[0 | (Math.random() * arr.length)];
}

export function strToCoord(str) {
	if (typeof str !== 'string') {
		return false;
	}
	if (str[0] !== '(' || str[str.length - 1] !== ')') {
		return false;
	}
	const separatorIdx = str.indexOf(',');
	if (separatorIdx === -1) {
		return false;
	}
	const _x = str.substring(1, separatorIdx);
	const _y = str.substring(1 + separatorIdx, str.length - 1);
	const x = Number.parseInt(_x, 10);
	const y = Number.parseInt(_y, 10);
	switch (true) {
		case x < 0 || y < 0 || Number.isNaN(x) || Number.isNaN(y):
		case !(Number.isInteger(x) && Number.isInteger(y)):
		case _x.includes('.') || _y.includes('.'):
		case _x !== x.toString() || _y !== y.toString(): // exclude 1f, 0b0, 2z, etc
			return false;
		default:
			break;
	}
	return [x, y];
}

export function isValidMatrixStr(str) {
	if (typeof str !== 'string') {
		return false;
	}
	if (str[0] !== '[' || str[str.length - 1] !== ']') {
		return false;
	}
	let _str = str.substring(1);
	while (_str) {
		const openBracketIdx = _str.indexOf('[');
		if (openBracketIdx === -1) {
			return false;
		}
		const closeBracketIdx = _str.indexOf(']');
		let charStartIdx = openBracketIdx;
		for (let i = openBracketIdx + 1; i <= closeBracketIdx - 1; i++) {
			const char = _str[i];
			switch (true) {
				case i - charStartIdx !== 1 && char !== ',':
				case i - charStartIdx === 1 && char === ',':
				case Number.isNaN(+char) && char !== ',':
				case char !== ',' && +char !== 0 && +char !== 1:
					return false;
				case char === ',':
					charStartIdx = i;
					break;
				default:
					break;
			}
		}
		if (_str[closeBracketIdx + 1] === ']' && closeBracketIdx + 2 === _str.length) {
			break;
		}
		if (_str[closeBracketIdx + 1] !== ',') {
			return false;
		}
		_str = _str.substring(closeBracketIdx + 2);
	}
	return true;
}

export function matrixToStr(matrix) {
	let str = '';
	for (let i = 0; i < matrix.length; i++) {
		let row = matrix[i];
		row = '[' + row + ']';
		if (i !== matrix.length - 1) {
			row += ',';
		}
		str += row;
	}
	return '[' + str + ']';
}

// haha typescript die

export function arrToCoordStr(arr) {
	return '(' + arr + ')';
}

// uuid

function FillRandomBytes(buffer, size) {
	for (let i = 0; i < size; ++i) {
		buffer[i] = (Math.random() * 0xff) | 0;
	}
	return buffer;
}

function GenRandomBytes(size) {
	if (typeof Uint8Array !== 'undefined') {
		if (typeof crypto !== 'undefined') {
			return crypto.getRandomValues(new Uint8Array(size));
		}
		return FillRandomBytes(new Uint8Array(size), size);
	}
	return FillRandomBytes(new Array(size), size);
}

export function CreateUUID() {
	const data = GenRandomBytes(16);

	data[6] = 0x40 | (data[6] & 0xf);
	data[8] = 0x80 | (data[8] & 0x3f);

	let result = '';
	const hyphenBlocks = [4, 6, 8, 10];

	for (let offset = 0; offset < 16; ++offset) {
		const byte = data[offset];
		if (hyphenBlocks.includes(offset)) {
			result += '-';
		}
		if (byte < 16) {
			result += '0';
		}
		result += byte.toString(16).toLowerCase();
	}

	return result;
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Memoize result of the function invocation in the cache object for
// later retrieval in subsequent function invocations with the same arguments.
// This is useful for doing expensive calculations multiple times.
export function memo(f) {
	const cache = new Map();
	const wrapper = function (...args) {
		const key = args.toString();
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = f.apply(this, args);
		cache.set(key, result);
		return result;
	};
	return wrapper;
}
