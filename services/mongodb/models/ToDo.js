import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  content: String,
});

export default mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
