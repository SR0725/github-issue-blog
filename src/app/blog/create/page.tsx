import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import BlogCreateContainer from "@/components/blog/blog-create-container";
import "github-markdown-css/github-markdown-light.css";

const Page = async ({ params }: { params: { issueNumber: string } }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#00324E] pt-4">
      <BlogCreateContainer session={session} />
    </div>
  );
};

export default Page;
