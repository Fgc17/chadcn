import { useState, createContext, useContext } from "react";
import { FieldValues } from "react-hook-form";
import { useSteps } from "@/hooks/use-steps";
import { MapObject } from "@/lib/utils";

export const FormGroupContext = createContext<ReturnType<typeof useFormGroup>>(
  null!
);

export function useParentFormGroup<T extends Record<string, FieldValues>>() {
  return useContext(FormGroupContext) as any as ReturnType<
    typeof useFormGroup<T>
  >;
}

const defaultForm = {};

export function useFormGroup<Forms extends { [key: string]: FieldValues }>() {
  const [forms, setForms] = useState<MapObject<Forms>>(new Map());

  const insertForm = (id: string) => {
    setForms((prevForms) => {
      const newForms = new Map(prevForms);
      return newForms.set(id, defaultForm as any);
    });
  };

  const updateFormValues = (formId: keyof Forms, values:  ) => {
    setForms((prevForms) => {
      const newForms = new Map(prevForms);
      const currentForm = newForms.get(formId);
      if (currentForm) {
        newForms.set(formId, { ...currentForm, values });
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

  return {
    state: {
      forms: forms as MapObject<Fields>,
      insert: insertForm,
      update: updateFormValues,
    },
    current: {
      step: currentStep,
      values: forms.get(currentFormId) ?? {},
      id: currentFormId,
    },
    control: {
      next,
      previous,
      isCurrent: (id: string) => formIds.indexOf(id) === currentStep,
    },
  };
}
