import CourseDetails from "@/components/public/courses/course-details";
import { getPublishedCourses } from "@/service/course";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const publishedCourses = await getPublishedCourses();

  return (
    <div>
      <CourseDetails id={id} relatedCourses={publishedCourses} />
    </div>
  );
};

export default Page;
