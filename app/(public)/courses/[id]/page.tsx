import CourseDetails from "@/components/public/courses/course-details";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);

  return (
    <div>
      <CourseDetails id={id} />
    </div>
  );
};

export default Page;
