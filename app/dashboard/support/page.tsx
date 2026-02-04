import Support from "@/components/dashboard/support/support";
import { enrollmentWithCourse, getSupportRequests } from "@/service/support";

const Page = async () => {
  const supportRequests = await getSupportRequests();
  const enrollmentsWithCourses = await enrollmentWithCourse();

  console.log("All Support Requests: ", supportRequests);
  console.log("Enrollments with Courses: ", enrollmentsWithCourses.data);

  return (
    <div>
      <Support enrollmentsWithCourses={enrollmentsWithCourses.data} requests={supportRequests.data} />
    </div>
  );
};

export default Page;
