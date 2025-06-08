"use client";
import {
	FormEvent,
	useActionState,
	useContext,
	useEffect,
	useRef,
	useState,
	useTransition,
} from "react";
import { userContext } from "@/context/user-context";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BookmarkPlusIcon, LibraryBig, Loader2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	addLibraryNovel,
	createLibrary,
	userLibrary,
} from "@/actions/library-action";
import { Card, CardContent } from "../ui/card";
import { Prisma } from "@/generated";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

type libraryType = Prisma.user_libraryGetPayload<{
	include: { library_detail: true };
}>;

const ButtonLibrary = ({ novelId }: { novelId: number }) => {
	const user = useContext(userContext);
	const ref = useRef<HTMLInputElement>(null);
	const [library, setLibrary] = useState<libraryType[]>();
	const [pending, startTransition] = useTransition();
	const [pendingAdd, addTransition] = useTransition();

	const [state, action] = useActionState(
		() => createLibrary(ref.current!.value!, user!.id),
		null
	);

	useEffect(() => {
		setLibrary((p) => (p && state ? [...p, state] : p));
	}, [state]);

	useEffect(() => {
		startTransition(async () =>
			userLibrary(user!.id).then((res) => setLibrary(res))
		);
	}, [user]);

	const addToLibrary = (v: libraryType) => {
		addTransition(async () => {
			const adding = await addLibraryNovel(v.id, novelId);
			setLibrary(
				Array.isArray(adding.library)
					? adding.library
					: [adding.library!]
			);
			toast(adding.message);
		});
	};

	if (!user) return;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<LibraryBig />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Masukan ke daftar pustaka?</DialogTitle>
					<div className="py-3 space-y-3">
						<Label>Buat pustaka</Label>
						<form
							className="w-full flex space-x-2"
							onSubmit={(e: FormEvent) => {
								e.preventDefault();
								startTransition(async () => action());
							}}
						>
							<Input name="title" ref={ref} />
							<Button type="submit" disabled={pending}>
								{pending ? (
									<Loader2 className="animate-spin" />
								) : (
									<Plus />
								)}
							</Button>
						</form>
						<div className="space-y-2">
							{pending ? (
								<Skeleton className="h-8 w-full" />
							) : (
								library?.map((v, i) => (
									<Card key={v.id} className="p-0">
										<CardContent className="flex justify-between items-center py-2 px-3">
											<p>{v.title}</p>
											<Button
												size="icon"
												variant={
													v.library_detail[i]
														?.novelId == novelId
														? "default"
														: "outline"
												}
												disabled={
													pendingAdd ||
													v.library_detail[i]
														?.novelId == novelId
												}
												onClick={() => addToLibrary(v)}
											>
												<BookmarkPlusIcon />
											</Button>
										</CardContent>
									</Card>
								))
							)}
						</div>
					</div>
				</DialogHeader>
				<DialogFooter>
					<Button variant="destructive">Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ButtonLibrary;
