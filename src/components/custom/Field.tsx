import { trimText } from "@lib/stringManipulation";
import cn from "@lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

type PlayerInfo = {
  state: boolean;
  info: Player | undefined;
  cx: number;
  cy: number;
};

const Field = ({
  players,
  setActivePlayer,
}: {
  players: Player[];
  setActivePlayer: Dispatch<SetStateAction<Player>>;
}) => {
  const starters = players.filter((player) => player.starter);
  const GK = starters.find((player) => player.position === "Goalkeeper");
  const DF = starters.filter((player) => player.position === "Defender");
  const MF = starters.filter((player) => player.position === "Midfielder");
  const FW = starters.filter((player) => player.position === "Forward");
  const initialPlayerState: Record<string, PlayerInfo> = {
    Goalkeeper: {
      state: false,
      info: GK,
      cx: 66,
      cy: 270,
    },
    Defender1: {
      state: false,
      info: DF[0],
      cx: 218.25,
      cy: 72,
    },
    Defender2: {
      state: false,
      info: DF[1],
      cx: 208.237,
      cy: 189,
    },
    Defender3: {
      state: false,
      info: DF[2],
      cx: 208.237,
      cy: 352,
    },
    Defender4: {
      state: false,
      info: DF[3],
      cx: 218.25,
      cy: 469,
    },
    Midfielder1: {
      state: false,
      info: MF[0],
      cx: 402.479,
      cy: 110,
    },
    Midfielder2: {
      state: false,
      info: MF[1],
      cx: 402.479,
      cy: 270,
    },
    Midfielder3: {
      state: false,
      info: MF[2],
      cx: 402.479,
      cy: 430,
    },
    Forward1: {
      state: false,
      info: FW[0],
      cx: 572.689,
      cy: 132,
    },
    Forward2: {
      state: false,
      info: FW[1],
      cx: 594.716,
      cy: 270,
    },
    Forward3: {
      state: false,
      info: FW[2],
      cx: 572.689,
      cy: 409,
    },
  };
  const [playerState, setPlayerState] = useState<Record<string, PlayerInfo>>({
    ...initialPlayerState,
    Goalkeeper: {
      ...initialPlayerState.Goalkeeper,
      state: true,
    },
  });

  const handleClicked = (player: string) => {
    setActivePlayer(playerState[player].info!);
    setPlayerState({
      ...initialPlayerState,
      [player]: {
        ...initialPlayerState[player],
        state: true,
      },
    });
  };

  return (
    <svg width='808' height='541' viewBox='0 0 808 541' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Field'>
        <g id='soccer-field'>
          <rect
            id='Field_2'
            width='808'
            height='541'
            rx='4'
            fill='#3AA94C'
            className='flex h-full w-full items-start'
          />
          <path
            id='field-lines'
            opacity='0.7'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M774.68 31.0555H33.3201V99.1833H178.78H179.78V100.183V441.819V442.819H178.78H33.3201V509.944H774.68V442.819H629.22H628.22V441.819V100.183V99.1833H629.22H774.68V31.0555ZM775.68 99.1833V31.0555V30.0555H774.68H33.3201H32.3201V31.0555V99.1833V100.183V193.357V194.357V347.644V348.644V441.819V442.819V509.944V510.944H33.3201H774.68H775.68V509.944V442.819V441.819L775.68 348.644V347.644V194.357V193.357L775.68 100.183V99.1833ZM774.68 100.183H629.22V441.819H774.68L774.68 348.644H726.18H725.18V347.644V194.357V193.357H726.18H774.68L774.68 100.183ZM774.68 194.357H726.18V347.644H774.68V194.357ZM33.3201 441.819H178.78V100.183H33.3201V193.357H81.8201H82.8201V194.357V347.644V348.644H81.8201H33.3201V441.819ZM33.3201 347.644H81.8201V194.357H33.3201V347.644ZM402.99 188.354V34.063H403.99V188.348C403.993 188.348 403.997 188.348 404 188.348C449.74 188.348 486.82 225.129 486.82 270.5C486.82 315.871 449.74 352.652 404 352.652C403.997 352.652 403.993 352.652 403.989 352.652V506.922H402.989V352.646C357.715 352.109 321.18 315.537 321.18 270.5C321.18 225.463 357.715 188.891 402.99 188.354ZM402.99 189.354C358.26 189.891 322.18 226.023 322.18 270.5C322.18 314.977 358.26 351.109 402.989 351.646L402.99 189.354ZM403.989 351.652C403.993 351.652 403.997 351.652 404 351.652C449.196 351.652 485.82 315.311 485.82 270.5C485.82 225.689 449.196 189.348 404 189.348C403.997 189.348 403.993 189.348 403.99 189.348L403.989 351.652Z'
            fill='white'
            fillOpacity='0.7'
          />
          <rect id='overlay' width='808' height='541' rx='4' fill='url(#paint0_radial_203_98)' />
        </g>
        {starters.length == 11 &&
          Object.keys(playerState).map((player, index) => {
            return (
              <g
                key={index}
                className='cursor-pointer select-none overflow-visible'
                onClick={() => handleClicked(player)}>
                <circle
                  id={player}
                  cx={playerState[player].cx}
                  cy={playerState[player].cy}
                  r='15'
                  fill='#2D2D2D'
                  stroke='#CBCBCB'
                  strokeWidth='2'
                  className={cn("cursor-pointer", {
                    "fill-[#FEA013] stroke-none": playerState[player].state,
                  })}
                />
                <text
                  id={player}
                  fill='white'
                  fontFamily='Poppins'
                  fontSize='16'
                  fontWeight='600'
                  textAnchor='middle'
                  alignmentBaseline='middle'>
                  <tspan x={playerState[player].cx} y={playerState[player].cy + 5}>
                    {playerState[player].info?.jerseyNumber}
                  </tspan>
                </text>

                <text
                  id='GK'
                  fill='#F8F8F8'
                  fontFamily='Poppins'
                  fontSize='14'
                  fontWeight='500'
                  textAnchor='middle'
                  alignmentBaseline='middle'>
                  <tspan x={playerState[player].cx} y={playerState[player].cy + 35}>
                    {trimText(playerState[player].info?.name, 15)}
                  </tspan>
                </text>
              </g>
            );
          })}
      </g>
      <defs>
        <radialGradient
          id='paint0_radial_203_98'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(404 270.5) rotate(90) scale(397.735 505.956)'>
          <stop stopColor='#3AA94C' stopOpacity='0' />
          <stop offset='0.541667' stopColor='#1B4D23' stopOpacity='0.42' />
          <stop offset='0.734375' stopColor='#0F2D14' stopOpacity='0.45' />
          <stop offset='1' stopOpacity='0.33' />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Field;
