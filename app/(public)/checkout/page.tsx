import Checkout from '@/components/public/checkout/checkout';

const Page = async ({searchParams}: {searchParams: Promise<{id: string} | undefined>}) => {
    const searchParamsObj = await searchParams;
    console.log(searchParamsObj?.id);

  return (
    <div>
        <Checkout courseId={searchParamsObj?.id || ''} />
    </div>
  )
}

export default Page