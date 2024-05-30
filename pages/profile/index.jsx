export default function Profile(props) {}

export async function getServerSideProps({ req }) {
	const { cookies } = req;

	// If user was not logged in : redirect to homepage
	if (!cookies.token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		redirect: {
			destination: "/profile/edit",
			permanent: false,
		},
	};
}
