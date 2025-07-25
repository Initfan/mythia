import { useState } from "react";
import ReactEditor, { ContentEditableEvent } from "react-simple-wysiwyg";

const Editor = ({
	setContent,
	placeholder,
	value,
}: {
	placeholder?: string;
	setContent: (value: string) => void;
	value?: string;
}) => {
	const [html, setHtml] = useState<string>();

	const onChange = (e: ContentEditableEvent) => {
		setHtml(e.target.value);
		setContent(e.target.value);
	};

	return (
		<ReactEditor
			containerProps={{
				className: "border-zinc-800!",
			}}
			value={value || html}
			onChange={onChange}
			placeholder={placeholder || "Tulis content cerita..."}
		/>
	);
};

export default Editor;
