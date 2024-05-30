import React from "react";

// Types
type Props = {
	audio: string;
	description: string;
};

const MusicPlayer = (props: Props) => {
	const { audio, description } = props;

	return (
		<div>
			<div
				dir="ltr"
				className="p-2 mb-3 rounded-3xl shadow-bsPrimary"
				style={{
					background:
						"linear-gradient(145deg, rgba(122,196,255,1) 0%, rgba(216,174,255,1) 100%)",
				}}
			>
				<audio src={audio} controls className="w-full opacity-80" />
			</div>
			<div>
				<span>{description}</span>
			</div>
		</div>
	);
};

export default MusicPlayer;
