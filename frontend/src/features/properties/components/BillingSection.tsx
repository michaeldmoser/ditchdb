import { forwardRef, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";

import cx from "@/utils/cx";
import { InfoAlert } from "@/components/alerts";
import { Button, OutlineButton } from "@/components/buttons";
import XIcon from "@/components/icons/X";
import { TextField } from "@/components/forms";
import { Address } from "@/components/address";
import { ContentLoading } from "@/components/loaders";
import { Card, CardBody, CardHeader } from "@/components/cards";

import { useCreatePropertyBilling, useGetPropertyBillingQuery } from "../api";

/**
 * BillingSection is a component that displays the billing information for a property.
 *
 * @param id - The id the property
 */
export default function BillingSection({ propertyId }: { propertyId: number }) {
  const queryResult = useGetPropertyBillingQuery(propertyId);

  return (
    <Card>
      <CardHeader>
        Billing
      </CardHeader>
      <CardBody>
        <ContentLoading<Billing>
          {...queryResult}
          notFoundComponent={() => <NoBillingSetup propertyId={propertyId} />}
        >
          {(data) => {
            const address = {
              addressTo: data.address_to_line,
              attentionTo: data.attention_to_line,
              streetAddress: data.street_address,
              city: data.city ?? "",
              state: data.state ?? "",
              zip: data.zip,
            };
            return (
              <dl className="grid grid-cols-2 gap-2">
                <dt>Yearly Assessment</dt>
                <dd>${45}</dd>
                <dt id="billing_current_balance">Current Balance</dt>
                <dd aria-labelledby="billing_current_balance">
                  ${data.current_balance?.toFixed(2)}
                </dd>
                <dt id="billing_address">Billing Address</dt>
                <dd
                  aria-labelledby="billing_address"
                  className="grid grid-cols-2"
                >
                  <Address {...address} />
                </dd>
              </dl>
            );
          }}
        </ContentLoading>
      </CardBody>
    </Card>
  );
}

function NoBillingSetup({ propertyId }: { propertyId: number }) {
  const { handleSubmit, register } = useForm<IFormInput>();
  const [open, setOpen] = useState(false);
  const { mutate } = useCreatePropertyBilling();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setOpen(false);
    mutate({ propertyId, ...data });
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
                  "data-[state=open]:animate-contentShow",
                  "fixed",
                  "top-0",
                  "left-0",
                  "w-screen",
                  "h-screen",
                  "max-w-full",
                  "md:max-w-3xl",
                  "md:top-[50%]",
                  "md:left-[50%]",
                  "md:max-h-[85vh]",
                  "md:w-[90vw]",
                  "md:mt-0",
                  "md:translate-x-[-50%]",
                  "md:translate-y-[-50%]",
                  "lg:h-max",
                )}
              >
                <div className="grid grid-cols-1 grid-rows-[fit-content(100%)_auto_fit-content(100%)] bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
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
                  <form onSubmit={handleSubmit(onSubmit)} className="contents">
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
                      <TextField
                        label="Current Balance"
                        {...register("current_balance", { value: 0 })}
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

/**
 * Interface for billing setup form
 */
interface IFormInput {
  address_to_line: string;
  attention_to_line: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  current_balance: number;
}
