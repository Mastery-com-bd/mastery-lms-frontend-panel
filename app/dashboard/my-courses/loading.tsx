import { Loader2 } from "lucide-react";

const MyCourseLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 className="w-10 h-10 text-[#CC0000] animate-spin" />
      <p className="text-gray-500 animate-pulse">Loading your courses...</p>
    </div>
  );
};

export default MyCourseLoading;
