import { Loader } from "lucide-react";

export default function Spinner() {
  return (
    <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
      <Loader className="size-4 animate-spin text-muted-foreground" />
    </div>
  );
}
