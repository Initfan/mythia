"use client";

import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";

export function FileUploadThing({
	onUpload,
}: {
	onUpload: (file: File) => void;
}) {
	const [cover, setCover] = React.useState<File>();

	const coverChangeHandler = (file: File) => {
		setCover(file);
		onUpload(file);
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
				maxSize={4 * 1024 * 1024}
				onFileAccept={coverChangeHandler}
				onFileReject={onFileReject}
				className="flex-1"
			>
				<FileUploadDropzone
					className={`flex-1 relative ${cover && "border-none"}`}
				>
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
							<p className="font-medium text-sm text-center">
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
