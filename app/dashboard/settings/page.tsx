import Settings from "@/components/dashboard/settings/Settings";
import { getPaymentHistory } from "@/service/dashboard/settings";
import { getMe } from "@/service/get-me";

const Page = async () => {
  const response = await getPaymentHistory();

  // Get Me
  const getMeResponse = await getMe();
  

  return (
    <div className="w-full h-full">
      <Settings paymentHistory={response.data} profile={getMeResponse} />
    </div>
  );
};

export default Page;
