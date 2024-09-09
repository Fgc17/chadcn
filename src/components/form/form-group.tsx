// client
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UseFormReturn } from "./form";
import _ from "lodash";
import { usePaginationUtils } from "../../hooks/use-pagination-utils";
import { FieldValues } from "react-hook-form";
import { useSteps } from "@/hooks/use-steps";
import { MapObject } from "@/lib/utils";

export type FormGroupFormData<T extends FieldValues> = {
  id: string;
  onSubmit: () => void;
  handleSubmit: UseFormReturn["handleSubmit"];
  reset: UseFormReturn["reset"];
  formState: {
    errors: Record<string, any>;
    isValid: boolean;
    isSubmitting: boolean;
  };
  values: T;
};

export const FormGroupContext = createContext<ReturnType<typeof useFormGroup>>(
  null!
);

export function useParentFormGroup<T extends Record<string, FieldValues>>() {
  return useContext(FormGroupContext) as any as ReturnType<
    typeof useFormGroup<T>
  >;
}

const defaultForm: Record<keyof FormGroupFormData<FieldValues>, any> = {
  id: "xxxxxxx",
  onSubmit: () => {},
  handleSubmit: () => {},
  reset: () => {},
  formState: {
    errors: {},
    isValid: false,
  },
  values: {},
};

export function useFormGroup<Forms extends Record<string, FieldValues>>() {
  const [forms, setForms] = useState<
    MapObject<{
      [K in keyof Forms]: FormGroupFormData<Forms[K]>;
    }>
  >(new Map());

  const insertForm = (id: string) => {
    // @ts-ignore - I don't know why this is not working
    setForms((prevForms) => {
      const newForms = new Map(prevForms);
      return newForms.set(id, defaultForm);
    });
  };

  const updateForm = (form: UseFormReturn) => {
    // @ts-ignore - I don't know why this is not working
    setForms((prevForms) => {
      const newForms = new Map(prevForms);
      return newForms.set(form.id, {
        id: form.id,
        values: form.getValues(),
        handleSubmit: form.handleSubmit,
        reset: form.reset,
        onSubmit: form.onSubmit as any,
        formState: {
          errors: form.formState.errors,
          isValid: form.formState.isValid,
          isSubmitting: form.formState.isSubmitting,
        },
      } as any);
    });
  };

  const updateFormValues = (form: UseFormReturn) => {
    // @ts-ignore - I don't know why this is not working
    setForms((prevForms) => {
      const newForms = new Map(prevForms);
      const formId = form.id;
      const formValues = form.getValues();
      const currentForm = newForms.get(formId);
      if (currentForm) {
        newForms.set(formId, {
          ...currentForm,
          values: formValues,
        });
      }
      return newForms;
    });
  };

  const { currentStep, walk } = useSteps({
    currentStep: 0,
    stepCount: forms.size,
  });

  const formIds = Array.from(forms.keys());

  const currentFormId = formIds[currentStep]!;

  const next = () => walk(1);

  const previous = () => walk(-1);

  const {
    isCurrent,
    isFirstPage: isFirst,
    isLastPage: isLast,
  } = usePaginationUtils({
    currentPageIndex: currentStep,
    pageCount: forms.size,
  });

  const getValues = (options?: { groupById?: boolean }) => {
    const formsArray = Array.from(forms.values());

    return formsArray.reduce(
      (acc, form) => ({
        ...acc,
        ...(options?.groupById
          ? { ...form.values }
          : { [form.id]: form.values }),
      }),
      {}
    );
  };

  return {
    forms,
    insertForm,
    getValues,
    updateForm,
    updateFormValues,
    currentStep,
    currentForm:
      forms.get(currentFormId) ??
      (defaultForm as FormGroupFormData<FieldValues>),
    formControl: {
      next,
      previous,
      isCurrent: (id: string) => isCurrent(formIds.indexOf(id)),
      isLast: isLast(currentStep),
      isFirst: isFirst(currentStep),
    },
  };
}

export function FormGroup({
  children,
  formGroup,
}: {
  children: React.ReactNode;
  formGroup: any; // I don't know how to type this
}) {
  return (
    <FormGroupContext.Provider value={formGroup}>
      {children}
    </FormGroupContext.Provider>
  );
}

export function FormSlot({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const formGroup = useParentFormGroup();

  useEffect(() => {
    formGroup.insertForm(id);
  }, []);

  const shouldShow = formGroup.formControl.isCurrent(id);

  return shouldShow ? children : null;
}
