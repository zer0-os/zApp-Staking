import { Column } from "zero-ui/src/components/AsyncTable";

export const COLUMNS: Column[] = [
  { id: "pool", header: "Pool", alignment: "left" },
  { id: "claimed", header: "Date Claimed", alignment: "right" },
  { id: "amount", header: "Amount", alignment: "right" },
  { id: "action", header: "", alignment: "right" },
];
