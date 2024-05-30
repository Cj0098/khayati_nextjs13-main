// Components
import Aside from "./Aside/Aside";

// CSS
import style from "./Profile.module.scss";

const Profile = (props) => {
	return (
		<div className="py-12 sm:py-20">
			<div className="container">
				<div className={`gap-4 ${style.ProfileWrapper}`}>
					<aside>
						<Aside />
					</aside>

					<main className="bg-[#C5D3F9] rounded-2xl sm:p-4 p-2 flex items-center">{props.children}</main>
				</div>
			</div>
		</div>
	);
};

export default Profile;
