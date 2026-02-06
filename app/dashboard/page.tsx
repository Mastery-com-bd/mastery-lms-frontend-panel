import Dashboard from "@/components/dashboard/dashboard";
import { StudentReport } from "@/service/course";

const Page = async () => {
  const studentDashboardReport = await StudentReport();
  const learningProgress = studentDashboardReport.data.charts.learningProgress;
  const recentActivity = studentDashboardReport.data.recentActivity;


  return (
    <div>
      <Dashboard learnerReport={learningProgress} recentActivity={recentActivity} />
    </div>
  );
};

export default Page;
