import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export default function OverviewProperty({ label, children }: Props) {
  return (
    <div className="flex items-start gap-x-2">
      <div className="min-w-[100px] flex items-center">
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
}
