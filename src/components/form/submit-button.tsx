// client
"use client";
import { Button, ButtonProps } from "../button";
import { useParentForm } from "./form";

export function SubmitButton(
  props: ButtonProps & {
    hform?: {
      id: string;
      formState: { isSubmitting: boolean };
      schema: { id: string };
    };
  }
) {
  const _form = useParentForm();

  const form = props.hform ?? _form;

  const isLoading = form?.formState?.isSubmitting;

  return (
    <Button
      {...props}
      loading={isLoading}
      form={form.schema.id}
      type="submit"
    />
  );
}
