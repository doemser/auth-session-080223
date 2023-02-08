import useSWR from "swr";
import { fetchToDo } from "@/services/fetch";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: todos, mutate } = useSWR("/api/to-dos");
  const { data: session } = useSession();
  console.log("CLIENT SESSION", session);

  return (
    <div style={{ fontSize: "x-large" }}>
      <h1>to-do-inator</h1>

      <div style={{ position: "fixed", top: 10, right: 10 }}>
        {session && "Hallo " + session.user.name}
        <button
          type="button"
          onClick={() => {
            if (session) {
              signOut();
            } else {
              signIn();
            }
          }}
        >
          {session ? "logout" : "login"}
        </button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const { todoInput } = Object.fromEntries(formData);

          fetchToDo("POST", mutate, { content: todoInput });

          event.target.reset();
        }}
      >
        <label htmlFor="todoInput">add to-do:</label>
        <input required type="text" id="todoInput" name="todoInput" />
        <button type="submit">add</button>
      </form>

      <ul>
        {todos?.map((todo) => {
          return (
            <li key={todo._id}>
              {todo.content}
              <button
                type="button"
                onClick={() => {
                  fetchToDo("DELETE", mutate, { id: todo._id });
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
