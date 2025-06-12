import { createLibrary } from "@/actions/library-action";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useRef, useTransition } from "react";
import { Prisma } from "@/generated";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type libraryType = Prisma.user_libraryGetPayload<{
	include: {
		library_detail: true;
	};
}>;

const CreateLibrary = ({
	onAddLibrary,
}: {
	onAddLibrary: (library: libraryType) => void;
}) => {
	const ref = useRef<HTMLInputElement>(null);
	const [pending, transition] = useTransition();

	const onSubmit = () => {
		transition(async () => {
			const library = await createLibrary(ref.current!.value);
			onAddLibrary(library);
			toast("Berhasil membuat library");
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Buat pustaka</Button>
			</DialogTrigger>
			<DialogContent className="py-4">
				<DialogHeader>
					<DialogTitle>Buat pustaka baru</DialogTitle>
				</DialogHeader>
				<Input
					type="text"
					ref={ref}
					disabled={pending}
					onKeyUp={(e) => e.code == "Enter" && onSubmit}
				/>
				<DialogFooter>
					<Button onClick={onSubmit} disabled={pending}>
						{pending ? (
							<Loader2 className="animate-spin" />
						) : (
							"Save"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateLibrary;
