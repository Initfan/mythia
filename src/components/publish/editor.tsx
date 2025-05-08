import { useState } from "react";
import ReactEditor, { ContentEditableEvent } from "react-simple-wysiwyg";

const Editor = () => {
	const [html, setHtml] = useState<string>();

	const onChange = (e: ContentEditableEvent) => setHtml(e.target.value);

	return (
		<ReactEditor
			containerProps={{ className: "flex-1" }}
			value={html}
			onChange={onChange}
			placeholder="Tulis content cerita..."
		/>
	);
};

export default Editor;
