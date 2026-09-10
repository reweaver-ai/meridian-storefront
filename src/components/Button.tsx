import * as React from "react";

const cn = (...classes: Array<string | undefined | null | false>): string =>
  classes.filter(Boolean).join(" ");

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button ref={ref} className={cn("flex flex-row rounded-none", className)} {...props}>
      {children ?? (
        <>
          <div className="flex flex-row bg-color-accent border-gray-200 border rounded-[999px] pt-3 pr-6 pb-3 pl-6 gap-2 w-40 h-[43px]">
            <span className="text-color-surface font-['\"Inter\", system-ui, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif'] text-[15px] font-semibold text-left">Select option</span>
          </div>
        </>
      )}
    </button>
  )
);
Button.displayName = "Button";

export { Button };
