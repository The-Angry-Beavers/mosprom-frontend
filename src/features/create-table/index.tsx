import { useState } from "react";
import { CreateTableModal } from "./ui/create-table-modal";
import { BtnPlus } from "@/shared/ui/btn-plus";

export const CreateModal = ({ namespace }: { namespace: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BtnPlus onClick={() => setOpen(true)} />
      <CreateTableModal
        namespace={namespace}
        isModalOpen={open}
        handleOk={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
      />
    </>
  );
};
