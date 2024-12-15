import { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import superjson from "superjson";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "../electron/trpc";
import { Button } from "@nextui-org/react";
import ThemeToggle from "./components/mode-toggle";
import Page from "./home/page";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./providers/theme.tsx";

export const trpcReact = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [ipcLink()],
      transformer: superjson,
    })
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NextUIProvider>
            <Page />
          </NextUIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

export default App;
