import React, { useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { NewSpending } from "~/server/db/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Text } from "../ui/text";
import { View } from "../ui/view";
import DatePicker from "../ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { createSpending } from "~/server/mutations/spending-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "~/server/queries/spending-queries";

const CreateSpendingForm = React.forwardRef((props, ref) => {
  const queryClient = useQueryClient();
  const form = useForm<NewSpending>({
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: "",
      method: "",
    },
  });

  const onSubmit = async (data: NewSpending) => {
    await createSpending(data);

    queryClient.invalidateQueries({
      queryKey: queryKeys.all,
    });

    form.reset();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.handleSubmit(onSubmit)();
        },
      };
    },
    []
  );

  return (
    <View>
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <View>
            <Label nativeID="description">Description</Label>
            <Input
              placeholder="Spending description"
              value={field.value}
              onChangeText={field.onChange}
              aria-labelledby="description"
            />
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="date"
        render={({ field }) => (
          <View>
            <Label nativeID="date">Date</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="items-start native:px-3" variant="outline">
                  <Text>{field.value?.toLocaleDateString()}</Text>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <DatePicker
                  mode="single"
                  date={field.value || new Date()}
                  onChange={({ date }) => {
                    field.onChange(date);
                  }}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>
                      <Text>OK</Text>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="amount"
        render={({ field }) => (
          <View>
            <Label nativeID="amount">Amount</Label>
            <Input
              placeholder="Spending amount"
              value={field.value.toString()}
              onChangeText={(text) => {
                const value = parseFloat(text);
                field.onChange(isNaN(value) ? 0 : value);
              }}
              aria-labelledby="amount"
              keyboardType="numeric"
            />
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="method"
        render={({ field }) => (
          <View>
            <Label nativeID="method">Method</Label>
            <Input
              placeholder="Spending method"
              value={field.value}
              onChangeText={field.onChange}
              aria-labelledby="method"
            />
          </View>
        )}
      />
    </View>
  );
});

export default CreateSpendingForm;
