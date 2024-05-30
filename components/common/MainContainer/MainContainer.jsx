const MainContainer = ({ children }) => {
	return (
		<main>
			<div className="py-12 sm:py-20">
				<div className="container">
					{/*  */}
					{children}
				</div>
			</div>
		</main>
	);
};
export default MainContainer;
