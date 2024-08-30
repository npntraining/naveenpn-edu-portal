import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoIosPie } from "react-icons/io";
import { IoCalendarSharp } from "react-icons/io5";
import { HiDocumentChartBar } from "react-icons/hi2";
import { ImBooks } from "react-icons/im";
import { useAuth } from "@/context/AuthContext";
import { GoQuestion } from "react-icons/go";
import { useToast } from "./ui/use-toast";

const Sidebar = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();

  const courseExpired = localStorage.getItem("courseExpired") || false;

  useEffect(() => {
    if (courseExpired) {
      toast({
        variant: "destructive",
        title: `Course Expired!`,
        description: "Please contact administrator",
      });
    }
  }, [courseExpired, toast]);

  const navlinks = [
    { title: "Home", icon: FaHome, link: "/" },
    ...(courseExpired
      ? []
      : [{ title: "Curriculum", icon: ImBooks, link: "/curriculum" }]),
    { title: "Planner", icon: IoCalendarSharp, link: "/planner" },
    { title: "Evaluation", icon: HiDocumentChartBar, link: "/evaluation" },
    { title: "Notes", icon: HiDocumentChartBar, link: "/notes" },
    { title: "Q&A", icon: GoQuestion, link: "/qna" },
    ...(isAdmin
      ? [{ title: "Reports", icon: IoIosPie, link: "/reports" }]
      : []),
  ];

  const isCurriculum = pathname.includes("curriculum");

  return (
    <div
      className={`bg-primary  ${
        isCurriculum ? "w-[4.6rem]" : "w-[275px]"
      }  md:w-[4.1rem] lg:w-[4.6rem] h-full md:max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden`}
    >
      <div className="w-full mx-auto bg-transparent flex flex-col items-center justify-start">
        {navlinks?.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            item.title === "Home"
              ? pathname === item.link
              : pathname.includes(item.link);
          return (
            <Link
              to={item?.link}
              className={` py-3 px-4 md:px-3 w-full ${
                isCurriculum ? "flex-col text-xs" : "flex-row text-base"
              } flex md:flex-col justify-start md:justify-center max-sm:gap-x-2 items-center md:text-xs lg:scale-110 ${
                isActive ? "bg-[#e3ecfa] text-primary" : "bg-primary text-white"
              }`}
              key={index}
            >
              <Icon />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
