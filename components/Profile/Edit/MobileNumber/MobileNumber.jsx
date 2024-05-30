import { useState } from "react";

// Components
import Input from "../Input/Input";

// Utils
import formatMobileNumber from "../../../../utils/formatMobileNumber";

// Icons
import { FaLock } from "react-icons/fa";

const MobileNumber = (props) => {
	const [mobileNumber, setMobileNumber] = useState(props.mobileNumber || "");
	const mobileNumberFormatted = formatMobileNumber(mobileNumber);

	return (
		<Input title="شماره همراه" ltr>
			<div>
				<input
					type="tel"
					value={mobileNumberFormatted}
					readOnly
					className="block w-full p-2 text-lg bg-transparent opacity-70"
				/>
			</div>
		</Input>
	);
};

export default MobileNumber;
