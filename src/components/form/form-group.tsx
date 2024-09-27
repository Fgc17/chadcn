"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { UseFormGetValues, UseFormTrigger } from "react-hook-form";
import { useSteps } from "chadcn/hooks/use-steps";
import { cn, MapObject } from "chadcn/lib/utils";
import { usePaginationUtils } from "chadcn/hooks/use-pagination-utils";
import _, { isEmpty } from "lodash";
import { Button, ButtonProps } from "../button";
import { FormSchema } from "./form";
import { ZodTypeAny } from "zod";

export const FormGroupContext = createContext<ReturnType<typeof useFormGroup>>(
  null!
);

export type FormSlot<Fields extends any> = {
  id: keyof any;
  trigger: UseFormTrigger<{
    [K in keyof Fields]: Fields[K];
  }>;
  getValues: UseFormGetValues<{
    [K in keyof Fields]: Fields[K];
  }>;
};

export function useParentFormGroup<
  Schemas extends Record<string, FormSchema<string, ZodTypeAny>>,
>() {
  return useContext(FormGroupContext) as any as ReturnType<
    typeof useFormGroup<Schemas>
  >;
}

export function useFormGroup<
  Schemas extends Record<string, FormSchema<string, ZodTypeAny>>,
>(schemas: Schemas) {
  type FormGroup = {
    [K in keyof Schemas as Schemas[K]["id"]]: Schemas[K]["__inferFields"];
  };

  type FormGroupSlot = {
    [K in keyof FormGroup]: FormSlot<FormGroup[K]>;
  };

  type ValueStore = {
    [K in keyof FormGroup]: FormGroup[K];
  };

  const [formSlots, setFormSlots] = useState<MapObject<FormGroupSlot>>(
    new Map()
  );

  const [valueStore, setValueStore] = useState<ValueStore>(null!);

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

  function updateValues<FormId extends keyof ValueStore>(
    id: FormId,
    values: ValueStore[FormId]
  ) {
    setValueStore((prev) => ({
      ...prev,
      [id]: values,
    }));
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

  const formGroup = {
    _control: {
      formSlots,
      registerSlot,
      updateSlot,
      updateValues,
    },
    state: {
      values: valueStore,
    },
    current: formSlots.get(currentFormId),
    switch: {
      next,
      previous,
      currentStep,
      isCurrent: (id: keyof FormGroup) => isCurrent(formIds.indexOf(id)),
      isLast: isLast(currentStep),
      isFirst: isFirst(currentStep),
    },
  };

  return formGroup;
}

export function bootstrapFormGroup<
  T extends { [K in keyof T]: FormSchema<any, ZodTypeAny> },
>(schemas: T) {
  const FormSlotComp = (props: {
    id: T[keyof T]["id"];
    children: React.ReactNode;
  }) => {
    return <FormSlot {...props} />;
  };

  return {
    schemas,
    FormSlot: FormSlotComp,
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

function FormSlot({ id, children }: { id: string; children: React.ReactNode }) {
  const formGroup = useParentFormGroup();

  useEffect(() => {
    if (formGroup) {
      !formGroup._control.formSlots.has(id) &&
        formGroup._control.registerSlot(id);
    }
  }, []);

  const shouldShow = formGroup.switch.isCurrent(id);

  const shouldRender =
    !isEmpty(formGroup._control.formSlots.get(id)?.getValues()) || shouldShow;

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
  const { isFirst, previous } = formGroup.switch;

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
  const { isLast, next } = formGroup.switch;

  if (isLast) {
    return null;
  }

  const handleNext = async () => {
    const isValid = await formGroup.current.trigger();
    if (isValid) {
      formGroup._control.updateValues(
        formGroup.current.id as string,
        formGroup.current.getValues()
      );
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
  const { isFirst } = formGroup.switch;

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
  const { isLast } = formGroup.switch;

  if (!isLast) {
    return null;
  }

  const handleSubmit = async () => {
    const isValid = await formGroup.current.trigger();
    if (isValid) {
      const values = formGroup.state.values;
      onSubmit?.(values);
    }
  };

  return <Button children={"Enviar"} {...props} onClick={handleSubmit} />;
}
