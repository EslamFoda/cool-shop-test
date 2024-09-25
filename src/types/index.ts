export type SignType = "+" | "-";

export interface Row {
  id: string;
  sign: SignType;
  value: number;
  enabled: boolean;
}
