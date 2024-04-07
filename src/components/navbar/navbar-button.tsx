"use client";

import { Tooltip } from "@/components/nextui";
import clsx from "clsx";

interface NavbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFocused: boolean;
  tooltip: string;
}

const NavbarButton = (props: NavbarButtonProps) => {
  const { isFocused, tooltip, className, ...rest } = props;
  return (
    <Tooltip
      color="foreground"
      content={tooltip}
      placement="bottom"
      className="capitalize"
    >
      <button
        className={clsx(
          "flex h-full w-14 flex-shrink-0 items-center justify-center text-white",
          {
            "bg-[rgba(0,0,0,0.4)]": isFocused,
          },
          className,
        )}
        {...rest}
      ></button>
    </Tooltip>
  );
};

export default NavbarButton;
