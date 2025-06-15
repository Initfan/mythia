import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<>
			<div className="flex space-x-6 relative">
				<Skeleton className="w-[250px] relative h-[300px]" />
				<div className="flex flex-col space-y-6 flex-1 items-start">
					<Skeleton className="h-12 w-1/3" />
					<Skeleton className="h-7 w-1/4" />
					<Skeleton className="h-10 w-1/5" />
					<Skeleton className="h-12 w-2/3" />
					<Skeleton className="h-10 w-1/2" />
				</div>
				<div className="space-x-2 flex absolute top-0 right-0">
					<Skeleton className="h-8 w-8" />
					<Skeleton className="h-8 w-8" />
				</div>
			</div>
			<div className="space-y-4">
				<Skeleton className="h-6 w-1/3 " />
				<Skeleton className="h-24" />
				<Skeleton className="h-32" />
			</div>
		</>
	);
};

export default Loading;
