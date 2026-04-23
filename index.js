"use strict";

import fs from "fs";
import TuringMachine from "./TuringMachine.js";

const fileName = process.argv[2];
if (!fileName) {
  console.error("Пожалуйста, укажите путь к JSON файлу.");
  process.exit(1);
}

fs.readFile(`machines/${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const config = JSON.parse(data);
  const turingMachine = new TuringMachine(config);

  turingMachine.run();
});
