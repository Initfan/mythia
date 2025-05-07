"use client";

import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";

export function FileUploadDemo() {
	const [files, setFiles] = React.useState<File[]>([]);

	const onFileReject = React.useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${
				file.name.length > 20
					? `${file.name.slice(0, 20)}...`
					: file.name
			}" has been rejected`,
		});
	}, []);

	console.log(files);

	return (
		<FileUpload
			maxFiles={1}
			maxSize={5 * 1024 * 1024}
			value={files}
			onValueChange={setFiles}
			onFileReject={onFileReject}
			className="h-full"
		>
			<FileUploadDropzone
				className={`h-full ${files.length > 0 && "p-0 border-none"}`}
			>
				{files.length > 0 ? (
					<Image
						src={URL.createObjectURL(files[0])}
						alt=""
						className="h-full w-full object-cover"
						fill
						onLoad={(event) => {
							if (!(event.target instanceof HTMLImageElement))
								return;
							URL.revokeObjectURL(event.target.src);
						}}
					/>
				) : (
					<>
						<div className="flex flex-col items-center gap-1">
							<div className="flex items-center justify-center rounded-full border p-2.5">
								<Upload className="size-6 text-muted-foreground" />
							</div>
							<p className="font-medium text-sm">
								Drag & drop files here
							</p>
							<p className="text-muted-foreground text-xs text-center">
								Or click to browse
							</p>
						</div>
						<FileUploadTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="mt-2 w-fit"
							>
								Browse files
							</Button>
						</FileUploadTrigger>
					</>
				)}
			</FileUploadDropzone>
			<FileUploadList>
				{files.map((file, index) => (
					<FileUploadItem key={index} value={file}>
						<FileUploadItemPreview />
						<FileUploadItemMetadata />
						<FileUploadItemDelete asChild>
							<Button
								variant="ghost"
								size="icon"
								className="size-7"
							>
								<X />
							</Button>
						</FileUploadItemDelete>
					</FileUploadItem>
				))}
			</FileUploadList>
		</FileUpload>
	);
}
