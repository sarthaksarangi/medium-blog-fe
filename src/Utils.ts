import { ChangeEvent } from "react";

export interface LabelledInputInterface {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
