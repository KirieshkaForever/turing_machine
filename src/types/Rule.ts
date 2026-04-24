export type Direction = "L" | "R";

export interface RuleObject {
  write: string;
  move: Direction;
  nextState: string;
}

export default interface IRule {
  state: string;
  read: string;
  write: string;
  move: Direction;
  nextState: string;
}
