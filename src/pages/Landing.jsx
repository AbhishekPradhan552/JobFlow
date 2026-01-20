import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const { user } = useAuth();

if (user) return <Navigate to="/applications" replace />;

export default function Landing() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="max-w-xl w-full text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-slate-800">
          JobFlow
        </h1>

        <p className="text-slate-600 text-lg">
          Track your job applications, manage interview stages,
          and stay organized during your placement journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/register">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          Built with React, Node.js, MongoDB & JWT Authentication
        </p>
      </Card>
    </div>
  );
}
