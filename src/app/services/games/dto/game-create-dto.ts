import {Gender} from "../../../models/games/Gender";

export interface GameCreateDTO {
  categoryId: string,
  gender:Gender,
  halleId:string,
  homeTeamClubCode:string,
  visitingTeamClubCode:string,
  dateTime: Date
}
