import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface PageHeaderProps {
  title: string;
  description?: string;
  isBack?: boolean;
  action?: ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  isBack = false,
  action,
  className,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 sm:flex-row",
        className
      )}
    >
      {isBack && (
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="size-4" />
        </Button>
      )}
      <div className="flex flex-col grow">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
