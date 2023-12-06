import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@components/common/AlertDialog";

import { Button } from "@components/common/Button";
import { FontAwesomeIcon, faTrashAlt, faClose } from "@components/common/Icons";

function DeleteDialog({ handleDelete }: { handleDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 font-medium text-sm flex items-center justify-start"
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="mr-3 w-4 h-4 text-base"
          />
          Delete Player
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#2D2D2D] max-w-sm h-[186px] px-6 py-[18px]">
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle className="flex justify-between items-center w-full">
            Are you sure?
            <AlertDialogCancel className="border-0 p-0 h-fit">
              <FontAwesomeIcon
                icon={faClose}
                className="text-primary-foreground w-4 h-4"
              />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="h-fit">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
