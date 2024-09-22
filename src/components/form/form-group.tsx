"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { FieldValues, UseFormGetValues, UseFormTrigger } from "react-hook-form";
import { useSteps } from "chadcn/hooks/use-steps";
import { cn, MapObject } from "chadcn/lib/utils";
import { usePaginationUtils } from "chadcn/hooks/use-pagination-utils";
import { isEmpty } from "lodash";
import { Button, ButtonProps } from "../button";

export const FormGroupContext = createContext<ReturnType<typeof useFormGroup>>(
  null!
);

export type FormSlot<Fields extends FieldValues> = {
  id: keyof any;
  trigger: UseFormTrigger<Fields>;
  getValues: UseFormGetValues<Fields>;
};

export type FormGroupType = {
  [key: string]: FieldValues;
};

export function useParentFormGroup<FormGroup extends FormGroupType = any>() {
  return useContext(FormGroupContext) as any as ReturnType<
    typeof useFormGroup<FormGroup>
  >;
}

export function useFormGroup<FormGroup extends FormGroupType = any>() {
  type FormGroupSlot = {
    [key in keyof FormGroup]: FormSlot<FormGroup[key]>;
  };

  const [formSlots, setFormSlots] = useState<MapObject<FormGroupSlot>>(
    new Map()
  );

  function registerSlot(id: keyof FormGroup) {
    setFormSlots((prevForms) => {
      const newForms = new Map(prevForms) as MapObject<FormGroupSlot>;
      return newForms.set(id, {
        id,
        getValues: (() => {}) as any,
        trigger: (() => {}) as any,
      });
    });
  }

  function updateSlot<Id extends keyof FormGroup>(
    id: Id,
    methods: Omit<FormGroup[Id], "id">
  ) {
    return setFormSlots((prevForms) => {
      const newForms = new Map(prevForms) as MapObject<FormGroupSlot>;
      const currentForm = newForms.get(id);
      if (currentForm) {
        newForms.set(id, { ...currentForm, ...methods });
      }
      return newForms;
    });
  }

  function getValues(options?: { groupById?: boolean }) {
    const formsArray = Array.from(formSlots.values());

    return formsArray.reduce(
      (acc, form) => ({
        ...acc,
        ...(options?.groupById
          ? { ...form.getValues() }
          : { [form.id]: form.getValues() }),
      }),
      {}
    );
  }

  const { currentStep, stepCount, walk } = useSteps({
    currentStep: 0,
    stepCount: formSlots.size,
  });

  const formIds = Array.from(formSlots.keys());

  const currentFormId = formIds[currentStep]!;

  const next = () => walk(1);

  const previous = () => walk(-1);

  const {
    isCurrent,
    isFirstPage: isFirst,
    isLastPage: isLast,
  } = usePaginationUtils({
    currentPageIndex: currentStep,
    pageCount: stepCount,
  });

  return {
    state: {
      getValues,
      forms: formSlots,
      registerSlot,
      updateSlot,
    },
    current: formSlots.get(currentFormId),
    control: {
      next,
      previous,
      currentStep,
      isCurrent: (id: keyof FormGroup) => isCurrent(formIds.indexOf(id)),
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
  formGroup: any;
}) {
  return (
    <FormGroupContext.Provider value={formGroup as any}>
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
    if (formGroup) {
      formGroup.state.registerSlot(id);
    }
  }, []);

  const shouldShow = formGroup.control.isCurrent(id);

  const shouldRender =
    !isEmpty(formGroup.state.forms.get(id)?.getValues()) || shouldShow;

  return shouldRender ? (
    <div className={cn(shouldShow ? "" : "hidden")}>{children}</div>
  ) : null;
}

export function FormGroupPrevious({
  ...props
}: {
  previousIndicator?: React.ReactNode;
} & ButtonProps) {
  const formGroup = useParentFormGroup();
  const { isFirst, previous } = formGroup.control;

  if (isFirst) {
    return null;
  }

  const handlePrevious = () => {
    previous();
  };

  return (
    <Button
      variant="plain"
      children={"Voltar"}
      {...props}
      onClick={handlePrevious}
    />
  );
}

export function FormGroupNext({
  ...props
}: {
  nextIndicator?: React.ReactNode;
} & ButtonProps) {
  const formGroup = useParentFormGroup();
  const { isLast, next } = formGroup.control;

  if (isLast) {
    return null;
  }

  const handleNext = async () => {
    const isValid = await formGroup.current.trigger();
    if (isValid) {
      next();
    }
  };

  return <Button children={"Próximo"} {...props} onClick={handleNext} />;
}

export function FormGroupExit({
  onExit,
  ...props
}: {
  exitIndicator?: React.ReactNode;
  onExit?: () => void;
} & ButtonProps) {
  const formGroup = useParentFormGroup();
  const { isFirst } = formGroup.control;

  const handleExit = () => {
    onExit?.();
  };

  if (!isFirst) {
    return;
  }

  return (
    <Button variant="plain" children={"Sair"} {...props} onClick={handleExit} />
  );
}

export function FormGroupSubmit({
  onSubmit,
  ...props
}: {
  onSubmit?: (values: any) => void;
} & ButtonProps) {
  const formGroup = useParentFormGroup();
  const { isLast } = formGroup.control;

  if (!isLast) {
    return null;
  }

  const handleSubmit = async () => {
    const isValid = await formGroup.current.trigger();
    if (isValid) {
      const values = formGroup.state.getValues();
      onSubmit?.(values);
    }
  };

  return <Button children={"Enviar"} {...props} onClick={handleSubmit} />;
}
