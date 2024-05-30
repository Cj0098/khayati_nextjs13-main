const Input = ({ title = "", ltr = false, children }) => {
	return (
		<div>
			<div className="mb-px">
				<span className="text-sm">{title} :</span>
			</div>
			<div
				dir={ltr ? "ltr" : "rtl"}
				className="bg-[#D9D9D9] grid rounded-xl "
				style={{ gridTemplateColumns: "minmax(1px, 1fr) min-content" }}
			>
				{children}
			</div>
		</div>
	);
};

export default Input;
