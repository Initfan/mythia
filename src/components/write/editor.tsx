import { useState } from "react";
import ReactEditor, { ContentEditableEvent } from "react-simple-wysiwyg";

const Editor = ({ setContent }: { setContent: (value: string) => void }) => {
	const [html, setHtml] = useState<string>();

	const onChange = (e: ContentEditableEvent) => {
		setHtml(e.target.value);
		setContent(e.target.value);
	};

	return (
		<ReactEditor
			containerProps={{ className: "flex-1 border-zinc-800!" }}
			value={html}
			onChange={onChange}
			placeholder="Tulis content cerita..."
		/>
	);
};

export default Editor;
