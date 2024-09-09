import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { PrimitiveSwitch, Switch } from "@/components/form/switch";
import { useState } from "react";
import { DrawerDemo } from "./components/drawer-demo";
import { DropdownDemo } from "./components/dropdown-demo";
import { Badge } from "@/components/badge";
import { Combobox, ComboboxItem } from "@/components/combobox";
import { Input, PrimitiveInput } from "@/components/form/input";
import { z } from "zod";
import { bootstrapForm, Form, useForm } from "@/components/form/form";
import {
  Description,
  FieldGroup,
  Fieldset,
  Label,
} from "@/components/form/field";
import { Radio, RadioGroup, RadioSlot } from "@/components/form/radio";

const items = Array.from({ length: 50 }).map((_, i) => String(i));

const { Field, schema } = bootstrapForm({
  email: z.string().email(),
  isUnderage: z.boolean(),
  type: z.enum(["a", "b"]),
});

function Home() {
  const [count, setCount] = useState(0);

  const [filteredItems, setFilteredItems] = useState(items.slice(0, 12));

  const form = useForm({
    schema,
    mode: "onChange",
  });

  console.log(form.watch());

  return (
    <div className="flex h-screen w-full items-center justify-center space-x-10">
      <Calendar mode="single" className="rounded-md border" />

      <div className="space-x-4 space-y-10">
        <PrimitiveSwitch />
        <DropdownDemo />
        <Button variant={"destructive"} onClick={() => setCount(count + 1)}>
          Click me
        </Button>
        <DrawerDemo />
        <PrimitiveInput />
        <div>
          <Badge variant="green">Vendido</Badge>
        </div>
        <div>
          <Combobox
            placeholder="Escolher"
            searchPlaceholder="Buscar"
            emptyState="Nada encontrado"
            onSearch={(query) => {
              if (query) {
                setFilteredItems(
                  items.filter((i) =>
                    i.toLowerCase().includes(query.toLowerCase())
                  )
                );
              } else {
                setFilteredItems(items.slice(0, 10));
              }
            }}
          >
            {filteredItems.map((v) => (
              <ComboboxItem key={v} value={String(v)}>
                Item {v}
              </ComboboxItem>
            ))}
          </Combobox>
        </div>
        <p className="text-red-500">{count}</p>
      </div>
      <Form hform={form}>
        <Fieldset>
          <FieldGroup>
            <Field name="email" aria-disabled>
              <Label>Nome</Label>
              <Input />
              <Description>This is your public display name.</Description>
            </Field>
            <Field name="isUnderage" variant="switch">
              <Label>Underage</Label>
              <Switch />
              <Description>Are you under 18 years old?</Description>
            </Field>
            <Field name="type">
              <Label>Type</Label>
              <RadioGroup>
                <RadioSlot>
                  <Radio color="green" value="a" />
                  <Label>A</Label>
                  <Description>Some description</Description>
                </RadioSlot>
                <RadioSlot>
                  <Radio color="black" value="b" />
                  <Label>B</Label>
                  <Description>Some description</Description>
                </RadioSlot>
              </RadioGroup>
              <Description>Select the type</Description>
            </Field>
          </FieldGroup>
        </Fieldset>
      </Form>
    </div>
  );
}

export default Home;
