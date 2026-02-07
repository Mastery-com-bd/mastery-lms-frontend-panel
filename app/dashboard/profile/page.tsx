import Profile from "@/components/dashboard/profile/Profile";
import { getMyCourses, StudentReport } from "@/service/course";
import { getMe } from "@/service/get-me";

const Page = async () => {
  const myCourse = await getMyCourses();
  const profileStatsResult = await StudentReport();
  const profile = await getMe();


  return (
    <div className="w-full h-full">
      <Profile profileCourse={myCourse} profileStats={profileStatsResult} profile={profile} />
    </div>
  );
};

export default Page;
