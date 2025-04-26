import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text } from "~/components/ui/text";
import { View } from "~/components/ui/view";
import { getAllSpendings, queryKeys } from "~/server/queries/spending-queries";

const History = () => {
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.allSpendings,
    queryFn: getAllSpendings,
  });

  return (
    <View className="flex-1 px-4 pt-16">
      <Text className="text-5xl font-geist-bold tracking-tighter mb-8 pt-1">
        History
      </Text>

      <View className="gap-4">
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          Object.entries(data || {}).map(([date, spendings], index) => (
            <View key={index} className="gap-2">
              <Text className="font-geist-bold">{date}</Text>
              <View className="bg-secondary p-4 rounded-lg gap-3">
                {spendings.map((spending) => (
                  <View
                    key={spending.id}
                    className="flex-row items-center justify-between gap-2"
                  >
                    <Text className="text-muted-foreground">
                      {spending.description}
                    </Text>
                    <Text className="font-geist-semibold">
                      {Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(spending.amount)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default History;
