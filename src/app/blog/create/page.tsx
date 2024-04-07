import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "github-markdown-css/github-markdown-light.css";
import { options } from "@/app/api/auth/[...nextauth]/options";
import BlogCreateContainer from "@/components/blog/blog-create-container";

const Page = async ({ params }: { params: { issueNumber: string } }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-dark-blue pt-4">
      <BlogCreateContainer session={session} />
    </div>
  );
};

export default Page;
