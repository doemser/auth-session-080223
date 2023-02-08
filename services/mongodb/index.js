import ToDo from "@/services/mongodb/models/ToDo";

import dbConnect from "./dbConnect";

export async function getToDos(userId) {
  await dbConnect();
  return await ToDo.find({ userId });
}

export async function addToDo(body) {
  await dbConnect();
  return await new ToDo(body).save();
}

export async function deleteToDo(id) {
  await dbConnect();
  return await ToDo.findByIdAndDelete(id);
}
