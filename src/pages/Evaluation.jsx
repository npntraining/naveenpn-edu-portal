import { coursesList } from "@/data/global_config";

const Evaluation = () => {
  const courseCode = localStorage.getItem("courseCode");
  const evaluationPage = coursesList[courseCode]?.evaluationPage;
  return (
    <div className="w-full h-full overflow-y-auto p-3 md:p-2">
      <iframe
        src={evaluationPage}
        title="Report"
        className="h-full w-full overflow-y-scroll rounded-md pointer-events-auto"
      />
    </div>
  );
};

export default Evaluation;
