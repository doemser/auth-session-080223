import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: String,
  content: String,
});

export default mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
