/*
	@url: /article
	@description: beacuse we dont have such a article without id or ..., 
	we redirect user to the '/articles' page to choose one article wisely from articles.
*/

export default function Article(props) {}

export async function getServerSideProps({ query }) {
	return {
		redirect: {
			destination: "/articles",
			permanent: false,
		},
	};
}
