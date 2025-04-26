import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { twMerge } from "tailwind-merge";
import { Spending } from "~/server/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

type GroupedSpending = Record<string, Spending[]>;

export function groupDataByDate(dataArray: Spending[]): GroupedSpending {
  // Use reduce to build the grouped object
  return dataArray.reduce(
    (accumulator: GroupedSpending, currentItem: Spending) => {
      const dateKey = format(currentItem.date, "PP");

      // If this date key doesn't exist in the accumulator yet, initialize it with an empty array
      if (!accumulator[dateKey]) {
        accumulator[dateKey] = [];
      }

      // Push the current item into the array for its corresponding date key
      accumulator[dateKey].push(currentItem);

      // Return the accumulator for the next iteration
      return accumulator;
    },
    {}
  ); // Start with an empty object as the initial value for the accumulator
}
