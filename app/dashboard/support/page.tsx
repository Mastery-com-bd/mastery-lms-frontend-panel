import Support from "@/components/dashboard/support/support";
import { enrollmentWithCourse, getSupportRequests } from "@/service/dashboard/support";

const Page = async () => {
  const supportRequests = await getSupportRequests();
  const enrollmentsWithCourses = await enrollmentWithCourse();

  return (
    <div>
      <Support enrollmentsWithCourses={enrollmentsWithCourses.data} requests={supportRequests.data} />
    </div>
  );
};

export default Page;
