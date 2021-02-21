import chalk from "chalk";

export enum DialogTemper {
  HAPPY="happy",
  NEUTRAL="neutral",
  ANNOYED="annoyed",
  ANGRY="angry"
}

export const dialog = (
  characterName: string, 
  message: string, 
  temper: DialogTemper = DialogTemper.NEUTRAL,
  backgroundColor?: string
): void => {
  let bg: string | undefined = backgroundColor;

  if (!bg) {
    switch (temper) {
      case DialogTemper.HAPPY:
        bg = "#5bc21d";
        break;
      case DialogTemper.ANNOYED:
        bg = "#fdad80";
        break;
      case DialogTemper.ANGRY:
        bg = "#f93f37";
        break;
      default:
        bg = "#13adce"
        break;
    }
  }

  const messenger = chalk.bgHex(bg).white.bold(` ${characterName} `);
  console.log("\n", messenger, message);
}