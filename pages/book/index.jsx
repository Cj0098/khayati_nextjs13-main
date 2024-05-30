/*
	@url: /book
	@description: beacuse there is no such a thing as book without id,
					we redirect user to '/books/ page to choose a book wisely.
*/

export default function Book(props) {}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: "/books",
			permanent: false,
		},
	};
}
