// Components
import Hero from "components/Home/Hero/Hero";
import Classes from "components/Home/Classes/Classes";
import Trainings from "components/Home/Trainings/Trainings";
import Mannequin from "components/Home/Mannequin/Mannequin";
import Categories from "components/Home/Categories/Categories";
import Books from "components/Home/Books/Books";
import Application from "components/Home/Application/Application";
import Videos from "components/Home/Videos/Videos";
import About from "components/Home/About/About";

const Home = (props) => {
	return (
		<>
			<Hero />

			<Classes />

			<Trainings />

			<Mannequin />

			<Categories />

			<Books />

			<Application />

			<Videos />

			<About />
		</>
	);
};

export default Home;
