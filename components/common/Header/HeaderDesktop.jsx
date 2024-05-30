import Link from "components/common/Link/Link";
import { useRouter } from "next/router";

// Libraries
import { v4 as uuid } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";

// Data
import HeaderData from "./HeaderData";

// CSS
import style from "./HeaderDesktop.module.scss";

const HeaderNavOption = ({ url = "/", text, active = false }) => {
	return (
		<li
			className={`rounded-xl overflow-hidden duration-500 shadow-bsPrimary hover:shadow-bsPrimaryInset
				${active ? `shadow-bsPrimaryInset` : ""}
			`}
		>
			<Link
				href={url}
				className={`block px-4 py-2 duration-500
				${active ? "text-primary" : "text-gray-500 hover:text-black"}`}
			>
				{text}
			</Link>
		</li>
	);
};

const HeaderDesktop = (props) => {
	const router = useRouter();

	return (
		<header className="pt-4">
			<div className="container">
				{/* <Header Top Part> */}
				<div className="flex flex-row items-center justify-between gap-1 mb-4">
					{/* <Logo> */}
					<div className="flex items-center">
						<Link href="/">
							<LazyLoadImage src="/images/logo.png" alt="خیاطی مقدم جو" />
						</Link>
						<Link href="/">
							<h1 className="font-bold "> آموزش خیاطی</h1>
							<hr />
							<h2 className="text-[10px] text-center"> آکادمی لذت خیاطی</h2>
						</Link>
					</div>
					{/* </Logo> */}

					{/* <Search> */}
					<HeaderSearch />
					{/* </Search> */}

					{/* <Menu> */}
					<HeaderMenu />
					{/* </Menu> */}
				</div>

				{/* </Header Top Part> */}

				{/* <Header Bottom Part> */}
				<div>
					<div className="flex items-center gap-4">
						{/* <Home> */}
						<div>
							<Link
								href="/"
								className={`nonsense
								${router.pathname === "/" ? "text-primary" : "text-gray-500"}`}
							>
								صفحه اصلی
							</Link>
						</div>
						{/* </Home> */}

						{/* <Nav> */}
						<div
							className={`relative flex-1 flex items-center ${style.headerDesktopMenuNavBox}`}
						>
							<div
								className={`relative overflow-hidden ${style.headerDesktopMenuNavArrowBox}`}
							>
								<div className={`${style.headerDesktopMenuNavArrow}`}></div>
							</div>
							<nav>
								<ul className="flex items-center gap-5">
									{HeaderData.map(({ url, text }) => (
										<HeaderNavOption
											key={uuid()}
											url={url}
											text={text}
											active={router.asPath === url}
										/>
									))}
								</ul>
							</nav>
						</div>
						{/* </Nav> */}
					</div>
				</div>
				{/*  </Header Bottom Part>  */}
			</div>
		</header>
	);
};

export default HeaderDesktop;
