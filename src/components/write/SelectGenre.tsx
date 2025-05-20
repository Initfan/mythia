"use client";
import React, { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CheckCheck } from "lucide-react";
import { Button } from "../ui/button";
import { genre } from "@/generated/prisma";

const SelectGenre = () => {
	const [genre, setGenre] = useState<genre[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	const selectHandler = (value: string) => {
		const selectedGenre = selected.find((v) => v == value);
		console.log(selectedGenre);
		if (!selectedGenre) return setSelected((p) => [...p, value]);

		const removeGenre = selected.filter((v) => v != value);
		setSelected(removeGenre);
	};

	const fetchGenre = async () => {
		const genre = await fetch("api/genre");
		const res = await genre.json();
		setGenre(res.data);
	};

	useEffect(() => {
		fetchGenre();
	}, []);

	return (
		<div className="space-y-3">
			<Select onValueChange={selectHandler}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select genre" />
				</SelectTrigger>
				<SelectContent className="w-full">
					<SelectGroup>
						{genre.map((v, i) => (
							<SelectItem key={i} value={v.genre}>
								<span className="capitalize">{v.genre}</span>
								{selected.includes(v.genre) && (
									<CheckCheck className="text-primary" />
								)}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{selected.map((v) => (
				<Button
					key={v}
					className="mr-2 rounded"
					size={"sm"}
					title="remove"
					onClick={() => selectHandler(v)}
				>
					{v}
				</Button>
			))}
		</div>
	);
};

export default SelectGenre;
