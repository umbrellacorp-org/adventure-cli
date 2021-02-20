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
  temper: DialogTemper = DialogTemper.NEUTRAL
): void => {
  let backgroundColor: "bgGreen" | "bgCyan" | "bgYellow" | "bgRed";

  switch (temper) {
    case DialogTemper.HAPPY:
      backgroundColor = "bgGreen";
      break;
    case DialogTemper.ANNOYED:
      backgroundColor = "bgYellow";
      break;
    case DialogTemper.ANGRY:
      backgroundColor = "bgRed";
      break;
    default:
      backgroundColor = "bgCyan"
      break;
  }
  const messenger = chalk[backgroundColor].white.bold(` ${characterName} `);
  console.log(messenger, message);
}