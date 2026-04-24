import type { Direction } from "./types/Rule.ts";

type TapeMap = Map<number, string>;

export default class Tape {
  public tape: TapeMap;
  public blankSymbol: string;
  public headPosition = 0;

  constructor(inputString: string, blankSymbol: string) {
    this.tape = new Map<number, string>(
      Array.from(inputString).map((ch, i) => [i, ch]),
    );
    this.blankSymbol = blankSymbol;
    this.headPosition = 0;
  }

  read(): string {
    return this.tape.get(this.headPosition) ?? this.blankSymbol;
  }

  write(symbol: string): void {
    if (symbol === this.blankSymbol) {
      this.tape.delete(this.headPosition);
    } else {
      this.tape.set(this.headPosition, symbol);
    }
  }

  move(direction: Direction): void {
    if (direction === "R") {
      this.headPosition++;
    } else if (direction === "L") {
      this.headPosition--;
    }
  }

  getTapeRepresentation(): string {
    const keys: number[] = [...this.tape.keys()];
    if (keys.length === 0) return "";

    const minIndex = Math.min(...keys);
    const maxIndex = Math.max(...keys);

    let result = "";
    for (let i = minIndex; i <= maxIndex; i++) {
      result += this.tape.get(i) ?? this.blankSymbol;
    }

    return result;
  }
}
