import { mutate } from "swr";

export async function fetchToDo(method, url, body) {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      mutate(url);
    } else {
      console.error("Bad Response.");
    }
  } catch (error) {
    console.error(error);
  }
}
