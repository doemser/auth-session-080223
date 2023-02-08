export async function fetchToDo(method, successCallback, body) {
  try {
    const response = await fetch("/api/to-dos", {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      successCallback();
    } else {
      console.error("Bad Response.");
    }
  } catch (error) {
    console.error(error);
  }
}
