"use client";
import { userContext } from "@/context/user-context";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { user_library } from "@/generated";

const ButtonLibrary = ({ novelId }: { novelId: number }) => {
	const user = useContext(userContext);
	const [library, setLibrary] = useState<user_library>();

	const checkLibrary = useCallback(async () => {
		if (!user) return;
		try {
			const req = await fetch(`/api/user/library/${novelId}/${user?.id}`);
			const res = await req.json();
			setLibrary(res.data);
		} catch (error) {
			console.error("Error checking library:", error);
		}
	}, [novelId, user]);

	useEffect(() => {
		checkLibrary();
	}, [checkLibrary]);

	const removeFromLibrary = async () => {
		try {
			await fetch("/api/user/library", {
				method: "delete",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: library?.id }),
			});
			toast.success("Novel di hapus dari daftar pustaka");
			setLibrary(undefined);
		} catch {
			toast.error("Gagal menghapus novel ke pustaka");
		}
	};

	const addToLibrary = async () => {
		try {
			const req = await fetch("/api/user/library", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user!.id, novelId }),
			});
			const res = await req.json();
			setLibrary(res.data);
			toast.success("Novel berhasil ditambahkan ke daftar pustaka");
		} catch {
			toast.error("Gagal menambahkan novel ke pustaka");
		}
	};

	const handleLibrary = library ? removeFromLibrary : addToLibrary;

	return (
		<Button
			variant="secondary"
			title={`${library ? "Hapus dari" : "Tambahkan ke"} Favorit`}
			onClick={handleLibrary}
		>
			<Heart
				fill={library ? "red" : undefined}
				stroke={library ? "none" : "white"}
			/>
		</Button>
	);
};

export default ButtonLibrary;
