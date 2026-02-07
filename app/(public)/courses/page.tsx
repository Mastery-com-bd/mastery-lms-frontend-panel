import AllCoueses from "@/components/public/courses/all courses/all-courses";
import { getFeaturedCourses } from "@/service/course";

const Page = async () => {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="w-full h-full bg-white">
      <AllCoueses featuredCourses={featuredCourses} />
    </div>
  );
};

export default Page;
