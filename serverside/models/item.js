import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be empty."],
    },
    price: {
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Items", itemSchema)