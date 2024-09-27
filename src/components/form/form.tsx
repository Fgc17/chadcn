"use client";
import { createContext, useContext, useEffect } from "react";
import {
  useForm as useReactHookForm,
  UseFormProps as useReactHookFormProps,
  FieldValues,
  ControllerProps,
  Controller,
} from "react-hook-form";
import { createField as primitiveCreateField, useField } from "./field";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "chadcn/lib/zod";
import { useParentFormGroup } from "./form-group";
import React from "react";

export interface FormSchema<I extends string, ZodFields extends ZodTypeAny> {
  id: I;
  fields: ZodFields;
  __inferFields: z.infer<ZodFields>;
}

export type OnSubmitFn<Fields extends FieldValues> = (
  data: Fields
) => Promise<unknown> | unknown;

export type UseFormProps<
  Id extends string,
  ZodFields extends ZodTypeAny,
> = Omit<
  useReactHookFormProps<FormSchema<Id, ZodFields>["__inferFields"]>,
  "resolver"
> & {
  schema: FormSchema<Id, ZodFields>;
};

export type FormProps<ZodFields extends ZodTypeAny> = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "id"
> & {
  hform: UseFormReturn;
  onSubmit?: OnSubmitFn<z.infer<ZodFields>>;
  onError?: (error: any) => void;
};

export type UseFormReturn<
  Id extends string = string,
  ZodFields extends ZodTypeAny = ZodTypeAny,
> = ReturnType<typeof useForm<Id, ZodFields>>;

export const FormContext = createContext<UseFormReturn>(null!);

export const useParentForm = () => useContext(FormContext);

export function useForm<Id extends string, ZodFields extends ZodTypeAny>({
  schema,
  ...useReactHookFormProps
}: UseFormProps<Id, ZodFields>) {
  type Fields = typeof schema.__inferFields;

  const hookform = useReactHookForm<Fields>({
    ...useReactHookFormProps,
    resolver: zodResolver(schema.fields as any),
  });

  const formGroup = useParentFormGroup();

  const form = {
    schema,
    ...hookform,
  };

  useEffect(() => {
    if (formGroup) {
      formGroup._control.updateSlot(form.schema.id, {
        trigger: form.trigger,
        getValues: form.getValues,
      });

      const currentFormValues = formGroup.state.values?.[form.schema.id];

      if (currentFormValues) {
        hookform.reset(currentFormValues);
      }
    }
  }, []);

  return form;
}

export function Form<ZodFields extends ZodTypeAny>({
  onSubmit,
  onError,
  hform,
  ...props
}: FormProps<ZodFields>) {
  return (
    <FormContext.Provider value={hform as any as UseFormReturn}>
      <form
        onSubmit={
          onSubmit &&
          hform?.handleSubmit(async (data) => {
            hform.trigger();

            const submit = async () => onSubmit(data);

            return submit().catch((error) => onError?.(error));
          })
        }
        id={hform.schema.id}
        {...props}
      />
    </FormContext.Provider>
  );
}

export function Control({
  children,
  ...props
}: Omit<ControllerProps, "render" | "name" | "control"> & {
  children: (
    props: Parameters<ControllerProps["render"]>[0]
  ) => React.ReactElement;
}) {
  const { control } = useParentForm();

  const { name } = useField();

  return (
    <Controller control={control} name={name} {...props} render={children} />
  );
}

export function bootstrapForm<Id extends string, T extends ZodTypeAny>(
  id: Id,
  schema: (zod: typeof z) => T
) {
  type Fields = z.infer<ReturnType<typeof schema>>;

  const Field = primitiveCreateField<Fields>();

  return {
    schema: {
      id,
      fields: schema(z),
      __inferFields: {} as Fields,
    },
    Field,
  };
}
