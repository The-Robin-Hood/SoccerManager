import { setLocalStorage } from "@lib/localStorage";
import cn from "@lib/utils";
import Papa from "papaparse";
import { Dispatch, SetStateAction, useState } from "react";

const FileInput = ({
  players,
  setPlayers,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const initialText = "No file selected";
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(initialText);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length > 1) {
      setError("Please select only one file");
      return;
    }

    if (e.target.files[0].type !== "text/csv") {
      setError("Please select a .csv file");
      return;
    }
    const file = e.target.files[0];
    const parsedData = Papa.parse(await file.text(), {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header) => header.trim(),
      dynamicTyping: true,
    });
    if (parsedData.errors.length > 0) {
      console.log(parsedData.errors)
      setError("Datas in the file are not in the correct format");
      return;
    }
    if (parsedData.data.length === 0) {
      setError("No data found in the file");
      return;
    }
    if (parsedData.data.length < 11) {
      setError("Minimum of 11 players required for a team");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerDatas = parsedData.data.map((player: any) => {
      const Player: Player = {
        name: player["Player Name"],
        image: player["Player Image"],
        jerseyNumber: parseInt(player["Jersey Number"]),
        position: player["Position"],
        height:
          player["Height"] !== "Unknown" ? parseInt(player["Height"]) : -1,
        weight:
          player["Weight"] !== "Unknown" ? parseInt(player["Weight"]) : -1,
        nationality: player["Nationality"],
        flagImage: player["Flag Image"],
        starter: player["Starter"].toLowerCase() === "yes" ? true : false,
        appearances: parseInt(player["Appearances"]),
        minutesPlayed: parseInt(player["Minutes Played"]),
        goals: player["Goals"] !== "N/A" ? parseInt(player["Goals"]) : -1,
        assists: player["Assists"] !== "N/A" ? parseInt(player["Assists"]) : -1,
        cleanSheets:
          player["Clean Sheets"] !== "N/A"
            ? parseInt(player["Clean Sheets"])
            : -1,
        saves: player["Saves"] !== "N/A" ? parseInt(player["Saves"]) : -1,
      };
      return Player;
    });

    for (let i = 0; i < playerDatas.length; i++) {
      const player = playerDatas[i];
      if (Object.keys(player).some((key) => player[key] === null)) {
        setError(
          "Your sheet is missing data. Please ensure all cells are filled out."
        );
        return;
      }
    }

    const flagCollection: Record<string, string> = playerDatas.reduce(
      (acc: Record<string, string>, player) => {
        const key = player.nationality as string;
        acc[key] = player.flagImage;
        return acc;
      },
      {}
    );

    setLocalStorage("flagsCollection", JSON.stringify(flagCollection));
    setPlayers(playerDatas);
    setSelectedFile(e.target.files![0].name);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row justify-between items-center w-[300px] h-11 rounded-lg border border-outline pl-4 mt-2 mb-4",
          {
            "border-error": error !== "",
          }
        )}
      >
        <input
          type="file"
          id="custom-input"
          onChange={handleFileChange}
          hidden
          accept=".csv"
        />
        <label
          className={cn("text-sm text-primary-foreground", {
            "text-[#999999]": selectedFile === initialText,
          })}
        >
          {selectedFile}
        </label>
        <label
          htmlFor="custom-input"
          className={cn(
            "text-sm text-primary-foreground py-2 px-4 rounded-md border-0 font-semibold bg-background cursor-pointer border-l border-outline h-full flex items-center",
            {
              "border-error": error !== "",
            }
          )}
        >
          Select File
        </label>
      </div>
      {error === "" ? (
        <p className="text-[#999999]">File must be in .csv format</p>
      ) : (
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-error font-medium">Error</p>
          <span className="text-primary-foreground font-normal">{error}</span>
        </div>
      )}

      {players.length > 0 && (
        <div className="flex flex-col text-sm mt-8 mb-6">
          <p className="text-white font-medium mb-6">File Summary</p>
          <table>
            <thead className="text-primary-foreground font-normal">
              <tr>
                <td>Total Players</td>
                <td>Goal Keepers</td>
                <td>Defenders</td>
                <td>Midfielders</td>
                <td>Forwards</td>
              </tr>
            </thead>
            <tbody className="text-primary-foreground font-semibold">
              <tr>
                <td className="py-6">{players.length}</td>
                <td className="py-6">
                  {
                    players.filter((player) => player.position === "Goalkeeper")
                      .length
                  }
                </td>
                <td className="py-6">
                  {
                    players.filter((player) => player.position === "Defender")
                      .length
                  }
                </td>
                <td className="py-6">
                  {
                    players.filter((player) => player.position === "Midfielder")
                      .length
                  }
                </td>
                <td className="py-6">
                  {
                    players.filter((player) => player.position === "Forward")
                      .length
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default FileInput;
