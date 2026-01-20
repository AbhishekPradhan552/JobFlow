import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"],
      default: "APPLIED",
    },
    //ownership field
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "true",
    },
  },
  { timestamps: true } //createdAt + updatedAt
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
