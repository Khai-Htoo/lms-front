import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FC } from "react";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  fieldType: string;
};
const CustomForm: FC<Props> = ({ control, name, label, fieldType }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" w-full">
          <FormLabel className=" text-gray-800 text-start dark:text-gray-100 line-clamp-1">
            {label}
          </FormLabel>
          <FormControl>
            <Input type={fieldType} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomForm;
