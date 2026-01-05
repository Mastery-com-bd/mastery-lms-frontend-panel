import CourseDetails from "@/components/courses/id/courseDetails";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <CourseDetails />
    </div>
  );
};

export default Page;
