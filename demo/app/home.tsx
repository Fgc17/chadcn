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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
  CommandGroup,
  Select,
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  MobileSidebar,
  SidebarBody,
  SidebarDivider,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  Icon,
  SidebarSpacer,
  SidebarFooter,
  MobileSidebarContent,
  MobileSidebarTrigger,
  MobileSidebarClose,
  Alert,
  AlertTitle,
  AlertDescription,
} from "chadcn";
import { BookIcon, XIcon } from "lucide-react";

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
          <MobileSidebar>
            <MobileSidebarTrigger>
              <Button variant="outline">Open sidebar</Button>
            </MobileSidebarTrigger>
            <MobileSidebarContent>
              <SidebarHeader className="p-4">
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 font-medium text-gray-700">
                    <BookIcon className="size-6" />
                    <SidebarLabel>Sidebar</SidebarLabel>
                  </p>
                  <MobileSidebarClose>
                    <XIcon className="size-6 text-black" />
                  </MobileSidebarClose>
                </div>
              </SidebarHeader>
              <SidebarBody>
                <SidebarSection>
                  <SidebarItem href="/home">
                    <Icon name="House" />
                    <SidebarLabel>Home</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/events" current>
                    <Icon name="Calendar" />
                    <SidebarLabel>Events</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/orders">
                    <Icon name="Ticket" />
                    <SidebarLabel>Orders</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>

                <SidebarSpacer />

                <SidebarSection>
                  <SidebarItem href="/broadcasts">
                    <Icon name="Megaphone" />
                    <SidebarLabel>Broadcasts</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/settings">
                    <Icon name="Settings" />
                    <SidebarLabel>Settings</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
              </SidebarBody>
              <SidebarFooter>
                <Alert>
                  <AlertTitle>Footer</AlertTitle>
                  <AlertDescription>
                    This is a description for the alert.
                  </AlertDescription>
                </Alert>
              </SidebarFooter>
            </MobileSidebarContent>
          </MobileSidebar>
          <Tabs className={"w-full"}>
            <TabList className="grid w-full grid-cols-3">
              <Tab>Components</Tab>
              <Tab>Form</Tab>
              <Tab>Typography</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="space-y-4">
                <Command className="border shadow-md">
                  <CommandInput placeholder="Type a Command or search..." />
                  <CommandList>
                    <CommandGroup heading="Group"></CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="People">
                      <CommandItem value="4">
                        <Icon name="User" />
                        <span>Profile</span>
                      </CommandItem>
                      <CommandItem value="5">
                        <Icon name="CreditCard" />
                        <span>Billing</span>
                      </CommandItem>
                      <CommandItem value="6">
                        <Icon name="Settings" />
                        <span>Settings</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
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
                <Collapsible>
                  <CollapsibleTrigger as="div">
                    <Button variant={"outline"}>Collapsible trigger</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div>Collapsible content</div>
                  </CollapsibleContent>
                </Collapsible>
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
