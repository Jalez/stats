/** @format */

const getUniformDistribution = (
	distribution: number,
	data: number[],
	barNames: string[],
	scores: number[]
) => {
	const dataCount = data.length;
	const dataPerBar = Math.floor(dataCount / distribution);
	const barsData: { [key: string]: number[] } = {};

	for (let i = 0; i < distribution; i++) {
		const barName = barNames[i];
		const startIndex = i * dataPerBar;
		let endIndex = (i + 1) * dataPerBar;
		// if its the last bar, add the remaining students
		if (i === distribution - 1) {
			endIndex = dataCount;
		}

		barsData[barName] = scores.slice(startIndex, endIndex);
	}

	return barsData;
};

export default getUniformDistribution;
