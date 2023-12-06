type Player = {
  [key: string]: string | number | boolean;
  name: string;
  image: string;
  jerseyNumber: number;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  height: number;
  weight: number;
  nationality: string;
  flagImage: string;
  starter: boolean;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  saves: number;
};
