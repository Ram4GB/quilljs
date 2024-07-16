"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const WrapSSR: FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <div>{children}</div>;
};

export default WrapSSR;
