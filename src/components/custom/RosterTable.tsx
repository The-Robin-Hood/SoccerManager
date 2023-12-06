import cn from "@lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@components/common/Button";
import { FontAwesomeIcon, faClose, faEllipsis } from "@components/common/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@components/common/Popover";

import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

function RosterTable({
  players,
  setPlayers,
  searchPlayer,
  setImportDialog,
}: {
  players: Player[];
  searchPlayer: string;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setImportDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const initialStateOfPopovers = Array(players.length).fill(false);
  const [actionPopover, setActionPopover] = useState(initialStateOfPopovers);
  const [editDialog, setEditDialog] = useState(false);

  const handlePopoverOpen = (index: number) => {
    const temp = [...actionPopover];
    temp[index] = !temp[index];
    setActionPopover(temp);
  };

  // if scroll action is performed accross the table, close all popovers (glitchy)
  const handleScroll = () => {
    setActionPopover(initialStateOfPopovers);
  };

  const handleDeletePlayer = (index: number) => {
    const temp = [...players];
    temp.splice(index, 1);
    setActionPopover(initialStateOfPopovers);
    setPlayers(temp);
  };

  const handleEditDialog = (player: Player[]) => {
    setPlayers(player);
    setActionPopover(initialStateOfPopovers);
  };

  return (
    <div
      onScrollCapture={handleScroll}
      className={cn(
        "max-h-[calc(100%-40px)] flex-1 overflow-y-auto rounded-lg bg-[#2D2D2D] px-5 pb-5 text-primary-foreground"
      )}>
      <table className='w-full table-auto'>
        <thead className='sticky top-0 bg-[#2D2D2D] text-left'>
          <tr className='text-xs font-medium'>
            <th className='min-w-[100px] pb-2 pt-5'>Player Name</th>
            <th className='min-w-[100px] pb-2 pt-5'>Jersey Number</th>
            <th className='min-w-[100px] pb-2 pt-5'>Starter</th>
            <th className='min-w-[100px] pb-2 pt-5'>Position</th>
            <th className='min-w-[100px] pb-2 pt-5'>Height</th>
            <th className='min-w-[100px] pb-2 pt-5'>Weight</th>
            <th className='min-w-[100px] pb-2 pt-5'>Nationality</th>
            <th className='min-w-[100px] pb-2 pt-5'>Appearances</th>
            <th className='min-w-[100px] pb-2 pt-5'>Minutes Played</th>
            <th></th>
          </tr>
        </thead>
        {players.length > 0 && (
          <tbody className='text-left'>
            {players.map((player, index) => {
              if (searchPlayer !== "") {
                const pName = player.name.toLowerCase();
                const pPos = player.position.toLowerCase();
                const searchTxt = searchPlayer.toLowerCase();
                if (!pName.includes(searchTxt) && !pPos.includes(searchTxt)) return null;
              }
              return (
                <tr key={index} className='text-[14px] font-medium'>
                  <td className='flex h-6 pt-5'>
                    <img className='mr-2 h-6 w-6' src={player.flagImage} alt={player.nationality + " Flag Image"} />
                    {player.name}
                  </td>
                  <td className='h-6 pt-5'>{player.jerseyNumber}</td>
                  <td className='h-6 pt-5'>{player.starter ? "Yes" : "No"}</td>
                  <td className='h-6 pt-5'>{player.position}</td>
                  <td className='h-6 pt-5'>{player.height !== -1 ? player.height + " m" : "Unknown"}</td>
                  <td className='h-6 pt-5'>{player.weight !== -1 ? player.weight + " kg" : "Unknown"}</td>
                  <td className='h-6 pt-5'>{player.nationality}</td>
                  <td className='h-6 pt-5'>{player.appearances}</td>
                  <td className='h-6 pt-5'>{player.minutesPlayed}</td>
                  <td className='h-6 pt-5'>
                    <Popover onOpenChange={() => handlePopoverOpen(index)} open={actionPopover[index]}>
                      <PopoverTrigger>
                        <FontAwesomeIcon icon={faEllipsis} className='text-sm text-primary-foreground' />
                      </PopoverTrigger>
                      <PopoverContent side='bottom' className='h-40 max-w-[230px] p-4'>
                        <div className='flex items-center justify-between'>
                          <p className='text-lg font-semibold text-[#F8F8F8]'>Actions</p>
                          <Button variant='ghost' className='h-fit p-0' onClick={() => handlePopoverOpen(index)}>
                            <FontAwesomeIcon icon={faClose} className='h-4 w-4 text-primary-foreground' />
                          </Button>
                        </div>
                        <div className='mt-4 flex flex-col items-start'>
                          <EditDialog
                            dialogOpen={editDialog}
                            index={index}
                            players={players}
                            setDialogOpen={setEditDialog}
                            handlePlayerChange={handleEditDialog}
                          />
                          <DeleteDialog handleDelete={() => handleDeletePlayer(index)} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              );
            })}
            {!players.some(
              (player) => player.name.includes(searchPlayer) && player.position.includes(searchPlayer)
            ) && (
              <tr>
                <td className='h-6 pt-5 text-center text-lg font-light' colSpan={9}>
                  No players found 😢
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {players.length === 0 && (
        <div className='flex h-full max-h-[calc(100%-60px)] flex-col items-center justify-center'>
          <p className='text-center text-sm font-normal text-primary-foreground'>
            You do not have any players on the roster
          </p>
          <Button variant='link' className='text-sm font-medium' onClick={() => setImportDialog(true)}>
            Import Team
          </Button>
        </div>
      )}
    </div>
  );
}

export default RosterTable;
