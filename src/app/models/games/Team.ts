import {Category} from "./Category";
import {Club} from "./Club";
import {TeamsColor} from "./TeamsColor";
import {Coach} from "./Coach";
import {Gender} from "./Gender";

export interface Team {
  id: string;
  category: Category;
  gender: Gender;
  number: number;
  club: Club;
  teamsColor: TeamsColor;
  coach: Coach;
}
