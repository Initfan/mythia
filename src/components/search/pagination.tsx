import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export function SearchPagination({
	title,
	page,
	pageSize,
}: {
	title: string;
	page: string;
	pageSize: number;
}) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`?title=${title}&page=${parseInt(page) - 1}`}
					/>
				</PaginationItem>
				{Array.from({ length: pageSize }).map((_, i) => (
					<PaginationItem key={i}>
						<PaginationLink
							isActive={i + 1 == parseInt(page)}
							href={`?title=${title}&page=${i + 1}`}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href={`?title=${title}&page=${parseInt(page) + 1}`}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
