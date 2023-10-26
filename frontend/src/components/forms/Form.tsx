import { FieldValues, FormProvider, useForm } from "react-hook-form";

export default function Form<FormInputs extends FieldValues>() {
  const methods = useForm<FormInputs>();

  return (
    <FormProvider {...methods}>
      <form>
      </form>
    </FormProvider>
  );
}
