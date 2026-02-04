import Profile from "@/components/dashboard/profile/Profile";
import { getMyCourses, profileStats } from "@/service/course";

const Page = async () => {
  const myCourse = await getMyCourses();
  const profileStatsResult = await profileStats();

  return (
    <div className="w-full h-full">
      <Profile profileCourse={myCourse} profileStats={profileStatsResult} />
    </div>
  );
};

export default Page;
