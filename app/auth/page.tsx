import Auth from "@/components/auth/Auth";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const modeParam = params?.mode;
  return (
    <div className="w-full h-full">
      <Auth mode={modeParam as "signup" | "signin"} />
    </div>
  );
};

export default Page;
