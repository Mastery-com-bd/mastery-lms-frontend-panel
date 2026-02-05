import WishlistPage from "@/components/dashboard/wishlist/wishlist-page";
import { getMyWishlist } from "@/service/dashboard/wishlist";

const Page = async () => {
  const myWishlist = await getMyWishlist();

  return (
    <div>
      <WishlistPage wishlist={myWishlist} />
    </div>
  );
};

export default Page;
