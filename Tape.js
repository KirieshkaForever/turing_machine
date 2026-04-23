export default class Tape {
  constructor(inputString, blankSymbol) {
    this.tape = new Map(Array.from(inputString).map((ch, i) => [i, ch]));
    this.blankSymbol = blankSymbol;
    this.headPosition = 0;
  }

  read() {
    return this.tape.get(this.headPosition) ?? this.blankSymbol;
  }

  write(symbol) {
    if (symbol === this.blankSymbol) {
      this.tape.delete(this.headPosition);
    } else {
      this.tape.set(this.headPosition, symbol);
    }
  }

  move(direction) {
    if (direction === "R") {
      this.headPosition++;
    } else if (direction === "L") {
      this.headPosition--;
    }
  }

  getTapeRepresentation() {
    const keys = [...this.tape.keys()];
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
