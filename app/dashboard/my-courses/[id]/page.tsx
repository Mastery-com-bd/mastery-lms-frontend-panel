import CourseViewer from "@/components/dashboard/my-courses/[id]/course-details";
import { getMyCourses } from "@/service/course";
import { MyCourseData } from "@/type/dashboard/my-courses";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const myCourse = await getMyCourses();

  const findTheCourse = myCourse.data?.find(
    (course: MyCourseData) => course?.course?.id === id,
  )?.course;

  return (
    <div className="w-full h-full container mx-auto px-4 py-8">
      <CourseViewer course={findTheCourse} />
    </div>
  );
};

export default Page;
