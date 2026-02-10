import Dashboard from "@/components/dashboard/dashboard";
import { StudentReport } from "@/service/course";
import { getMyLiveClasses } from "@/service/dashboard/live-class";
import { getMe } from "@/service/get-me";

const Page = async () => {
  const studentDashboardReport = await StudentReport();
  const learningProgress = studentDashboardReport.data.charts.learningProgress;
  const recentActivity = studentDashboardReport.data.recentActivity;
  const getme = await getMe();
  const getLiveClass = await getMyLiveClasses();

  return (
    <div>
      <Dashboard
        learnerReport={learningProgress}
        recentActivity={recentActivity}
        studentStats={studentDashboardReport.data.summary}
        user={getme}
        liveClasses={getLiveClass}
      />
    </div>
  );
};

export default Page;
