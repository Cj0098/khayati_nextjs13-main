/*
	@url: /course
	@desc: redirect the user to '/courses/pricy' to pick a course
*/

export default function Courses(props) {}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: "/courses/pricy",
			permanent: false,
		},
	};
}
