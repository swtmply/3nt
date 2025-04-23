import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { View as RNView } from "react-native";
import { useBottomSheet } from "~/contexts/bottom-sheet-context";
import CreateSpendingForm from "./forms/create-spending-form";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { View } from "./ui/view";

const SpendingFormBottomSheet = React.forwardRef<BottomSheetModal>(
  (props, ref) => {
    const submitButtonRef = React.useRef<RNView>(null);
    const { closeBottomSheet } = useBottomSheet();

    const handleSubmit = () => {
      if (submitButtonRef.current) {
        // @ts-expect-error too lazy to type XD
        submitButtonRef.current.submit();
      }
    };

    return (
      <BottomSheetView className="bg-background flex-1 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Button variant={"ghost"} onPress={closeBottomSheet}>
            <Text>Cancel</Text>
          </Button>
          <Button
            variant={"ghost"}
            ref={submitButtonRef}
            onPress={handleSubmit}
          >
            <Text className="text-blue-500">Submit</Text>
          </Button>
        </View>

        <Text className="text-2xl font-geist-bold mb-4">Add Spending</Text>

        <CreateSpendingForm ref={submitButtonRef} />
      </BottomSheetView>
    );
  }
);

export default SpendingFormBottomSheet;
