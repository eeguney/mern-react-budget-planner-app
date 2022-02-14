import mongoose from "mongoose";

const recordSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User cannot be empty."],
    },
    expenses: {
      type: [
        {
          category: String,
          name: String,
          price: { currency: String, price: Number },
          spendingBy: String,
          date: Date,
          note: String,
        },
      ],
    },
    funds: {
      type: [
        {
          source: String,
          price: { currency: String, price: Number },
          earningBy: String,
          date: Date,
          note: String,
        },
      ],
    },
    persons: {
      type: [
        {
          name: String,
        },
      ],
      unique: true,
    },
    categories: {
      type: [
        {
          name: String,
        },
      ],
      unique: true,
    },
    sources: {
      type: [
        {
          name: String,
        },
      ],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Records", recordSchema);
