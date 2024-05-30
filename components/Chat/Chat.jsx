import { useState } from "react";

// Components
import Messages from "components/Chat/Messages/Messages";
import Groups from "components/Chat/Groups/Groups";

import style from "./Chat.module.scss";

const Chat = ({ loggedInUserToken }) => {
	const [chatId, setChatId] = useState(1);

	return (
		<div className={`bg-[#C5D3F9] grid ${style.ChatWrapper}`}>
			{/* <Groups> */}
			<Groups loggedInUserToken={loggedInUserToken} chatId={chatId} setChatId={setChatId} />

			{/* <Messages> */}
			<Messages loggedInUserToken={loggedInUserToken} chatId={chatId} />
		</div>
	);
};

export default Chat;
