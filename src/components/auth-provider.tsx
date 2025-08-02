"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

export function AuthProvider({
  children,
  user,
}: {
  children: ReactNode;
  user?: any;
}) {
  return <Auth0Provider user={user}>{children}</Auth0Provider>;
}
