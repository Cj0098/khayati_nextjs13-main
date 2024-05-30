/*
	@ if user entered '/product' url --> redirect the user to '/products' page
*/

export default function Product() {}

export function getServerSideProps() {
	return {
		redirect: {
			destination: "/products",
			permanent: false,
		},
	};
}
