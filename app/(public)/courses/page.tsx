import AllCoueses from "@/components/public/courses/all courses/all-courses";
import { getPublishedCourses } from "@/service/course";

const Page = async () => {
  const publishedCourses = await getPublishedCourses();

  return (
    <div className="w-full h-full bg-white">
      <AllCoueses featuredCourses={publishedCourses} />
    </div>
  );
};

export default Page;
