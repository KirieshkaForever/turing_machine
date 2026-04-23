export default class RuleBook {
  constructor(rules, blankSymbol) {
    this.rulesMap = new Map(
      rules.map((rule) => {
        const key = `${rule.state}|${rule.read}`;
        const value = {
          write: rule.write,
          move: rule.move,
          nextState: rule.nextState,
        };
        return [key, value];
      }),
    );
  }

  getRule(state, readSymbol) {
    const key = `${state}|${readSymbol}`;
    return this.rulesMap.get(key);
  }
}
