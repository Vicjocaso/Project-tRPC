import { createReactQueryHooks } from "@trpc/react";
import { appRouter } from "api-service";

export const trpc = createReactQueryHooks<appRouter>();
