export default function Courses(props) {}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: "/courses/pricy",
			permanent: false,
		},
	};
}
