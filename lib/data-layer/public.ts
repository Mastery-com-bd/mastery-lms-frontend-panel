export const getFeaturedCourse = async ({page}: {page: number}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/featured?page=${page}`);
  const data = await res.json();
  console.log("Data From Data Layer ", data)
  return data;
}

export const getAllProducts = async (params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  name?: string;
  productCategoryId?: string;
  productStatus?: string;
  searchTerm?: string;
}) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product?${queryParams.toString()}`);
  const data = await res.json();
  return data;
};

export const getCourseById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/${id}`);
  const data = await res.json();
  return data;
};
