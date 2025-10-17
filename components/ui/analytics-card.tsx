import { cn } from "@/lib/utils";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

interface Props {
  title: string;
  value: number;
  variant: "UP" | "DOWN";
  increaseValue: number;
}

export default function AnalyticsCard({
  title,
  value,
  variant,
  increaseValue,
}: Props) {
  const iconColor = variant === "UP" ? "text-emerald-500" : "text-red-500";
  const increaseValueColor =
    variant === "UP" ? "text-emerald-500" : "text-red-500";
  const Icon = variant === "UP" ? FaCaretUp : FaCaretDown;
  return (
    <Card className="shadow-none w-full">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span className="truncate text-base">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn(iconColor, "size-4")} />
            <span
              className={cn(
                increaseValueColor,
                "truncate text-base font-medium"
              )}
            >
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
