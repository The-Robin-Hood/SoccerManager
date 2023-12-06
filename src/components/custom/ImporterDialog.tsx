import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/common/Dialog";
import { Separator } from "@components/common/Separator";

import FileInput from "./FileInput";

const ImporterDialog = ({
  dialogOpen,
  setDialogOpen,
  setPlayers,
}: {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const [imported, setImported] = useState(false);
  const [datas, setDatas] = useState<Player[]>([]);

  const handleImport = () => {
    setImported(true);
    setPlayers(datas);
    setDialogOpen(false);
  };
  const handleImportDialog = () => {
    setDialogOpen(true);
    setDatas([]);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {!imported ? (
          <Button variant='default' onClick={handleImportDialog}>
            Import Team
          </Button>
        ) : (
          <Button variant='outline' onClick={handleImportDialog}>
            Re-Import Team
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='min-h-[600px] max-w-[800px] border-none bg-[#2D2D2D]'>
        <DialogHeader>
          <DialogTitle className='mb-3'>Importer</DialogTitle>
          <Separator className='bg-outline' />
          <DialogDescription asChild>
            <div>
              <p className='text-sm font-medium'>Roaster File</p>
              <FileInput players={datas} setPlayers={setDatas} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='items-end'>
          <Button onClick={handleImport} disabled={datas.length === 0}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImporterDialog;
