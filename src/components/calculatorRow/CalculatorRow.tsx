import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { PencilIcon, PencilOff, Trash } from "lucide-react";
import { Row, SignType } from "../../types";
import { useMotion } from "../../hooks/useMotion";
import TooltipButton from "../tooltipButton";

interface RowComponentProps {
  row: Row;
  onUpdate: (updates: Partial<Row>) => void;
  onDelete: () => void;
}
function CalculatorRow({ row, onUpdate, onDelete }: RowComponentProps) {
  const { motion } = useMotion();
  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "tween" }}
      className="flex items-center gap-4 mt-4"
    >
      <Select
        disabled={!row.enabled}
        defaultValue={row.sign}
        onValueChange={(value) => onUpdate({ sign: value as SignType })}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">-</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={row.value}
        onChange={(e) => onUpdate({ value: Number(e.target.value) })}
        disabled={!row.enabled}
      />
      <TooltipButton
        icon={<Trash />}
        tooltip="Delete"
        onClick={onDelete}
        variant="destructive"
        side="left"
      />
      <TooltipButton
        icon={row.enabled ? <PencilIcon /> : <PencilOff />}
        tooltip={row.enabled ? "Disable" : "Enable"}
        onClick={() => onUpdate({ enabled: !row.enabled })}
        variant={row.enabled ? "outline" : "secondary"}
        side="right"
      />
    </motion.div>
  );
}

export default CalculatorRow;
