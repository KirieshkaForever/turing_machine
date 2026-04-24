import type IRule from "./Rule.js";

export default interface IConfig {
  name: string;
  description: string;
  blank: string;
  initialState: string;
  finalStates: string[];
  tape: string;
  rules: IRule[];
}
