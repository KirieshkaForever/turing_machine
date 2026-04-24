import fs from "fs";
import type IConfig from "./types/Config.ts";
import TuringMachine from "./TuringMachine.ts";

const fileName: string | undefined = process.argv[2];
if (!fileName) {
  console.error("Пожалуйста, укажите путь к JSON файлу.");
  process.exit(1);
}

fs.readFile(
  `machines/${fileName}`,
  "utf-8",
  (err: Error | null, data: string) => {
    if (err) {
      console.error(err);
      return;
    }

    const config: IConfig = JSON.parse(data);
    const turingMachine = new TuringMachine(config);

    turingMachine.run();
  },
);
