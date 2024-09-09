// client
"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

export function Date({
  date,
  format = "DD/MM/YYYY HH:mm:ss",
  localTime = false,
}: {
  date: Date;
  format?: string;
  localTime?: boolean;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? dayjs(date).local().format(format) : "";
}
