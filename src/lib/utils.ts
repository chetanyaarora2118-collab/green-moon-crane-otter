import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });
}

export function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
