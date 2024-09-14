"use client";

export function SidebarStackedLayout({
  sidebar,
  children,
}: React.PropsWithChildren<{
  sidebar?: React.ReactNode;
}>) {
  return (
    <div className="relative isolate flex min-h-[calc(100dvh-50px)] w-full flex-col bg-white lg:min-h-[calc(100dvh-46px)] lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <div className="lg:flex lg:flex-1 lg:px-2 ">
        {sidebar}
        <div className="my-2 grow px-6 pb-2 pt-6 lg:rounded-lg lg:bg-white lg:p-10 lg:pb-6 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="lg:max-w-content max-w-8xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
