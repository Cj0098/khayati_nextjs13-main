import React , { useState } from "react";
import Link from "components/common/Link/Link";
import { useRouter } from "next/router";

// Libraries
import { v4 as uuid } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";

// Icons
import { AiOutlineClose } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

// Data
import HeaderData from "./HeaderData";

// CSS
import style from "./HeaderMobile.module.scss";

const HeaderMobileNavOption = ({ url = "/", text, active = false }) => {
	return (
		<li className={`${style.asideNavOption}`}>
			<Link href={url} className="flex items-center gap-2 py-2">
				<div className="flex-1">
					<span className={`${active ? "text-primary" : "text-black"}`}>{text}</span>
				</div>
				<div>
					<i>
						<IoIosArrowBack />
					</i>
				</div>
			</Link>
		</li>
	);
};

const HeaderMobile = (props) => {
	const router = useRouter();
	const [sidebar, setSidebar] = useState(false);

	return (
		<>
			{/* Sidebar Backdrop */}
			{sidebar && (
				<div className={`${style.backdrop}`} onClick={() => setSidebar(false)}></div>
			)}

			{/* Sidebar */}
			<aside
				className={`py-2 px-2 fixed top-0 h-screen bg-white duration-200 overflow-auto ${
					style.aside
				}
				${sidebar ? style.asideActive : style.asideInActive}
				`}
			>
				{/* Close Button */}
				<div className="absolute top-2 left-2">
					<button onClick={() => setSidebar(false)}>
						<i className="text-xl text-gray-500">
							<AiOutlineClose />
						</i>
					</button>
				</div>

				{/* Logo */}
				<div className="mb-4 flex-center">
					<Link href="/">
						<LazyLoadImage src="/images/logo.png" alt="آموزش خیاطی متد مقدم جو" />
						<h1 className="font-bold text-center"> آموزش خیاطی</h1>
						<hr />
						<h2 className="text-[10px] text-center"> آکادمی لذت خیاطی</h2>
					</Link>
				</div>

				{/* Menu */}
				<nav>
					<ul onClick={() => setSidebar(false)}>
						<HeaderMobileNavOption
							url="/"
							text="صفحه اصلی"
							active={router.pathname === "/"}
						/>
						{HeaderData.map(({ url, text }) => (
							<HeaderMobileNavOption
								key={uuid()}
								url={url}
								text={text}
								active={router.pathname === url}
								onClick={() => setSidebar(false)}
							/>
						))}
					</ul>
				</nav>
			</aside>

			{/* Header */}
			<header className="pt-4 bg-[#d1d5db]">
				<div className="container">
					<div className="flex flex-wrap items-center justify-between gap-4">
						{/* Sidebar Toggle Button */}
						<div className="flex-center">
							<button onClick={() => setSidebar(true)}>
								<i className="text-3xl">
									<GoThreeBars />
								</i>
							</button>
						</div>

						{/* ——— <Search Box> ——— */}
						<HeaderSearch />
						{/* ——— </Search Box> ——— */}

						{/* <Menu> */}
						<HeaderMenu />

						{/* </Menu> */}
					</div>
					<div className="flex items-center justify-center mt-2">
						<div className="ml-4 flex items-center " dir="ltr">
							<div class="inner mr-1"></div>
						 	۰۲۶-۳۴۶۱۲۵۳۲
							<hr />
						</div>
						<div className="ml-4 flex items-center" dir="ltr">
							<div class="inner  mr-1"></div>
							026-34612248
							<hr />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default HeaderMobile;
