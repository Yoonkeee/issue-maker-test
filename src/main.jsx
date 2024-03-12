import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Router } from "./Router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <ChakraProvider resetCSS>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
        <Analytics />
      </QueryClientProvider>
    </ChakraProvider>
  </RecoilRoot>,
);
