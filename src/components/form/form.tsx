import { createContext, useContext, useId, useEffect } from "react";
import {
  useForm as useReactHookForm,
  UseFormProps as useReactHookFormProps,
  FieldValues,
  ControllerProps,
  Controller,
} from "react-hook-form";
import { createField as primitiveCreateField, useField } from "./field";
import { z, ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParentFormGroup } from "./form-group";

export type OnSubmitFn<Fields extends FieldValues> = (data: Fields) => void;

export type UseFormProps<Fields extends FieldValues> = Omit<
  useReactHookFormProps<Fields>,
  "resolver"
> & {
  id?: string;
  onSubmit?: OnSubmitFn<Fields>;
  schema:
    | ZodObject<ZodRawShape, "strip", ZodTypeAny, Fields, Fields>
    | ZodEffects<ZodObject<ZodRawShape, "strip", ZodTypeAny, Fields, Fields>>;
};

export type FormProps<Fields extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "id" | "ref"
> & {
  innerRef?: React.RefObject<HTMLFormElement>;
  hform: UseFormReturn<Fields>;
  onSubmit?: (data: Fields) => void;
};

export type UseFormReturn<Fields extends FieldValues = FieldValues> =
  ReturnType<typeof useForm<Fields>>;

export const FormContext = createContext<UseFormReturn>(null!);

export const useParentForm = () => useContext(FormContext);

export function useForm<F extends FieldValues>({
  schema,
  onSubmit,
  ...useReactHookFormProps
}: UseFormProps<F>) {
  type Fields = F | z.infer<typeof schema>;

  const id = useId();

  const hookform = useReactHookForm<Fields>({
    ...useReactHookFormProps,
    resolver: zodResolver(schema as any),
  });

  const parentFormGroup = useParentFormGroup();

  const createField = primitiveCreateField<Fields>;

  const form = {
    id: useReactHookFormProps.id ?? id,
    createField,
    schema,
    onSubmit,
    ...hookform,
  };

  useEffect(() => {
    if (!parentFormGroup) return;

    parentFormGroup.updateForm(form as any);
  }, [form.formState.errors, form.formState.isValid]);

  return form;
}

export function Form<Fields extends FieldValues>({
  onSubmit,
  hform,
  innerRef,
  ...props
}: FormProps<Fields>) {
  return (
    <FormContext.Provider value={hform as any as UseFormReturn}>
      <form
        onSubmit={
          onSubmit &&
          hform?.handleSubmit((data) => {
            hform.trigger();
            return onSubmit ? onSubmit(data) : hform.onSubmit?.(data);
          })
        }
        ref={innerRef}
        id={hform.id}
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

export function bootstrapForm<T extends ZodRawShape>(
  ...args: Parameters<typeof z.object<T>>
) {
  const schema = z.object(...args);

  type Fields = z.infer<typeof schema>;

  const Field = primitiveCreateField<Fields>();

  return {
    schema,
    Field,
  };
}
