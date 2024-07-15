"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FC } from "react";

interface FormData {
  align: string;
  dimension: string;
}

const schema = z.object({
  align: z.string(),
  dimension: z.string(),
});

interface OptionFormProps {
  defaultValues?: FormData;
  onSubmit: (data: { align: string; dimension: string }) => void;
  onCancel: () => void;
}

const OptionForm: FC<OptionFormProps> = (props) => {
  const form = useForm<FormData>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    props.onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        <FormField
          control={form.control}
          name="align"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Align</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select align" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimension"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimension</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-center">
          <Button onClick={props.onCancel} type="button">
            Cancel
          </Button>
          <Button variant="destructive">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default OptionForm;
