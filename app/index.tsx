import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Plus } from "~/components/icons";
import SpendingFormBottomSheet from "~/components/spending-bottom-sheet";
import { SpendingCard, SpendingCardSkeleton } from "~/components/spending-card";
import { Text } from "~/components/ui/text";
import { View } from "~/components/ui/view";
import { useBottomSheet } from "~/contexts/bottom-sheet-context";
import {
  getSpendingsSummary,
  queryKeys,
} from "~/server/queries/spending-queries";

export default function Index() {
  const { openBottomSheet } = useBottomSheet();

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.spendingSummary,
    queryFn: getSpendingsSummary,
  });

  return (
    <View className="flex-1 px-4 pt-16">
      <Text className="text-5xl font-geist-bold tracking-tighter mb-8 pt-1">
        Spendings
      </Text>

      <View className="gap-4">
        {isFetching ? (
          [new Array(3).fill(0)].map((_, i) => <SpendingCardSkeleton key={i} />)
        ) : (
          <React.Fragment>
            <SpendingCard
              type="day"
              currentSpending={data?.today || 0}
              previousSpending={data?.yesterday || 0}
            />
            <SpendingCard
              type="week"
              currentSpending={data?.currentWeek || 0}
              previousSpending={data?.lastWeek || 0}
            />
            <SpendingCard
              type="month"
              currentSpending={data?.currentMonth || 0}
              previousSpending={data?.lastMonth || 0}
            />
          </React.Fragment>
        )}
      </View>

      <TouchableHighlight
        onPress={() => {
          openBottomSheet(<SpendingFormBottomSheet />);
        }}
        disabled={isFetching}
        className="absolute bottom-4 right-4 w-16 rounded-full bg-primary h-16 justify-center items-center"
      >
        <Plus size={32} className="rounded-full text-primary-foreground" />
      </TouchableHighlight>
    </View>
  );
}
