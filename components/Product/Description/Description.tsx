import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Space from "components/common/Space/Space";

// Types
type Props = {
	productName: string | undefined;
	productDescription: string | undefined;
};

const Description = (props: Props) => {
	const { productName, productDescription } = props;

	if (productName === undefined || productDescription === undefined) {
		return (
			<div>
				{/* <Product Name Skeleton> */}
				<div>
					<Skeleton width="15rem" height="2rem" />
				</div>

				<Space height="2rem" />

				{/* <Product Description Skeleton> */}
				<div className="flex flex-col gap-2">
					<Skeleton width="100%" height="1rem" />
					<Skeleton width="100%" height="1rem" />
					<Skeleton width="100%" height="1rem" />
					<Skeleton width="70%" height="1rem" />
				</div>
			</div>
		);
	}

	return (
		<div className="text-center sm:text-start">
			{/* ——— <Name> ——— */}
			<div className="mb-4">
				<h1 className="text-xl font-medium sm:text-2xl">{productName}</h1>
			</div>

			{/* ——— <Content> ——— */}
			<div>
				<div dangerouslySetInnerHTML={{ __html: productDescription }}></div>
			</div>
		</div>
	);
};

export default Description;
