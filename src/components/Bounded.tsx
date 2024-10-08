import React from "react";
import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
    ({ as: Comp = "section", className, children, ...restProps }, ref) => {
        return (
            <Comp
                ref={ref}
                className={clsx("px-4 py-4 md:px-6 ", className)}
                {...restProps}
            >
                <div className="mx-auto w-full max-w-7xl">
                    {children}
                </div>
            </Comp>
        );
    });

Bounded.displayName = "Bounded";
export default Bounded;