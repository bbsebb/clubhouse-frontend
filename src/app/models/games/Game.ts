import {Competition} from "./Competition";
import {Day} from "./Day";
import {Week} from "./Week";
import {Season} from "./Season";
import {Hall} from "./Hall";
import {Referees} from "./Referees";
import {Team} from "./Team";
import {Fdme} from "./Fdme";
import {Score} from "./Score";

export interface Game {
  code: string;
  competition: Competition;
  day: Day;
  week: Week;
  season: Season;
  halle: Hall;
  referees: Referees;
  homeTeam: Team;
  visitingTeam: Team;
  score: Score;
  fdme: Fdme;
  dateTime: Date;
  isPlayed:boolean;
}
