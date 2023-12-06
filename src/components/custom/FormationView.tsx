import { trimText } from "@lib/stringManipulation";
import { useState } from "react";

import { FontAwesomeIcon, faTriangleExclamation } from "@components/common/Icons";
import { Separator } from "@components/common/Separator";

import Field from "./Field";

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
              description: "Your team has too many starters for one or more of the positions in the 4-3-3 formation.",
            }
          : {
              title: "Formation",
              description: "4-3-3",
            };

  return (
    <div className='relative flex max-h-[calc(100%-40px)] flex-1 items-center justify-center gap-8 overflow-hidden rounded-lg bg-[#2D2D2D] p-8'>
      {starters.length !== 11 && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30'>
          <div className='flex h-32 w-96 flex-col items-center justify-center gap-2 rounded-lg bg-[#2D2D2D] p-6 text-center'>
            <p className='text-white'>
              <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2 text-[18px] font-medium text-[#FEA013]' />
              {info.title}
            </p>
            <p className='text-[14px] font-normal text-primary-foreground'>{info.description}</p>
          </div>
        </div>
      )}
      <Field players={players} setActivePlayer={setActivePlayer} />
      <div className='flex h-full max-h-[540px] w-full min-w-[320px] max-w-xs flex-col rounded-[4px] bg-[#222222] p-6'>
        {starters.length === 11 ? (
          <>
            <div className='relative flex h-2/3 flex-col justify-center'>
              <div
                className='jerseyNumber absolute top-0 z-10 ml-3 text-[40px] font-semibold text-primary'
                data-name={activePlayer.jerseyNumber}>
                {activePlayer.jerseyNumber}
              </div>
              <div className='relative flex w-full justify-center'>
                <div className='absolute h-[258px] w-[175px] bg-player-overlay'></div>
                <div className='absolute bottom-0 left-0 flex flex-col'>
                  <span className='text-2xl font-medium text-white'>{activePlayer.name}</span>
                  <span className='text-lg font-semibold text-primary'>{activePlayer.position}</span>
                </div>
                <img src={activePlayer.image} alt={activePlayer.name + " image"} className='h-[258px] w-[175px]' />
              </div>
              <div className='mt-4 flex h-11 grid-cols-3 gap-8'>
                <div className='flex flex-col justify-start gap-2'>
                  <span className='text-[14px] font-medium text-primary-foreground'>Height</span>
                  <span className='text-[14px] font-semibold text-[#F8F8F8]'>{activePlayer.height} m</span>
                </div>
                <div className='flex flex-col justify-start gap-2'>
                  <span className='text-[14px] font-medium text-primary-foreground'>Weight</span>
                  <span className='text-[14px] font-semibold text-[#F8F8F8]'>{activePlayer.weight} kg</span>
                </div>
                <div className='flex flex-col justify-start gap-2'>
                  <span className='text-[14px] font-medium text-primary-foreground'>Nationality</span>
                  <span className='items flex text-[14px] font-semibold text-[#F8F8F8]'>
                    <img src={activePlayer.flagImage} className='mr-1 h-4 w-4' />
                    {trimText(activePlayer.nationality, 10)}
                  </span>
                </div>
              </div>
            </div>
            <Separator className='my-6 bg-outline' />
            <div className='flex h-1/3 flex-col gap-4'>
              <div className='flex gap-14'>
                <div className='flex min-w-[82px] flex-col'>
                  <p className='text-2xl font-semibold text-primary'>{activePlayer.appearances}</p>
                  <p className='text-[12px] font-normal text-primary-foreground'>Appearances</p>
                </div>
                <div className='flex min-w-[82px] flex-col'>
                  <p className='text-2xl font-semibold text-primary'>{activePlayer.minutesPlayed}</p>
                  <p className='text-[12px] font-normal text-primary-foreground'>Minutes Played</p>
                </div>
              </div>
              <div className='flex gap-14'>
                <div className='flex min-w-[82px] flex-col'>
                  <p className='text-2xl font-semibold text-primary'>
                    {activePlayer.position === "Goalkeeper" ? activePlayer.cleanSheets : activePlayer.goals}
                  </p>
                  <p className='text-[12px] font-normal text-primary-foreground'>
                    {activePlayer.position === "Goalkeeper" ? "Clean sheets" : "Goals"}
                  </p>
                </div>
                <div className='flex min-w-[82px] flex-col'>
                  <p className='text-2xl font-semibold text-primary'>
                    {activePlayer.position === "Goalkeeper" ? activePlayer.saves : activePlayer.assists}
                  </p>
                  <p className='text-[12px] font-normal text-primary-foreground'>
                    {activePlayer.position === "Goalkeeper" ? "Saves" : "Assists"}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='relative flex h-2/3 flex-col justify-center'></div>
            <Separator className='my-6 bg-outline' />
            <div className='flex h-1/3 flex-col gap-4'></div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormationView;
