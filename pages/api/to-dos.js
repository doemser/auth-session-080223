import { getToDos, addToDo, deleteToDo } from "@/services/mongodb";

export default async function handler(request, response) {
  const { method, body } = request;

  if (method === "GET") {
    try {
      const mongoResponse = await getToDos();
      response.status(200).json(mongoResponse);
    } catch (error) {
      response.status(500).json({ error: "Oh no." });
    }
  } else if (method === "POST") {
    try {
      const mongoResponse = await addToDo(body);
      return response.status(201).json(mongoResponse);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: "That was not good." });
    }
  } else if (method === "DELETE") {
    try {
      const mongoResponse = await deleteToDo(body.id);
      return response.status(201).json(mongoResponse);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: "That was unexpected." });
    }
  }
}
