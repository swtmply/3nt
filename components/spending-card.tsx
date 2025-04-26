import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { View } from "./ui/view";
import { Text } from "./ui/text";
import React from "react";

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

export const SpendingCard = ({
  type,
  currentSpending,
  previousSpending,
}: SpendingCardProps) => {
  return (
    <View className="bg-secondary p-4 rounded-lg gap-3">
      <Text className="text-lg capitalize font-geist-medium text-secondary-foreground">
        Spent This {type}
      </Text>
      <View>
        <Text className="text-4xl font-geist-medium text-secondary-foreground">
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

export const SpendingCardSkeleton = () => {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    //create pulse effect by repeating opacity animation
    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      true
    );

    return () => {
      //cancel running animations after component unmounts
      cancelAnimation(opacity);
    };
  }, []);

  const animatedStyleParent = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View className="bg-secondary p-4 rounded-lg gap-3">
      <Animated.View
        style={[animatedStyleParent]}
        className="h-6 w-40 bg-muted-foreground rounded-md"
      />

      <View className="gap-2">
        <Animated.View
          style={[animatedStyleParent]}
          className="h-12 w-64 bg-muted-foreground rounded-md"
        />

        <Animated.View
          style={[animatedStyleParent]}
          className="h-6 w-32 bg-muted-foreground rounded-md"
        />
      </View>
    </View>
  );
};
