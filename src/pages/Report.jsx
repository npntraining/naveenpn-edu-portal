import { coursesList } from "@/data/global_config";

const Report = () => {
  const courseCode = localStorage.getItem("courseCode");
  const reportPage = coursesList[courseCode]?.reportPage;
  return (
    <div className="w-full h-full overflow-y-auto p-3 md:p-2">
      <iframe
        src={reportPage}
        title="Report"
        className="h-full w-full overflow-y-scroll rounded-md pointer-events-auto"
      />
    </div>
  );
};

export default Report;
