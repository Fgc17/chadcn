import { useEffect, useState } from "react";
import { Input } from "@/components/form/input";
import { z } from "zod";

import {
  Page,
  Section,
  Subsection,
  Subsubsection,
  Text,
  Tasks,
  Task,
  roman,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Button,
  Calendar,
  Description,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  FieldGroup,
  Fieldset,
  Form,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  RadioSlot,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Slider,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  bootstrapForm,
  useForm,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxSeparator,
  ComboboxOptionGroup,
  Select,
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "chadcn";
import {
  Cake,
  Calculator,
  CheckIcon,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

const items = Array.from({ length: 50 }).map((_, i) => String(i));

const { Field, schema } = bootstrapForm({
  email: z.string().email(),
  isUnderage: z.boolean(),
  type: z.enum(["a", "b"]),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  country: z.string(),
});

function Home() {
  const [filteredItems, setFilteredItems] = useState(items);

  const form = useForm({
    schema,
    mode: "onChange",
  });

  const people = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
  ];

  const [countries, setCountries] = useState<string[]>([]);

  const getCountries = async (query?: string) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/${query ? `name/${query}` : "all"}`
    ).then((r) => (r.ok ? r : null));

    if (!response) return setCountries([]);

    const data = await response.json();

    return setCountries(data.map((c) => c.name.official));
  };

  useEffect(() => {
    getCountries();
  }, []);

  console.log(form.watch());

  return (
    <div className="z-20 mx-auto h-svh bg-white md:flex md:max-w-md md:shadow-xl">
      <div className="flex h-full w-full flex-col overflow-y-auto bg-white">
        <div className="flex-grow space-y-4 px-4 py-3 pb-12">
          <Tabs className={"w-full"}>
            <TabList className="grid w-full grid-cols-3">
              <Tab>Components</Tab>
              <Tab>Form</Tab>
              <Tab>Typography</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="space-y-4">
                <Combobox className="rounded-lg border shadow-md">
                  <ComboboxInput placeholder="Type a Combobox or search..." />
                  <ComboboxOptions>
                    <ComboboxOptionGroup heading="Group"></ComboboxOptionGroup>
                    <ComboboxSeparator />
                    <ComboboxOptionGroup heading="People">
                      <ComboboxOption value="4">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </ComboboxOption>
                      <ComboboxOption value="5">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </ComboboxOption>
                      <ComboboxOption value="6">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </ComboboxOption>
                    </ComboboxOptionGroup>
                  </ComboboxOptions>
                </Combobox>
                <Sheet>
                  <SheetTrigger>Open sheet</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <Calendar mode="single" className="rounded-md border" />
                <Popover>
                  <PopoverTrigger>Open Popover</PopoverTrigger>
                  <PopoverContent>
                    <div className="">Popover content</div>
                  </PopoverContent>
                </Popover>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Disclosure>
                  <DisclosureTrigger as="div">
                    <Button variant={"outline"}>Disclosure trigger</Button>
                  </DisclosureTrigger>
                  <DisclosureContent>
                    <div>Disclosure content</div>
                  </DisclosureContent>
                </Disclosure>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default, but you can disable it
                      if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabPanel>
              <TabPanel>
                <Subsection>Form</Subsection>
                <Text>
                  Here's a bunch of different form elements. This is a text.
                </Text>
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
              </TabPanel>
              <TabPanel className="space-y-3 py-4">
                <Page>Chadcn</Page>
                <Section>Home</Section>
                <Subsection>
                  Welcome to the Chadcn design system demo
                </Subsection>
                <Subsubsection>Introduction</Subsubsection>
                <Text>
                  This is a demo of all the components available in the design
                </Text>
                <Tasks columns={2} label={(i) => `${roman(i)})`}>
                  <Task>First task</Task>
                  <Task label="xd">Second task with custom bullet</Task>
                  <Task>Third task</Task>
                  <Task>Fifth task</Task>
                </Tasks>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Home;
