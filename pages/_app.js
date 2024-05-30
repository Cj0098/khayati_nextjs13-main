import Head from "next/head";

// Context
import ContextProvider from "context/ContextProvier";

// Hooks
import useViewportWidth from "hooks/useViewportWidth";

// Libraries
import axios from "axios";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";

// Components
import HeaderDesktop from "components/common/Header/HeaderDesktop";
import HeaderMobile from "components/common/Header/HeaderMobile";
import Footer from "components/common/Footer/Footer";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/fonts.scss";
import "styles/globals.scss";

// Config
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const { viewportWidth } = useViewportWidth();

	return (
		<>
			<Head>
				<title>{`${appTitle}`}</title>
				<meta
					name="google-site-verification"
					content="QknVtGp4BjETZ4CuqPk4_-e-SQPUsZHYq--bTSr61nw"
				/>
			</Head>

			{/* NextNProgress */}
			<NextNProgress color="#22c55e" />

			{/* Toast Container */}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<QueryClientProvider client={queryClient}>
				<ContextProvider>
					{/* Header */}
					{viewportWidth >= 1024 ? <HeaderDesktop /> : <HeaderMobile />}

					{/* Pages */}
					<Component {...pageProps} />

					{/* Footer */}
					<Footer />
				</ContextProvider>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}
