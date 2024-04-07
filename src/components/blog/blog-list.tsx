"use client";

import { Fragment, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Session } from "next-auth";
import { Button } from "@/components/nextui";
import useQueryIssueList from "@/hooks/useQueryIssueList";
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

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col items-center gap-2 rounded bg-white">
        {!isLoading &&
          pages.map(({ data }, index) => (
            <Fragment key={index}>
              {data.map((issue) => (
                <BlogListItem key={issue.id} issue={issue} session={session} />
              ))}
            </Fragment>
          ))}

        <Button
          ref={loadMoreRef}
          disabled={!hasNextPage || isFetchingNextPage}
          color="primary"
          variant="light"
          onClick={() => fetchNextPage()}
        >
          {isLoading
            ? "Loading..."
            : hasNextPage
              ? "Load more"
              : "No more data"}
        </Button>
      </div>
    </>
  );
}

export default BlogList;
