import Dashboard from "@/components/dashboard/dashboard";
import { StudentReport } from "@/service/course";
import { getMe } from "@/service/get-me";

const Page = async () => {
  const studentDashboardReport = await StudentReport();
  const learningProgress = studentDashboardReport.data.charts.learningProgress;
  const recentActivity = studentDashboardReport.data.recentActivity;
  const getme = await getMe();

  console.log("Get Me response :", getme)

  return (
    <div>
      <Dashboard
        learnerReport={learningProgress}
        recentActivity={recentActivity}
        studentStats={studentDashboardReport.data.summary}
        user={getme}
      />
    </div>
  );
};

export default Page;
