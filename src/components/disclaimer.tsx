import { ShieldAlert } from "lucide-react";
import { DISCLAIMER } from "@/lib/nutrients";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-muted-foreground",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
      <p>
        <span className="font-medium text-foreground">Medical disclaimer. </span>
        {DISCLAIMER}
      </p>
    </aside>
  );
}
