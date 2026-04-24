import type IRule from "./types/Rule.ts";
import type { RuleObject } from "./types/Rule.ts";

type RulesMap = Map<string, RuleObject>;

export default class RuleBook {
  private rulesMap: RulesMap;

  constructor(rules: IRule[], blankSymbol: string) {
    this.rulesMap = new Map(
      rules.map((rule: IRule) => {
        const key: string = `${rule.state}|${rule.read}`;
        const value: RuleObject = {
          write: rule.write,
          move: rule.move,
          nextState: rule.nextState,
        };
        return [key, value];
      }),
    );
  }

  getRule(state: string, readSymbol: string): RuleObject | null {
    const key = `${state}|${readSymbol}`;
    return this.rulesMap.get(key) ?? null;
  }
}
