import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  isTooltipEnabled?: boolean;
}

export default function UserAvatar({
  name,
  url,
  size,
  className,
  isTooltipEnabled = true,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar
          className={cn(
            "size-8 shadow-md border",
            size === "sm" && "size-6",
            size === "md" && "size-8",
            size === "lg" && "size-10",
            className
          )}
        >
          <AvatarImage
            src={url || undefined}
            alt={name}
            className="object-center object-cover"
          />
          <AvatarFallback>
            <Skeleton className="size-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      {isTooltipEnabled && (
        <TooltipContent>
          <p>{name.toUpperCase()}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
