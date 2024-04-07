import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import BlogList from "@/components/blog/blog-list";

const Page = async () => {
  const session = await getServerSession(options);

  return (
    <div className="min-h-screen bg-dark-blue pt-4">
      <BlogList session={session} />
    </div>
  );
};

export default Page;
