"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";

const SearchNovel = () => {
	const router = useRouter();
	const ref = useRef<HTMLInputElement>(null);

	const handleSubmit = (): boolean => {
		if (ref.current?.value.trim().length == 0) return false;
		router.push(`/search?title=${ref.current?.value}`);
		return true;
	};

	const [, action, pending] = useActionState(handleSubmit, false);

	return (
		<form action={action} className="flex flex-1 space-x-1">
			<Input placeholder="Cari novel..." ref={ref} className="w-full" />
			<Button
				variant="outline"
				type="submit"
				disabled={pending}
				title="Search novel"
			>
				{pending ? <Loader2 className="animate-spin" /> : <Search />}
			</Button>
		</form>
	);
};

export default SearchNovel;
