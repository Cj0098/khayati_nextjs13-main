import { useState } from "react";

// Libraries
import axios from "axios";

// Icons
import { IoSend } from "react-icons/io5";

const MessageInput = ({ loggedInUserToken, chatId }) => {
	const [message, setMessage] = useState("");
	const handleMessageOnChange = (e) => {
		const enteredMessage = e.target.value;
		setMessage(enteredMessage);
	};
	const [sendingMessage, setSendingMessage] = useState(false);
	const sendMessage = async () => {
		setSendingMessage(true);
		try {
			const { data } = await axios.post(
				`/chats/newmessage`,
				{
					body: message,
					chat_id: `${chatId}`,
				},
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			if (data.isDone) {
				setMessage("");
			}
		} catch (e) {
			toast.error("پیام ارسال نشد");
		}
		setSendingMessage(false);
	};

	return (
		<div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="grid w-full gap-4 p-4 bg-white"
				style={{ gridTemplateColumns: "min-content minmax(1px, 1fr)" }}
			>
				{/* <Message> */}
				<div className="flex-center">
					<button
						disabled={!message || sendingMessage}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={sendMessage}
					>
						<i className="text-xl text-[#5686e1]">
							<IoSend />
						</i>
					</button>
				</div>
				{/* </Message> */}

				{/* <Input> */}
				<div>
					<input
						type="text"
						placeholder="چیزی بنویسید ..."
						value={message}
						onChange={handleMessageOnChange}
						className="w-full"
					/>
				</div>
				{/* </Input> */}
			</form>
		</div>
	);
};

export default MessageInput;
