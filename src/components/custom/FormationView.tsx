import { Separator } from "@components/common/Separator";
import {
  FontAwesomeIcon,
  faTriangleExclamation,
} from "@components/common/Icons";
import Field from "./Field";
import { useState } from "react";
import { trimText } from "@lib/stringManipulation";
const FormationView = ({ players }: { players: Player[] }) => {
  const starters = players.filter((player) => player.starter);
  const [activePlayer, setActivePlayer] = useState<Player>(
    starters.filter((player) => player.position === "Goalkeeper")[0]
  );
  const info =
    starters.length === 0
      ? {
          title: "No player data found",
          description: "Please import your roster first.",
        }
      : starters.length < 11
      ? {
          title: "Not enough starters",
          description:
            "Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation.",
        }
      : starters.length > 11
      ? {
          title: "There are too many starters",
          description:
            "Your team has too many starters for one or more of the positions in the 4-3-3 formation.",
        }
      : {
          title: "Formation",
          description: "4-3-3",
        };

  return (
    <div className="flex flex-1 p-8 max-h-[calc(100%-40px)] rounded-lg bg-[#2D2D2D] gap-8 relative overflow-hidden items-center justify-center">
      {starters.length !== 11 && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center">
          <div className="bg-[#2D2D2D] h-32 w-96 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-white">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-[#FEA013] text-[18px] mr-2 font-medium"
              />
              {info.title}
            </p>
            <p className="text-primary-foreground font-normal text-[14px]">
              {info.description}
            </p>
          </div>
        </div>
      )}
      <Field players={players} setActivePlayer={setActivePlayer} />
      <div className="w-full h-full max-w-xs bg-[#222222] rounded-[4px] flex flex-col p-6 max-h-[540px] min-w-[320px]">
        {starters.length === 11 ? (
          <>
            <div className="flex flex-col h-2/3 justify-center relative">
              <div className="absolute text-primary text-[40px] font-semibold top-0 ml-3 jerseyNumber z-10" data-name={activePlayer.jerseyNumber}>
                {activePlayer.jerseyNumber}
              </div>
              <div className="flex justify-center w-full relative">
                <div className="absolute w-[175px] h-[258px] bg-player-overlay"></div>
                <div className="flex flex-col absolute bottom-0 left-0">
                  <span className="text-white text-2xl font-medium">
                    {activePlayer.name}
                  </span>
                  <span className="text-primary text-lg font-semibold">
                    {activePlayer.position}
                  </span>
                </div>
                <img
                  src={activePlayer.image}
                  alt={activePlayer.name + " image"}
                  className="w-[175px] h-[258px]"
                />
              </div>
              <div className="h-11 flex grid-cols-3 gap-8 mt-4">
                <div className="flex flex-col justify-start gap-2">
                  <span className="text-primary-foreground text-[14px] font-medium">
                    Height
                  </span>
                  <span className="text-[#F8F8F8] text-[14px] font-semibold">
                    {activePlayer.height} m
                  </span>
                </div>
                <div className="flex flex-col justify-start gap-2">
                  <span className="text-primary-foreground text-[14px] font-medium">
                    Weight
                  </span>
                  <span className="text-[#F8F8F8] text-[14px] font-semibold">
                    {activePlayer.weight} kg
                  </span>
                </div>
                <div className="flex flex-col justify-start gap-2">
                  <span className="text-primary-foreground text-[14px] font-medium">
                    Nationality
                  </span>
                  <span className="text-[#F8F8F8] text-[14px] font-semibold flex items">
                    <img
                      src={activePlayer.flagImage}
                      className="w-4 h-4 mr-1"
                    />
                    {trimText(activePlayer.nationality, 10)}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="bg-outline my-6" />
            <div className="flex flex-col gap-4 h-1/3">
              <div className="flex gap-14">
                <div className="flex flex-col min-w-[82px]">
                  <p className="text-primary font-semibold text-2xl">
                    {activePlayer.appearances}
                  </p>
                  <p className="text-primary-foreground font-normal text-[12px]">
                    Appearances
                  </p>
                </div>
                <div className="flex flex-col min-w-[82px]">
                  <p className="text-primary font-semibold text-2xl">
                    {activePlayer.minutesPlayed}
                  </p>
                  <p className="text-primary-foreground font-normal text-[12px]">
                    Minutes Played
                  </p>
                </div>
              </div>
              <div className="flex gap-14">
                <div className="flex flex-col min-w-[82px]">
                  <p className="text-primary font-semibold text-2xl">
                    {activePlayer.position === "Goalkeeper"
                      ? activePlayer.cleanSheets
                      : activePlayer.goals}
                  </p>
                  <p className="text-primary-foreground font-normal text-[12px]">
                    {activePlayer.position === "Goalkeeper"
                      ? "Clean sheets"
                      : "Goals"}
                  </p>
                </div>
                <div className="flex flex-col min-w-[82px]">
                  <p className="text-primary font-semibold text-2xl">
                    {activePlayer.position === "Goalkeeper"
                      ? activePlayer.saves
                      : activePlayer.assists}
                  </p>
                  <p className="text-primary-foreground font-normal text-[12px]">
                    {activePlayer.position === "Goalkeeper"
                      ? "Saves"
                      : "Assists"}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col h-2/3 justify-center relative"></div>
            <Separator className="bg-outline my-6" />
            <div className="flex flex-col gap-4 h-1/3"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormationView;
