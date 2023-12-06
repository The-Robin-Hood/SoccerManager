import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/common/Dialog";
import { Button } from "@components/common/Button";
import { useForm } from "react-hook-form";

import {
  FontAwesomeIcon,
  faChevronDown,
  faPen,
} from "@components/common/Icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  EditPlayerSchema,
  editPlayerSchema,
} from "@lib/validations/editPlayer";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "@lib/utils";
import { getLocalStorage } from "@lib/localStorage";

const EditDialog = ({
  dialogOpen,
  index,
  players,
  setDialogOpen,
  handlePlayerChange,
}: {
  dialogOpen: boolean;
  index: number;
  players: Player[];
  handlePlayerChange: (player: Player[]) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState("");
  const nationalities = [
    ...new Set(players.map((player) => player.nationality)),
  ];

  const handleImportDialog = () => {
    setDialogOpen(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<EditPlayerSchema>({
    resolver: zodResolver(editPlayerSchema),
    defaultValues: {
      height: players[index].height,
      jerseyNumber: players[index].jerseyNumber,
      name: players[index].name,
      nationality: players[index].nationality,
      position: players[index].position,
      starter: players[index].starter ? "Yes" : "No",
      weight: players[index].weight,
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0] as keyof EditPlayerSchema;
      if (errors[firstError]?.message?.startsWith("Expected"))
        return setError("Please enter a valid number");
      setError(errors[firstError]?.message as string);
    }
  }, [errors]);

  const handleDialog = () => {
    if (dialogOpen) {
      setError("");
      reset();
    }
    setDialogOpen(!dialogOpen);
  };

  const onSubmit = (data: EditPlayerSchema) => {
    if (data.starter === "Yes" && !players[index].starter) {
      if (
        players.some(
          (player) => player.starter && player.position === "Goalkeeper"
        ) &&
        data.position === "Goalkeeper"
      ) {
        setError("You can only have one goalkeeper as a starter");
        return;
      }
      if (
        players.filter(
          (player) => player.starter && player.position === "Forward"
        ).length >= 3 &&
        data.position === "Forward"
      ) {
        setError("You can only have 3 forwards as a starter");
        return;
      }
      if (
        players.filter(
          (player) => player.starter && player.position === "Midfielder"
        ).length >= 3 &&
        data.position === "Midfielder"
      ) {
        setError("You can only have 3 midfielders as a starter");
        return;
      }
      if (
        players.filter(
          (player) => player.starter && player.position === "Defender"
        ).length >= 4 &&
        data.position === "Defender"
      ) {
        setError("You can only have 4 defenders as a starter");
        return;
      }
    }
    let flagImage = players[index].flagImage;
    if (data.nationality != players[index].nationality) {
      const flagCollection = JSON.parse(getLocalStorage("flagsCollection"));
      flagImage = flagCollection[data.nationality];
    }
    const playerData = {
      ...players[index],
      ...data,
      starter: data.starter === "Yes" ? true : false,
      flagImage,
    };
    const newPlayers = [...players];
    newPlayers[index] = playerData;
    handlePlayerChange(newPlayers);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={handleImportDialog}
          variant="ghost"
          className="p-0 font-medium text-sm w-full flex items-center justify-start"
        >
          <FontAwesomeIcon icon={faPen} className="mr-3 w-4 h-4 text-base" />
          Edit Player
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] min-h-[582px] border-none bg-[#2D2D2D]">
        <DialogHeader className="space-y-0">
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription asChild>
            <form
              id="edit-player-form"
              className="pt-6 flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-[73px] w-full gap-4">
                <div className="flex flex-col justify-between">
                  <label
                    htmlFor="player-name"
                    className="block text-sm font-medium text-white"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="player-name"
                    defaultValue={players[index].name}
                    className={cn(
                      "h-11 w-64 px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg",
                      {
                        "border-error": errors.name,
                      }
                    )}
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <label
                    htmlFor="jersey-number"
                    className="block text-sm font-medium text-white"
                  >
                    Jersey Number
                  </label>
                  <input
                    type="number"
                    id="jersey-number"
                    defaultValue={players[index].jerseyNumber}
                    className={cn(
                      "appearance-none h-11 w-full px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg",
                      {
                        "border-error": errors.jerseyNumber,
                      }
                    )}
                    min={0}
                    max={999}
                    {...register("jerseyNumber", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex h-[73px] w-full gap-4">
                <div className="flex flex-col justify-between">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-white"
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    min={-1} // Will be set as Unkown if -1
                    id="height"
                    defaultValue={players[index].height}
                    className={cn(
                      "h-11 w-full px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg",
                      {
                        "border-error": errors.height,
                      }
                    )}
                    {...register("height", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-white"
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    id="weight"
                    defaultValue={players[index].weight}
                    className={cn(
                      "appearance-none h-11 w-full px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg",
                      {
                        "border-error": errors.weight,
                      }
                    )}
                    min={-1} // Will be set as Unkown if -1
                    {...register("weight", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col h-20 w-full gap-3 relative">
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-white"
                >
                  Nationality
                </label>

                <select
                  id="nationality"
                  defaultValue={players[index].nationality}
                  className="h-12 w-full px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg appearance-none"
                  {...register("nationality", { required: true })}
                >
                  {nationalities.map((nationality, index) => (
                    <option
                      value={nationality}
                      key={index}
                      className="text-[#F8F8F8] rounded-sm bg-outline border"
                    >
                      {nationality}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="mr-3 w-4 h-4 text-base absolute bottom-4 right-1"
                />
              </div>
              <div className="flex flex-col h-20 w-full gap-3 relative">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-white"
                >
                  Position
                </label>
                <select
                  id="position"
                  {...register("position", { required: true })}
                  className="h-12 w-full px-4 py-3 bg-transparent text-[#F8F8F8] focus:outline-none border border-outline rounded-lg appearance-none"
                >
                  {["Goalkeeper", "Forward", "Midfielder", "Defender"].map(
                    (position, index) => (
                      <option
                        value={position}
                        key={index}
                        className="text-[#F8F8F8] rounded-sm bg-outline border"
                      >
                        {position}
                      </option>
                    )
                  )}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="mr-3 w-4 h-4 text-base absolute bottom-4 right-1"
                />
              </div>
              <div className="flex flex-col h-20 w-full gap-4">
                <label className="block text-sm font-medium text-white">
                  Starter
                </label>
                <div className="flex gap-4">
                  <label
                    htmlFor="starter-no"
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="starter-no"
                      value="No"
                      className="hidden peer"
                      defaultChecked={!players[index].starter}
                      {...register("starter", {
                        required: true,
                      })}
                    />
                    <div className="w-4 h-4 border border-gray-500 rounded-full peer-checked:border-primary peer-checked:border-4"></div>
                    No
                  </label>

                  <label
                    htmlFor="starter-yes"
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="starter-yes"
                      value="Yes"
                      className="hidden peer"
                      defaultChecked={players[index].starter}
                      {...register("starter", {
                        required: true,
                      })}
                    />
                    <div className="w-4 h-4 border border-gray-500 rounded-full peer-checked:border-primary peer-checked:border-4"></div>
                    Yes
                  </label>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="items-end">
          <p className="flex text-error text-sm font-medium self-center justify-center w-full">
            {error}
          </p>
          <Button disabled={!isDirty} form="edit-player-form" type="submit">
            Edit Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
