import Link from "components/common/Link/Link";

// Context
import { useContext } from "react";
import TokenContext from "../../../context/token/TokenContext";

// Hooks
import useUserQuery from "../../../hooks/useUserQuery";

// Libraries
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

// Icons
import { BsFillChatLeftTextFill } from "react-icons/bs";

const HeaderMenu = () => {
	const { token: loggedInUserToken } = useContext(TokenContext);
	const MenuOptionsIncommonClasses =
		"px-3 py-1 duration-200 lg:px-6 lg:py-3 rounded-2xl shadow-bsPrimary";

	const copyToClipboard = (text) => {
		try {
			navigator.clipboard.writeText(text);
			toast.success("شماره دانشجویی کپی شد");
		} catch (e) {
			toast.success("متاسفانه کپی نشد");
		}
	};

	const user = useUserQuery();

	return (
		<div className="flex">
			<div className="hidden lg:block">
				<div className="ml-4 flex items-center " dir="ltr">
					<div className="inner mr-1"></div>
					۰۲۶-۳۴۶۱۲۵۳۲
					<hr />
				</div>
				<div className="ml-4 flex items-center" dir="ltr">
					<div className="inner  mr-1"></div>
					026-34612248
					<hr />
				</div>
			</div>
			{!loggedInUserToken && (
				<Link
					href="/authentication"
					className={`${MenuOptionsIncommonClasses}
					block text-primary hover:text-white hover:bg-primary`}
				>
					ثبت نام در کلاس
				</Link>
			)}
			{loggedInUserToken && (
				<div className="flex flex-wrap gap-4">
					{/* <Student Number> */}
					<button
						disabled={user.isLoading}
						onClick={() => copyToClipboard(`${user.data.id}`)}
						className={`${MenuOptionsIncommonClasses}
						text-primary hover:text-white hover:bg-primary flex-center`}
					>
						{user.isLoading ? (
							<span>
								<ClipLoader
									size={18}
									cssOverride={{ display: "block", opacity: "0.5" }}
								/>
							</span>
						) : (
							<span>{`شماره دانشجویی : ${user.data.id}`}</span>
						)}
					</button>
					{/* </Student Number */}

					{/* < ——— Chat ——— > */}
					<Link
						href="/chat"
						className={`${MenuOptionsIncommonClasses}
						text-primary hover:text-white hover:bg-primary flex-center`}
					>
						<i className="text-xl">
							<BsFillChatLeftTextFill />
						</i>
					</Link>

					{/* < ——— Profile ——— > */}
					<Link
						href="/profile"
						className={`${MenuOptionsIncommonClasses}
						text-primary hover:text-white hover:bg-primary`}
					>
						پروفایل
					</Link>

					{/* < ——— Logout ———> */}
					<Link
						href="/logout"
						className={`${MenuOptionsIncommonClasses}
						text-red-500 hover:text-white hover:bg-red-500`}
					>
						خروج
					</Link>
				</div>
			)}
		</div>
	);
};

export default HeaderMenu;
