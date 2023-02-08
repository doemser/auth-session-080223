import useSWR from "swr";
import { fetchToDo } from "@/services/fetch";

export default function Home() {
  const { data: todos, mutate } = useSWR("/api/to-dos");

  return (
    <div style={{ fontSize: "x-large" }}>
      <h1>to-do-inator</h1>
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
