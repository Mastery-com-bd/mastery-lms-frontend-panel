import MyCourses from "@/components/dashboard/my-courses/my-courses";
import { getMyCourses } from "@/service/course";

const MyCoursesPage = async () => {
  const result = await getMyCourses();
  const myCourses = result?.data || [];

  return (
    <div className="w-full h-full">
      <MyCourses myCourses={myCourses} />
    </div>
  );
};

export default MyCoursesPage;
