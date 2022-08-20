import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import { Test, client } from "./test";

import "./index.scss";

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <Test />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
