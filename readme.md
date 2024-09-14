<div align="center">
  <h1> 🗿 Chadcn </h1>
  🍷 An UI library for dealing with real world stuff, based on <a href="https://github.com/shadcn-ui/ui">shadcn/ui</a> <br/>
</div>

## 🌐 Installation

Just copy and paste the files you need.

## 🔑 Key features

#### 1. Better forms

Here's a simple form using `chadcn`:

```tsx
const { Field, schema } = bootstrapForm({
  email: z.string().email(),
  isUnderage: z.boolean(),
  type: z.enum(["a", "b"]),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  country: z.string(),
});

function CreateForm() {
  const form = useForm({
    schema,
    mode: "onChange",
  });

  return (
    <Form hform={form} className="mt-6">
      <Fieldset>
        <FieldGroup>
          <Field name="country">
            <Select
              searchable
              placeholder="Choose an item"
              items={countries}
              onSearch={(v) => getCountries(v)}
            >
              {(item) => <>{item}</>}
            </Select>
            <ErrorMessage />
          </Field>
          <Slider onValueChange={(v) => console.log(v)} />
          <Field name="email">
            <Label>Email</Label>
            <Input />
            <Description>This is your public email.</Description>
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
                <Radio variant="green" value="a" />
                <Label>A</Label>
                <Description>Some description</Description>
              </RadioSlot>
              <RadioSlot>
                <Radio variant="black" value="b" />
                <Label>B</Label>
                <Description>Some description</Description>
              </RadioSlot>
            </RadioGroup>
            <Description>Select the type</Description>
          </Field>
          <Field name="password">
            <Label>Password</Label>
            <Textarea />
            <Description>Textarea passwords are cool!</Description>
          </Field>
        </FieldGroup>
      </Fieldset>
    </Form>
  );
}
```

As you can see, forms are intuitive and work out of the box with typesafe validation.

#### 2. Complete Select Component

Chadcn provides a `Select` component that is responsive (vaul and popover), searchable (async), and supports multiple selections.

For this, I've rebuilt shadcn `command` component using headlessui combobox.

This component has the features I've always wanted in a select component, and I'm excited to share it with you.

#### 3. Typography System

Chadcn does not solve typography yet, but here's a sneak peek at what I'm working on:

- `<Page />` for `h1`
- `<Section />` for `h2`
- `<Subsection />` for `h3`
- `<Subsubsection />` for `h4`
- `<Text />` for paragraphs (`p`)

This is inspired by LaTeX.

The goal is to make things a little easier to follow, I've always found `h1`, `h2`, `h3`, `h4` to be confusing.

Additionally, the library provides a `Tasks` component, maybe we will finally fix the `ul` and `ol` tags.

**This is a work in progress**

#### 4. Active Development

I use this library in my projects, so I'm actively developing it. Any `shadcn` updates will be merged into `chadcn` as soon as possible.

If you want to contribute, feel free to open a PR.
