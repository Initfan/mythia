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
		pageSize > 1 && (
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={
								parseInt(page) > 1
									? `?title=${title}&page=${
											parseInt(page) - 1
									  }`
									: "#"
							}
							className={parseInt(page) == 1 ? "text-muted" : ""}
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
							href={
								parseInt(page) != pageSize
									? `?title=${title}&page=${
											parseInt(page) + 1
									  }`
									: "#"
							}
							className={
								parseInt(page) == pageSize ? "text-muted" : ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		)
	);
}
