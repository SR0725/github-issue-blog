import BlogList from "@/components/blog/blog-list";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Page = async () => {
  const session = await getServerSession(options);

  return (
    <div className="min-h-screen bg-[#00324E] pt-4">
      <BlogList session={session} />
    </div>
  );
};

export default Page;
