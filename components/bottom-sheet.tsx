import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Text } from "./ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";

const SpendingFormBottomSheet = React.forwardRef<BottomSheetModal>(
  (props, ref) => {
    const { isDarkColorScheme } = useColorScheme();
    const handleSheetChanges = React.useCallback((index: number) => {}, []);

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      ),
      []
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={["50%"]}
          enablePanDownToClose
          ref={ref}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          handleStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].background
              : NAV_THEME["light"].background,
          }}
          handleIndicatorStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].text
              : NAV_THEME["light"].text,
          }}
          backgroundStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].background
              : NAV_THEME["light"].background,
          }}
        >
          <BottomSheetView className="bg-background flex-1 p-4">
            <Text className="text-2xl font-bold">Add Spending</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

export default SpendingFormBottomSheet;
