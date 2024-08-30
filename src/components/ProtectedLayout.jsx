import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import useInternetStatus from "@/hooks/InternetStatus";
import Footer from "./Footer";
import { useAuth } from "@/context/AuthContext";
import CourseHeader from "./CourseHeader";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isOnline = useInternetStatus();
  const [wasOffline, setWasOffline] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const courseCode = localStorage.getItem("courseCode");

  useEffect(() => {
    if (isOnline && wasOffline) {
      toast({
        variant: "success",
        title: "Back Online",
        description: "Continue your learning",
      });
    } else if (!isOnline) {
      toast({
        variant: "destructive",
        title: "No Internet",
        description: "Please check your connection",
      });
    }
    setWasOffline(!isOnline);
  }, [isOnline, wasOffline, toast]);

  if (!courseCode) {
    logout();
    navigate("/login");
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="w-screen h-screen overflow-y-scroll">
      <Navbar />
      <CourseHeader />
      <section className="w-full flex justify-between pt-24">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex-1 bg-white max-h-[calc(100vh-6rem)] h-screen">
          <Outlet />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProtectedLayout;
