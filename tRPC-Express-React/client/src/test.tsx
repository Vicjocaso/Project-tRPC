import React, { useState } from "react";
import { trpc } from "./utils/trpc";
import { QueryClient } from "react-query";

export const client = new QueryClient();

export const Test = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const getMessages = trpc.useQuery(["getMessages"]);
  const addMessages = trpc.useMutation(["addMessages"]);
  const onAdd = async () => {
    addMessages.mutate(
      {
        user,
        message,
      },
      {
        onSuccess: async () => {
          await client.invalidateQueries(["getMessages"]);
        },
      }
    );
    setUser("");
    setMessage("");
  };
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl ">
      <div>
        {(getMessages.data ?? []).map((x) => {
          return (
            <div
              key={x.user}
              className="flex justify-center  mt-9 text-3xl max-w-6xl mx-auto"
            >
              {x.user} {x.message}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd();
          }}
        >
          <input
            type="text"
            value={user}
            className="border-2 mr-4 h-10 border-gray-300 rounded-lg"
            onChange={(e) => setUser(e.target.value)}
            placeholder="user"
          />
          <input
            type="text"
            value={message}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <div>
            <button className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Menssage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
