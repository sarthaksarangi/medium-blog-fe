import { ChangeEvent } from "react";

export interface LabelledInputInterface {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function stripHtml(html: string): string {
  // Create a temporary element
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Get text content
  let text = tempDiv.textContent || tempDiv.innerText || "";

  // Trim and limit to a reasonable preview length
  text = text.trim();
  if (text.length > 200) {
    text = text.substring(0, 200) + "...";
  }

  return text;
}
