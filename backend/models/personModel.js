import mongoose from "mongoose";

const Person = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "person", default: null },
});

export default mongoose.model("person", Person);
