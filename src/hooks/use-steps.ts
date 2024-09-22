"use client";

import { createContext, useEffect, useState } from "react";

export type StepContext = {
  stepCount: number;
  currentStep: number;
  cyclic: boolean;
  walk: (vector: number) => void;
  dryWalk: (vector: number) => number;
  setStepCount: (stepCount: number) => void;
  getPrevStep: () => number;
  getNextStep: () => number;
  setCurrentStep: (currentStep: number) => void;
};

export type UseStepProps = {
  stepCount?: number;
  currentStep?: number;
  cyclic?: boolean;
};

const StepContext = createContext<StepContext>(null!);

export function useSteps({
  stepCount = 0,
  currentStep = 0,
  cyclic = false,
}: UseStepProps = {}): StepContext {
  const [stepState, setStepState] = useState({
    stepCount,
    currentStep,
    cyclic,
  });

  useEffect(() => {
    if (stepState.stepCount !== stepCount) {
      setStepState((prevState) => ({
        ...prevState,
        stepCount,
      }));
    }
  }, [stepCount, stepState.stepCount]);

  const setStepCount = (stepCount: number) =>
    setStepState((prevState) => ({ ...prevState, stepCount }));

  const setCurrentStep = (currentStep: number) =>
    setStepState((prevState) => ({ ...prevState, currentStep }));

  const dryWalk = (vector: number) => {
    let newIndex;
    const maxIndex = stepState.stepCount - 1;

    if (stepState.cyclic) {
      newIndex =
        (stepState.currentStep + vector + maxIndex + 1) % (maxIndex + 1);
    } else {
      newIndex = stepState.currentStep + vector;
      if (newIndex < 0) newIndex = -1;
      else if (newIndex > maxIndex) newIndex = maxIndex;
    }

    return newIndex;
  };

  const walk = (vector: any) => {
    const newIndex = dryWalk(vector);
    setCurrentStep(newIndex);
  };

  const getPrevStep = () => dryWalk(-1);
  const getNextStep = () => dryWalk(1);

  return {
    ...stepState,
    setStepCount,
    setCurrentStep,
    walk,
    dryWalk,
    getPrevStep,
    getNextStep,
  };
}
