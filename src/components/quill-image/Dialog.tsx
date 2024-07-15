import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import OptionForm from "./Form";

interface OptionDialogProps {
  open: boolean;
  selectedImage: any;
  onSubmit: (data: { align: string; dimension: string }) => void;
  setSelectedImage: Dispatch<SetStateAction<any>>;
}

const OptionDialog: FC<OptionDialogProps> = ({ open, selectedImage, onSubmit, setSelectedImage }) => {
  const properties = selectedImage?.value()["styled-image"];

  const defaultValues = useMemo(
    () => ({
      align: properties?.align ?? "center",
      dimension: Math.min(properties?.width, properties?.height).toString(),
    }),
    [properties]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedImage(undefined);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Option</DialogTitle>
          <OptionForm defaultValues={defaultValues} onCancel={() => setSelectedImage(undefined)} onSubmit={onSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OptionDialog;
