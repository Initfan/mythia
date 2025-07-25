import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

const StepWrite = ({ active, step }: { active: number; step: string[] }) => {
	return (
		<div className="mx-auto flex items-center space-x-2">
			{step.map((v, i) => (
				<Fragment key={i}>
					<Badge variant={active == i + 1 ? "default" : "outline"}>
						{i + 1}
					</Badge>
					<p
						className={`text-sm ${
							active != i + 1 ? "text-muted" : ""
						}`}
					>
						{v}
					</p>
					{step.length != i + 1 && <Separator className="flex-1" />}
				</Fragment>
			))}
		</div>
	);
};

export default StepWrite;
