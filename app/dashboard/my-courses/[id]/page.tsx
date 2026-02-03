import CourseViewer from "@/components/dashboard/my-courses/[id]/course-details";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="w-full h-full container mx-auto px-4 py-8">
      <CourseViewer courseId={id} />
    </div>
  );
};

export default Page;
