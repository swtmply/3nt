import { and, gte, lte } from "drizzle-orm";
import db from "../db";
import {
  startOfMonth,
  subMonths,
  lastDayOfMonth,
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
} from "date-fns";

const getSpendingsSummary = async () => {
  const now = new Date();

  // Time ranges
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const yesterdayStart = startOfDay(subDays(now, 1));
  const yesterdayEnd = endOfDay(subDays(now, 1));

  const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });

  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = lastDayOfMonth(now);

  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = lastDayOfMonth(subMonths(now, 1));

  // Fetch all spendings within the last two months range
  const spendings = await db.query.spendings.findMany({
    where: (spending) =>
      and(
        gte(spending.date, lastMonthStart),
        lte(spending.date, currentMonthEnd)
      ),
  });

  // Calculate totals for each period
  const calculateTotal = (start: Date, end: Date) => {
    return spendings
      .filter((spending) => {
        const spendingDate = new Date(spending.date);
        return spendingDate >= start && spendingDate <= end;
      })
      .reduce((sum, spending) => sum + spending.amount, 0);
  };

  return {
    today: calculateTotal(todayStart, todayEnd),
    yesterday: calculateTotal(yesterdayStart, yesterdayEnd),
    currentWeek: calculateTotal(currentWeekStart, currentWeekEnd),
    lastWeek: calculateTotal(lastWeekStart, lastWeekEnd),
    currentMonth: calculateTotal(currentMonthStart, currentMonthEnd),
    lastMonth: calculateTotal(lastMonthStart, lastMonthEnd),
  };
};

const queryKeys = {
  all: ["spending"],
  spendingSummary: ["spending", "summary"],
};

export { getSpendingsSummary, queryKeys };
