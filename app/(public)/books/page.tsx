import BookPage from "@/components/public/books/book-page"
import { Suspense } from "react"

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <BookPage />
    </Suspense>
  )
}

export default Page