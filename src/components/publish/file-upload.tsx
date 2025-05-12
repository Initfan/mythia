"use client";

import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	// FileUploadItem,
	// FileUploadItemDelete,
	// FileUploadItemMetadata,
	// FileUploadItemPreview,
	// FileUploadItemProgress,
	// FileUploadList,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
// import { uploadFiles } from "@/lib/uploadthing";
// import type { UploadedFile } from "@/utils/types";
import { Upload } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";
// import { UploadThingError } from "uploadthing/server";

export function FileUploadThing() {
	// const [isUploading, setIsUploading] = React.useState(false);
	// const [files, setFiles] = React.useState<File[]>([]);
	// const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>(
	// 	[]
	// );
	const [cover, setCover] = React.useState<File>();
	// const onUpload = React.useCallback(
	// 	async (
	// 		files: File,
	// 		{
	// 			onProgress,
	// 		}: {
	// 			onProgress: (file: File, progress: number) => void;
	// 		}
	// 	) => {
	// 		try {
	// 			setIsUploading(true);

	// 			// const res = await uploadFiles("imageUploader", {
	// 			// 	files,
	// 			// 	onUploadProgress: ({ file, progress }) => {
	// 			// 		onProgress(file, progress);
	// 			// 	},
	// 			// });

	// 			// setUploadedFiles((prev) => [...prev, ...res]);
	// 			setCover(files);
	// 			console.log(cover);

	// 			toast.success("Uploaded files:", {
	// 				description: (
	// 					<pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
	// 						<code>
	// 							{JSON.stringify(
	// 								`${cover[0].name}...`,
	// 								// cover((file) =>
	// 								// 	file.name.length > 25
	// 								// 		? `${file.name.slice(0, 25)}...`
	// 								// 		: file.name
	// 								// ),
	// 								null,
	// 								2
	// 							)}
	// 						</code>
	// 					</pre>
	// 				),
	// 			});
	// 		} catch (error) {
	// 			setIsUploading(false);

	// 			if (error instanceof UploadThingError) {
	// 				const errorMessage =
	// 					error.data && "error" in error.data
	// 						? error.data.error
	// 						: "Upload failed";
	// 				toast.error(errorMessage);
	// 				return;
	// 			}

	// 			toast.error(
	// 				error instanceof Error
	// 					? error.message
	// 					: "An unknown error occurred"
	// 			);
	// 		} finally {
	// 			setIsUploading(false);
	// 		}
	// 	},
	// 	[cover]
	// );

	const coverChangeHandler = (file: File) => {
		setCover(file);
		toast.success("Uploaded files:", {
			description: (
				<pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
					<code>
						{JSON.stringify(
							`${file.name}...`,
							// cover((file) =>
							// 	file.name.length > 25
							// 		? `${file.name.slice(0, 25)}...`
							// 		: file.name
							// ),
							null,
							2
						)}
					</code>
				</pre>
			),
		});
	};

	const onFileReject = React.useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${
				file.name.length > 20
					? `${file.name.slice(0, 20)}...`
					: file.name
			}" has been rejected`,
		});
	}, []);

	return (
		<div className="flex flex-col gap-6 h-full">
			<FileUpload
				accept="image/*"
				// onAccept={(files) => setFiles(files)}
				onFileAccept={coverChangeHandler}
				onFileReject={onFileReject}
				// disabled={isUploading}
				className="flex-1"
			>
				<FileUploadDropzone className="flex-1 relative">
					{cover ? (
						<Image
							src={URL.createObjectURL(cover)}
							alt={cover.name}
							fill
							className="object-cover"
						/>
					) : (
						<>
							<div className="flex items-center justify-center rounded-full border p-2.5">
								<Upload className="size-6 text-muted-foreground" />
							</div>
							<p className="font-medium text-sm">
								Drag & drop images here
							</p>
							<p className="text-muted-foreground text-center text-xs ">
								Or click to browse
							</p>
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
			</FileUpload>
		</div>
	);
}
