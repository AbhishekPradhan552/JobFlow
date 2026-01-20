import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { validateApplication } from "./middleware/validateApplication.js";
import { protect } from "./middleware/authMiddleware.js";
import Application from "./models/Application.js";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://job-flow-a6fr.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
//connect database

//temp fake data
// let applications = [
//   { id: 1, company: "Google", role: "SDE", status: "APPLIED" },
//   { id: 2, company: "Meta", role: "Backend", status: "INTERVIEW" },
// ];

//test route
app.get("/", (req, res) => {
  res.send("Backend is working with MongoDB");
});
//get all applications
app.get("/api/applications", protect, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create application
app.post(
  "/api/applications",
  protect,
  validateApplication("create"),
  async (req, res) => {
    try {
      const { company, role, status } = req.body;

      const appData = await Application.create({
        company: company.trim(),
        role: role.trim(),
        status: status || "APPLIED",
        user: req.user._id, // linked to logged in user
      });
      res.status(201).json(appData);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

//delete appliaction
app.delete("/api/applications/:id", protect, async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update application
app.put(
  "/api/applications/:id",
  protect,
  validateApplication("update"),
  async (req, res) => {
    try {
      const { company, role, status } = req.body;

      const updated = await Application.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        {
          ...(company !== undefined && { company: company.trim() }),
          ...(role !== undefined && { role: role.trim() }),
          ...(status !== undefined && { status }),
        },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(updated);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
);
// for dashboard
app.get("/api/stats", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, applied, interview, rejected, offer] = await Promise.all([
      Application.countDocuments({ user: userId }),
      Application.countDocuments({ user: userId, status: "APPLIED" }),
      Application.countDocuments({ user: userId, status: "INTERVIEW" }),
      Application.countDocuments({ user: userId, status: "REJECTED" }),
      Application.countDocuments({ user: userId, status: "OFFER" }),
    ]);
    res.json({ total, applied, interview, rejected, offer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
