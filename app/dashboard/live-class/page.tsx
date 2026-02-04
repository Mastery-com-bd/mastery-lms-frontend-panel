import LiveClass from "@/components/dashboard/live-class/live-class";
import { getMyLiveClasses } from "@/service/dashboard/live-class";

const Page = async () => {
  const myLiveClasses = await getMyLiveClasses();

  return (
    <div className="w-full h-full">
      <LiveClass liveClasses={myLiveClasses} />
    </div>
  );
};

export default Page;
