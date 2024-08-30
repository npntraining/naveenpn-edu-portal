import { coursesList } from "@/data/global_config";

const Home = () => {
  const courseCode = localStorage.getItem("courseCode");
  const homePage = coursesList[courseCode]?.homePage;

  return (
    <div className="w-full h-full overflow-y-auto p-3 md:p-2">
      <iframe
        src={homePage}
        className="h-full w-full overflow-y-scroll rounded-md pointer-events-auto"
      />
    </div>
  );
};

export default Home;
