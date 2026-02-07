import { ProfileStatsProps } from "@/type/dashboard/profile";
import { Award, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";

const ProfileStats = ({ profileStats }: { profileStats: ProfileStatsProps }) => {




  const { totalActiveEnrollments, totalCompletedEnrollments, totalWatchedLessons, completionRate } = profileStats.data.summary;

  const stats = [
    {
      label: "Active Enrollments",
      value: totalActiveEnrollments,
      icon: BookOpen,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Completed Enrollments",
      value: totalCompletedEnrollments,
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Watched Lessons",
      value: totalWatchedLessons,
      icon: PlayCircle,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: Award,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} p-6 flex items-center gap-5 rounded-none`}
          >
            <div className="w-14 h-14 bg-white flex items-center justify-center shrink-0">
              <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground leading-tight">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
