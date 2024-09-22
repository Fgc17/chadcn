"use client";
import * as React from "react";

import { cn } from "chadcn/lib/utils";
import { useMediaQuery } from "chadcn/hooks/use-media-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./drawer";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalClose,
} from "./modal";

const DialogContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: true,
});

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [controlledOpen, setControlledOpen] = React.useState(open);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <DialogContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <Modal
          open={open ?? controlledOpen}
          onOpenChange={onOpenChange ?? setControlledOpen}
        >
          {children}
        </Modal>
      ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      )}
    </DialogContext.Provider>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

export function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalTrigger asChild={asChild}>{children}</ModalTrigger>
  ) : (
    <DrawerTrigger asChild={asChild}>{children}</DrawerTrigger>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogContent({ children, className }: DialogContentProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalContent className={className}>{children}</ModalContent>
  ) : (
    <DrawerContent className={className}>{children}</DrawerContent>
  );
}

type DialogHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogHeader({ children, className }: DialogHeaderProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalHeader className={className}>{children}</ModalHeader>
  ) : (
    <DrawerHeader className={className}>{children}</DrawerHeader>
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalTitle className={className}>{children}</ModalTitle>
  ) : (
    <DrawerTitle className={className}>{children}</DrawerTitle>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogDescription({
  children,
  className,
}: DialogDescriptionProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalDescription className={className}>{children}</ModalDescription>
  ) : (
    <DrawerDescription className={className}>{children}</DrawerDescription>
  );
}

type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
};

export function DialogFooter({
  children,
  className,
  reverse,
}: DialogFooterProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <div className={cn("modal-footer", className)}>{children}</div>
  ) : (
    <DrawerFooter
      className={cn("drawer-footer", reverse && "flex-col-reverse", className)}
    >
      {children}
    </DrawerFooter>
  );
}

type DialogCloseProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

export function DialogClose({ children, asChild }: DialogCloseProps) {
  const { isDesktop } = React.useContext(DialogContext);

  return isDesktop ? (
    <ModalClose asChild={asChild}>{children}</ModalClose>
  ) : (
    <DrawerClose asChild={asChild}>{children}</DrawerClose>
  );
}
