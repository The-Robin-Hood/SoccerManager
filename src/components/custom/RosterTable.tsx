import { Button } from "@components/common/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/common/Popover";
import { faClose, faEllipsis, FontAwesomeIcon } from "@components/common/Icons";
import cn from "@lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
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
        "flex-1 px-5 pb-5 overflow-y-auto max-h-[calc(100%-40px)] rounded-lg bg-[#2D2D2D] text-primary-foreground"
      )}
    >
      <table className="w-full table-auto">
        <thead className="text-left sticky top-0 bg-[#2D2D2D]">
          <tr className="font-medium text-xs">
            <th className="pt-5 pb-2 min-w-[100px]">Player Name</th>
            <th className="pt-5 pb-2 min-w-[100px]">Jersey Number</th>
            <th className="pt-5 pb-2 min-w-[100px]">Starter</th>
            <th className="pt-5 pb-2 min-w-[100px]">Position</th>
            <th className="pt-5 pb-2 min-w-[100px]">Height</th>
            <th className="pt-5 pb-2 min-w-[100px]">Weight</th>
            <th className="pt-5 pb-2 min-w-[100px]">Nationality</th>
            <th className="pt-5 pb-2 min-w-[100px]">Appearances</th>
            <th className="pt-5 pb-2 min-w-[100px]">Minutes Played</th>
            <th></th>
          </tr>
        </thead>
        {players.length > 0 && (
          <tbody className="text-left">
            {players.map((player, index) => {
              if (searchPlayer !== "") {
                const pName = player.name.toLowerCase();
                const pPos = player.position.toLowerCase();
                const searchTxt = searchPlayer.toLowerCase();
                if (!pName.includes(searchTxt) && !pPos.includes(searchTxt))
                  return null;
              }
              return (
                <tr key={index} className="font-medium text-[14px]">
                  <td className="flex pt-5 h-6">
                    <img
                      className="w-6 h-6 mr-2"
                      src={player.flagImage}
                      alt={player.nationality + " Flag Image"}
                    />
                    {player.name}
                  </td>
                  <td className="pt-5 h-6">{player.jerseyNumber}</td>
                  <td className="pt-5 h-6">{player.starter ? "Yes" : "No"}</td>
                  <td className="pt-5 h-6">{player.position}</td>
                  <td className="pt-5 h-6">
                    {player.height !== -1 ? player.height + " m" : "Unknown"}
                  </td>
                  <td className="pt-5 h-6">
                    {player.weight !== -1 ? player.weight + " kg" : "Unknown"}
                  </td>
                  <td className="pt-5 h-6">{player.nationality}</td>
                  <td className="pt-5 h-6">{player.appearances}</td>
                  <td className="pt-5 h-6">{player.minutesPlayed}</td>
                  <td className="pt-5 h-6">
                    <Popover
                      onOpenChange={() => handlePopoverOpen(index)}
                      open={actionPopover[index]}
                    >
                      <PopoverTrigger>
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-sm text-primary-foreground"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        className="h-40 p-4 max-w-[230px]"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-[#F8F8F8] text-lg font-semibold">
                            Actions
                          </p>
                          <Button
                            variant="ghost"
                            className="p-0 h-fit"
                            onClick={() => handlePopoverOpen(index)}
                          >
                            <FontAwesomeIcon
                              icon={faClose}
                              className="text-primary-foreground w-4 h-4"
                            />
                          </Button>
                        </div>
                        <div className="flex flex-col mt-4 items-start">
                          <EditDialog
                            dialogOpen={editDialog}
                            index={index}
                            players={players}
                            setDialogOpen={setEditDialog}
                            handlePlayerChange={handleEditDialog}
                          />
                          <DeleteDialog
                            handleDelete={() => handleDeletePlayer(index)}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              );
            })}
            {!players.some(
              (player) =>
                player.name.includes(searchPlayer) &&
                player.position.includes(searchPlayer)
            ) && (
              <tr>
                <td
                  className="pt-5 h-6 text-center font-light text-lg"
                  colSpan={9}
                >
                  No players found 😢
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {players.length === 0 && (
        <div className="flex flex-col justify-center items-center h-full max-h-[calc(100%-60px)]">
          <p className="text-center text-primary-foreground font-normal text-sm">
            You do not have any players on the roster
          </p>
          <Button
            variant="link"
            className="font-medium text-sm"
            onClick={() => setImportDialog(true)}
          >
            Import Team
          </Button>
        </div>
      )}
    </div>
  );
}

export default RosterTable;
