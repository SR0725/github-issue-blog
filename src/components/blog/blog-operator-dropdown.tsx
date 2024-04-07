"use client";
import { Issue } from "@/models/issue";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@/components/nextui";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import BlogDeleteModal from "./blog-delete-modal";

function BlogOperatorDropdown({
  session,
  issue,
  children,
}: {
  session: Session;
  issue: Issue;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { isOpen: isDeleteModalOpen, onOpenChange: onOpenChangeDeleteModal } =
    useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>{children}</DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/blog/edit/${issue.number}`);
            }}
          >
            編輯
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onOpenChangeDeleteModal();
            }}
          >
            刪除
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <BlogDeleteModal
        issue={issue}
        session={session}
        isOpen={isDeleteModalOpen}
        onOpenChange={onOpenChangeDeleteModal}
      />
    </>
  );
}

export default BlogOperatorDropdown;
