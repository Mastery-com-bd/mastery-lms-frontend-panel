import Settings from "@/components/dashboard/settings/Settings";
import { getPaymentHistory } from "@/service/dashboard/settings";

const Page = async () => {
  const response = await getPaymentHistory();

  // Get Me
  // const getMeResponse = await getMe();
  // console.log("Get Me Response: ", getMeResponse);

  return (
    <div className="w-full h-full">
      <Settings paymentHistory={response.data} />
    </div>
  );
};

export default Page;
