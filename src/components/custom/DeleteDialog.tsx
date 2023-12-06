import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/common/AlertDialog";
import { Button } from "@components/common/Button";
import { FontAwesomeIcon, faClose, faTrashAlt } from "@components/common/Icons";

function DeleteDialog({ handleDelete }: { handleDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className='flex items-center justify-start p-0 text-sm font-medium'>
          <FontAwesomeIcon icon={faTrashAlt} className='mr-3 h-4 w-4 text-base' />
          Delete Player
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[186px] max-w-sm bg-[#2D2D2D] px-6 py-[18px]'>
        <AlertDialogHeader className='gap-4'>
          <AlertDialogTitle className='flex w-full items-center justify-between'>
            Are you sure?
            <AlertDialogCancel className='h-fit border-0 p-0'>
              <FontAwesomeIcon icon={faClose} className='h-4 w-4 text-primary-foreground' />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='h-fit'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
