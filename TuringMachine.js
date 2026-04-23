import chalk from "chalk";
import RuleBook from "./RuleBook.js";
import Tape from "./Tape.js";
import { delay } from "./utils.js";

export default class TuringMachine {
  constructor(config) {
    this.tape = new Tape(config.tape, config.blank);
    this.rules = new RuleBook(config.rules, config.blank);
    this.currentState = config.initialState;
    this.finalStates = config.finalStates;
    this.stepsCount = 0;
    this.lastRule = null;
    this.haltedWithError = false;
  }

  step() {
    if (this.finalStates.includes(this.currentState)) {
      return false;
    }

    const symbol = this.tape.read();
    const rule = this.rules.getRule(this.currentState, symbol);

    if (!rule) {
      this.haltedWithError = true;
      return false;
    }

    this.lastRule = {
      from: { state: this.currentState, read: symbol },
      to: rule,
    };

    this.tape.write(rule.write);
    this.tape.move(rule.move);
    this.currentState = rule.nextState;
    this.stepsCount++;

    return true;
  }

  async run() {
    while (true) {
      this.display();
      await delay(500);

      if (!this.step()) break;
    }

    this.displayFinalResult();
  }

  display() {
    console.clear();
    const stateMsg = `Состояние: ${chalk.yellow(this.currentState)}`;
    const stepMsg = `Шаг: ${chalk.cyan(this.stepsCount)}`;
    console.log(`${stateMsg} | ${stepMsg}`);

    if (this.lastRule) {
      const { from, to } = this.lastRule;
      const ruleMsg = `Правило: (${from.state}, ${from.read}) -> (${to.write}, ${to.move}, ${to.nextState})`;
      console.log(chalk.dim(ruleMsg));
    }

    console.log("─".repeat(40));

    const VIEW_RADIUS = 20;
    const { headPosition, blankSymbol } = this.tape;

    let tapeStr = "";
    for (
      let i = headPosition - VIEW_RADIUS;
      i <= headPosition + VIEW_RADIUS;
      i++
    ) {
      tapeStr += this.tape.tape.get(i) ?? blankSymbol;
    }
    console.log(`...${tapeStr}...`);

    const pointerPadding = " ".repeat(VIEW_RADIUS + 3);
    console.log(pointerPadding + chalk.red.bold("^"));
  }

  displayFinalResult() {
    console.log(chalk.bold("\n=== ФИНАЛЬНЫЙ РЕЗУЛЬТАТ ==="));

    if (this.haltedWithError) {
      console.log(chalk.red("Машина остановлена: не найдено подходящее правило."));
    } else {
      console.log(chalk.green("Машина успешно завершила работу."));
    }

    console.log(`Финальное состояние: ${chalk.yellow(this.currentState)}`);
    console.log(`Шагов выполнено: ${chalk.cyan(this.stepsCount)}`);

    console.log(`Лента: ${this.tape.getTapeRepresentation()}`);
  }
}
