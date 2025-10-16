import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";

interface Props {
  value: string;
  className?: string;
  dateFormat?: string;
}

export default function TaskDate({ value, className, dateFormat }: Props) {
  const KST = "Asia/Seoul";
  const today = toZonedTime(new Date(), KST);
  const endDate = toZonedTime(new Date(value), KST);
  const diffInDays = differenceInDays(endDate, today);
  let textColor = "text-muted-foreground";
  if (diffInDays <= 3) {
    textColor = "text-red-500";
  } else if (diffInDays <= 7) {
    textColor = "text-orange-500";
  } else if (diffInDays <= 14) {
    textColor = "text-yellow-500";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>
        {dateFormat === "PPP"
          ? format(value, "PPP", { locale: ko })
          : format(value, "yyyy-MM-dd")}
      </span>
    </div>
  );
}
