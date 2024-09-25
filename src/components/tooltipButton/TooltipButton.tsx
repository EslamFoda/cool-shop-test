import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button, ButtonProps } from "../ui/button";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useMotion } from "../../hooks/useMotion";

interface TooltipButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
  tooltip: string;
  side?: "top" | "right" | "bottom" | "left";
}

const TooltipButton = ({
  icon,
  tooltip,
  onClick,
  variant = "outline",
  side = "bottom",
  ...props
}: TooltipButtonProps) => {
  const { motion } = useMotion();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
            <Button variant={variant} size="icon" onClick={onClick} {...props}>
              {icon}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{tooltip}</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
