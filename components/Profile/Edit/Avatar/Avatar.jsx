import { useState, useEffect, useRef } from "react";

// Hooks
import useUserQuery from "../../../../hooks/useUserQuery";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import AvatarEditor from "react-avatar-editor";

// Icons
import { FiEdit } from "react-icons/fi";

// CSS
import style from "./Avatar.module.scss";

const Avatar = (props) => {
	const user = useUserQuery();

	// ————— F I L E —————
	const choosedFile = useRef("");

	// ————— M O D A L —————
	const avatarEditorRef = useRef();
	const [modal, setModal] = useState(false);
	useEffect(() => {
		if (modal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			emptyFileInput();
		}
	}, [modal]);
	const [zoom, setZoom] = useState(1);
	const handleZoomOnWheel = (e) => {
		if (e.deltaY > 0) {
			setZoom((c) => (c > 1 ? c - 0.2 : 1));
		} else if (e.deltaY < 0) {
			setZoom((c) => (c < 5 ? c + 0.2 : 5));
		}
	};
	const handleChangeZoomRange = (e) => {
		const enteredRange = Number(e.target.value);
		let properRange;
		if (enteredRange > 5) {
			properRange = 5;
		} else if (enteredRange < 1) {
			properRange = 1;
		} else {
			properRange = enteredRange;
		}
		setZoom(properRange);
	};

	const [submitting, setSubmitting] = useState(false);
	const handleChangeAvatar = () => {
		avatarEditorRef.current.getImage().toBlob(async (imageBlob) => {
			setSubmitting(true);
			try {
				let d = new FormData();
				d.append("avatar", imageBlob, `${uuid()}.png`);

				const { data: changeAvatarApiResponse } = await axios.post("/auth/updateProfile", d, {
					headers: {
						authorization: `Bearer ${props.loggedInUserToken}`,
					},
				});

				if (changeAvatarApiResponse.isDone) {
					toast.success("عکس پروفایل تغییر کرد");
					setModal(false);
					user.refetch();
				} else {
					toast.success("خطای تغییر عکس پروفایل");
				}
			} catch (e) {
				toast.error("خطا ارتباط با سرور");
			}
			setSubmitting(false);
		});
	};

	// ————— A V A T A R —————
	const fileInputRef = useRef("");
	const emptyFileInput = () => (fileInputRef.current.value = "");

	const handleFileOnChange = async () => {
		const selectedFile = fileInputRef.current.files[0];
		const selectedFileType = selectedFile["type"].split("/")[0];
		const selectedFileExtension = selectedFile["type"].split("/")[1];
		const allowedFileExtensions = ["png", "jpg", "jpeg"];

		// Check file size | Limit : 1048576 Bytes === 1 MegaByte
		if (selectedFile.size <= 1048576) {
			// Check file image
			if (selectedFileType === "image") {
				// Check file extensions
				if (allowedFileExtensions.indexOf(selectedFileExtension) !== -1) {
					choosedFile.current = selectedFile;
					setModal(true);
				} else {
					emptyFileInput();
					toast.error("فرمت عکس میبایست png, jpg یا jpeg باشد.");
				}
			} else {
				emptyFileInput();
				toast.error("فایل انتخابی باید عکس باشد");
			}
		} else {
			emptyFileInput();
			toast.error("عکس انتخابی کمتر از 1 مگابایت باشد");
		}
	};

	return (
		<>
			{/* ——— <Modal> ——— */}
			{modal && (
				<div
					onClick={() => setModal(false)}
					className="fixed inset-0 w-full h-full bg-black/70 z-[99998]"
				></div>
			)}

			{modal && (
				<div className={`bg-gray-200 p-3 rounded-2xl z-[99999] ${style.Modal}`}>
					<div className="mb-6 bg-slate-400" onWheel={handleZoomOnWheel}>
						<AvatarEditor
							ref={avatarEditorRef}
							image={choosedFile.current}
							width={225}
							height={225}
							borderRadius={99999999999}
							color={[255, 255, 255, 0.6]} // RGBA
							scale={zoom}
							rotate={0}
						/>
					</div>

					<div className="mb-6">
						<div className="mb-1 text-center">
							<span>زوم :</span>
						</div>
						<div dir="ltr">
							<input
								type="range"
								min="1"
								max="5"
								step="0.2"
								value={zoom}
								onChange={handleChangeZoomRange}
								className="w-full"
							/>
						</div>
					</div>

					<div className="grid gap-3" style={{ gridTemplateColumns: "1fr 2fr" }}>
						<button
							disabled={submitting}
							onClick={() => setModal(false)}
							className="px-3 py-2 text-white rounded bg-amber-500 hover:bg-yellow-500 disabled:opacity-50"
						>
							انصراف
						</button>
						<button
							disabled={submitting}
							onClick={handleChangeAvatar}
							className="px-3 py-2 text-white bg-green-500 rounded hover:bg-emerald-500 disabled:opacity-50"
						>
							ذخیره
						</button>
					</div>
				</div>
			)}

			{/* ——— <Avatar> ——— */}
			<div className="relative w-32 h-32 mx-auto">
				<img src={props.avatar || "/images/user.png"} alt="آواتار" className="w-full h-full rounded-full" />

				<label
					htmlFor="ProfileAvatarFileInput"
					className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-60 hover:opacity-100"
				>
					<i className="absolute bottom-0 left-0 block text-lg">
						<FiEdit />
					</i>
				</label>
				<input
					ref={fileInputRef}
					id="ProfileAvatarFileInput"
					type="file"
					accept=".png, .jpeg, .jpg"
					onChange={handleFileOnChange}
					className="hidden"
				/>
			</div>
		</>
	);
};

export default Avatar;
