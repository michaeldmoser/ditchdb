import { useId, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import cx from "@/utils/cx";

import { InfoAlert } from "@/components/alerts";
import { Button, OutlineButton } from "@/components/buttons";
import XIcon from "@/components/icons/X";

import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  address_to_line: string;
  attention_to_line: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

export default function NoBillingSetup() {
  const { handleSubmit, register } = useForm<IFormInput>();
  const [open, setOpen] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setOpen(false);
    console.log(data);
  };

  return (
    <InfoAlert>
      <div className="grid grid-cols-2 w-full items-center">
        <div>No billing has been setup yet.</div>
        <div className="text-right">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button>Setup Billing</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-slate-950/90 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content
                asChild
                className={cx(
                  "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-full w-full md:max-w-3xl md:mt-0 translate-x-[-50%] translate-y-[-50%]",
                )}
              >
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                  <Dialog.Title asChild>
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        Setup Billing
                      </h3>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-gray-500 hover:text-gray-400 outline-none hover:bg-rose-500/50 transition-all text-sm"
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 overflow-y-auto">
                      <TextField
                        label="Billing To"
                        {...register("address_to_line")}
                      />
                      <TextField
                        label="Attention To"
                        {...register("attention_to_line")}
                      />
                      <TextField
                        label="Street Address"
                        {...register("street_address")}
                      />
                      <TextField
                        label="City"
                        {...register("city")}
                      />
                      <TextField
                        label="State"
                        {...register("state")}
                      />
                      <TextField
                        label="Zip"
                        {...register("zip")}
                      />
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                      <Dialog.Close asChild>
                        <OutlineButton>Close</OutlineButton>
                      </Dialog.Close>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </InfoAlert>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function TextField({ label, name, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <div className="my-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        {...props}
      />
    </div>
  );
}
