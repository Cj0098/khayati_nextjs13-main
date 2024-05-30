import Link from "components/common/Link/Link";

// Hooks
import useUserQuery from "hooks/useUserQuery";

// Utils
import formatMobileNumber from "utils/formatMobileNumber";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Icons
import { IoIosArrowBack } from "react-icons/io";

// CSS
import style from "./Aside.module.scss";

const AsideOption = ({ url = "", color = "", image = "", title = "" }) => {
	return (
		<li className={`${style.AsideOption}`}>
			<Link href={url} className="flex items-center gap-2 py-2 duration-200 hover:bg-white">
				<div>
					<div className="p-1 rounded-full flex-center" style={{ background: color }}>
						<LazyLoadImage src={image} alt={title} className="w-8" />
					</div>
				</div>
				<div>
					<span className="font-medium">{title}</span>
				</div>
				<div className="mr-auto">
					<i>
						<IoIosArrowBack />
					</i>
				</div>
			</Link>
		</li>
	);
};

const Aside = (props) => {
	const user = useUserQuery();

	return (
		<div className="flex flex-col gap-4">
			{/* Top Part */}
			<div className="bg-[#C5D3F9] rounded-2xl flex gap-2 p-2 overflow-hidden">
				{user.isLoading && (
					<>
						<div>
							<Skeleton width="65px" height="65px" borderRadius="100%" />
						</div>
						<div className="flex flex-col justify-center gap-2">
							<Skeleton width="125px" height="16px" />
							<Skeleton width="125px" height="16px" />
						</div>
					</>
				)}

				{!user.isLoading && (
					<>
						<div>
							<LazyLoadImage
								src={user.data.avatar || "/images/user.png"}
								alt="آواتار"
								className="rounded-full w-14 max-w-none"
							/>
						</div>
						<div className="flex flex-col justify-center">
							<div>
								<span className="font-bold">{user.data.name}</span>
							</div>
							<div>
								<span dir="ltr" className="font-medium">
									{formatMobileNumber(user.data.phone)}
								</span>
							</div>
						</div>
					</>
				)}
			</div>

			{/* Bottom Part */}
			<div className="bg-[#C5D3F9] rounded-2xl py-2 px-3">
				<div className="mb-8">
					<span className="text-xl font-bold">فهرست</span>
				</div>

				<div>
					<ul>
						<AsideOption
							url="/profile/edit"
							color="#97B9FB"
							image="/images/profile-settings.png"
							title="ویرایش پروفایل"
						/>
						<AsideOption
							url="/profile/orders"
							color="#97FBA1"
							image="/images/profile-shopping-cart.png"
							title="سفارشات من"
						/>
						{/* <AsideOption
							url="/profile/products"
							color="#FB9797"
							image="/images/profile-shopping-cart.png"
							title="محصولات خریداری شده"
						/> */}
						<AsideOption
							url="/profile/classes"
							color="#FB9797"
							image="/images/profile-student-hat.png"
							title="کلاس های من"
						/>
						{/* <AsideOption
							url="/profile/online-test"
							color="#97FBE9"
							image="/images/profile-video-conference.png"
							title="آزمون"
						/> */}
						<AsideOption
							url="/profile/bookmarks"
							color="#FB97C1"
							image="/images/profile-love-cloud.png"
							title="علاقه‌مندی ها"
						/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Aside;
