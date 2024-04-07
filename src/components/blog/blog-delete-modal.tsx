"use client";

import { Session } from "next-auth";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@/components/nextui";
import useUpdateIssue from "@/hooks/useUpdateIssue";
import { Issue } from "@/models/issue";

function BlogDeleteModal({
  issue,
  session,
  isOpen,
  onOpenChange,
}: {
  issue: Issue;
  session: Session;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const updateMutation = useUpdateIssue(issue.number, session);

  const handleDelete = async () => {
    updateMutation.mutate(
      {
        state: "closed",
      },
      {
        onSuccess: () => {
          toast.success("成功刪除");
          window.location.reload();
        },
        onError: (error) => {
          console.error(error);
          toast.error("發生錯誤，請檢查 F12 Console");
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              確認刪除？
            </ModalHeader>
            <ModalBody>
              <p>確定要刪除本篇文章嗎？此操作無法復原。</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                取消
              </Button>
              <Button color="danger" onPress={handleDelete}>
                確定刪除
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default BlogDeleteModal;
