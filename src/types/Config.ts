import IRule from "./Rule.ts";

export default interface IConfig {
  name: string;
  description: string;
  blank: string;
  initialState: string;
  finalStates: string[];
  tape: string;
  rules: IRule[];
}
