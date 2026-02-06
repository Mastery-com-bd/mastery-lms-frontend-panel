import CourseDetails from "@/components/public/courses/course-details";
import { getFeaturedCourses } from "@/service/course";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const featuredCourses = await getFeaturedCourses();

  return (
    <div>
      <CourseDetails id={id} relatedCourses={featuredCourses} />
    </div>
  );
};

export default Page;
