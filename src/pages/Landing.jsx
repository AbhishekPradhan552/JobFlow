import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Landing() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/applications" replace />;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-50 px-4 overflow-hidden">

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-2xl"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-bold text-slate-900"
        >
          Organize your job search.
          <br />
          Stay in control.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-lg text-slate-600"
        >
          Track applications, manage interviews, and move faster through your
          placement journey — all in one clean dashboard.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex justify-center gap-4"
        >
          <Link to="/login">
            <Button className="px-6 h-11 text-sm">
              Get Started
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="outline" className="px-6 h-11 text-sm">
              Create Account
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        <motion.div variants={item}>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Track Everything
            </h3>
            <p className="mt-3 text-slate-700">
              Keep all your job applications in one place — no more spreadsheets.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Visual Status Flow
            </h3>
            <p className="mt-3 text-slate-700">
              Move applications through Applied, Interview, and Offer seamlessly.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Built for Focus
            </h3>
            <p className="mt-3 text-slate-700">
              Clean, distraction-free UI designed for consistency.
            </p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
