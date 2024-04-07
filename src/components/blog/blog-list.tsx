"use client";
import useQueryIssueList from "@/hooks/useQueryIssueList";
import { Session } from "next-auth";
import { Button } from "@/components/nextui";
import { useIntersection } from "react-use";
import { Fragment, useEffect, useRef } from "react";
import BlogListItem from "./blog-list-item";

function BlogList({ session }: { session: Session | null }) {
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const {
    data: { pages = [] } = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQueryIssueList(session);

  useEffect(() => {
    if (intersection?.isIntersecting) fetchNextPage();
  }, [intersection?.isIntersecting, fetchNextPage]);

  if (isLoading)
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col items-center gap-2 rounded bg-white pt-16">
        Loading...
      </div>
    );

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col items-center gap-2 rounded bg-white">
        {pages.map(({ data }, index) => (
          <Fragment key={index}>
            {data.map((issue) => (
              <BlogListItem key={issue.id} issue={issue} session={session} />
            ))}
          </Fragment>
        ))}

        <Button
          ref={loadMoreRef}
          color="primary"
          variant="light"
          onClick={() => fetchNextPage()}
        >
          {hasNextPage
            ? isFetchingNextPage
              ? "Loading more..."
              : "Load more"
            : "No more data"}
        </Button>
      </div>
    </>
  );
}

export default BlogList;
