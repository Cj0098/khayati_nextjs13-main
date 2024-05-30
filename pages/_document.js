import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	const envAppDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION;

	return (
		<Html lang="fa" dir="rtl">
			<Head>
				<link rel="icon" type="image/png" href="/images/logo.png" />
				<meta name="description" content={envAppDescription} />
			</Head>

			<body>
				<Main />

				<NextScript />
			</body>
		</Html>
	);
}
