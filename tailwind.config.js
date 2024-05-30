/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
		screens: {
			sm: "576px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		fontFamily: {
			iransans: "IranSans",
			iransansp: "IranSansp",
		},
		extend: {
			colors: {
				white: "#FFFFFF",
				black: "#000000",
				primary: "#4B48D2",
				background: "#EEEFF4",
			},
			boxShadow: {
				bsPrimary: "-9px -8px 10px -3px #FFFFFF, 3px 7px 11px -1px rgba(0, 0, 0, 0.25)",
				bsPrimaryInset: "inset -8px -9px 9px -3px #ffffff, inset 3px 7px 10px -3px rgba(0, 0, 0, 0.25)",
				bsSecondary: "-9px -8px 3px -3px #FFFFFF, 3px 7px 3px -1px rgba(0, 0, 0, 0.25)",
				bsSecondaryInset: "inset -9px -8px 3px -3px #FFFFFF, inset 3px 7px 3px -1px rgba(0, 0, 0, 0.25)",
			},
		},
	},
	plugins: [],
};
