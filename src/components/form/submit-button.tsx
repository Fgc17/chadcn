// client
"use client";
import { Button, ButtonProps } from "../button";
import { useParentForm } from "./form";

export function SubmitButton(
  props: ButtonProps & {
    hform?: { formState: { isSubmitting: boolean }; id: string };
  }
) {
  const _form = useParentForm();

  const form = props.hform ?? _form;

  const isLoading = form?.formState?.isSubmitting;

  return <Button {...props} loading={isLoading} form={form.id} type="submit" />;
}
