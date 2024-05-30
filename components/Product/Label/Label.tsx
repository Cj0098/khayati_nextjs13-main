import React from "react";

// Utils
import formatNumber from "utils/formatNumber";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Types
type Props = {
	productPrice: number | undefined;
};

const Label = (props: Props) => {
	const { productPrice } = props;
	const appTelephoneNumber = process.env.NEXT_PUBLIC_APP_TELEPHONE_NUMBER;

	if (productPrice === undefined) {
		return <Skeleton width="100%" height="4rem" />;
	}

	return (
		<div className="p-4 text-lg rounded-xl bg-sky-500">
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/* ——— <Price> ——— */}
				<div>
					<span className="font-medium text-white">
						قیمت : {formatNumber(productPrice)} تومان
					</span>
				</div>

				<div className="text-center font-medium text-white">
					<div>
						<span>تماس بگیرید</span>
					</div>
					<div dir="rtl" className="flex">
						{appTelephoneNumber}
						<br />
						۰۹۳۳۱۰۲۸۶۰۶
					</div>
				</div>
			</div>
		</div>
	);
};

export default Label;
