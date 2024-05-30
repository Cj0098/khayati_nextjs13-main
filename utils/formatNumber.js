const formatNumber = (number) => {
	return String(number).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export default formatNumber;
