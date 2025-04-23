import React from "react";
import DateTimePicker, {
  useDefaultClassNames,
} from "react-native-ui-datepicker";
import {
  DatePickerMultipleProps,
  DatePickerRangeProps,
  DatePickerSingleProps,
} from "react-native-ui-datepicker/lib/typescript/datetime-picker";

type DatePickerProps =
  | DatePickerSingleProps
  | DatePickerRangeProps
  | DatePickerMultipleProps;

const DatePicker = (props: DatePickerProps) => {
  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      {...props}
      classNames={{
        ...defaultClassNames,
      }}
      timeZone="Asia/Manila"
    />
  );
};

export default DatePicker;
