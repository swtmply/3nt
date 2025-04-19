import { Text } from "~/components/ui/text";
import { View } from "~/components/ui/view";

export default function Index() {
  return (
    <View className="flex-1 px-4 pt-16">
      <Text className="text-5xl font-bold tracking-tight mb-8">Spendings</Text>

      <View className="gap-4">
        <SpendingCard
          type="day"
          currentSpending={5023}
          previousSpending={1023}
        />
        <SpendingCard
          type="week"
          currentSpending={10203}
          previousSpending={12321}
        />
        <SpendingCard
          type="month"
          currentSpending={123233}
          previousSpending={1231211}
        />
      </View>
    </View>
  );
}

interface SpendingCardProps {
  type: "day" | "week" | "month";
  currentSpending: number;
  previousSpending: number;
}

const previousText = {
  day: "Yesterday",
  week: "Last Week",
  month: "Last Month",
};

const SpendingCard = ({
  type,
  currentSpending,
  previousSpending,
}: SpendingCardProps) => {
  return (
    <View className="bg-secondary p-4 rounded-lg gap-3">
      <Text className="text-lg capitalize font-medium text-secondary-foreground">
        Spent This {type}
      </Text>
      <View>
        <Text className="text-4xl font-medium text-secondary-foreground">
          {Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(currentSpending)}
        </Text>
        <Text className="text-muted-foreground">
          {previousText[type]}{" "}
          {Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(previousSpending)}
        </Text>
      </View>
    </View>
  );
};
