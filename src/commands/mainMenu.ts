import chalk from "chalk";
import inquirer from "inquirer";
import { Character } from "../models/character";
import { dialog, DialogTemper, NpcNames } from "../utils";
import { createCharacter } from "./character";

enum MainMenuAnswer {
  SELECT_CHARACTER="Select Character",
  CREATE_CHARACTER="Create Character",
  EXIT="Exit"
}

type MainMenu = {
  selection: MainMenuAnswer
}

export const mainMenu = async (callback: (char: Character) => void): Promise<void> => {
  const prompt = inquirer.createPromptModule();
  const choices = [MainMenuAnswer.SELECT_CHARACTER, MainMenuAnswer.CREATE_CHARACTER, new inquirer.Separator(), MainMenuAnswer.EXIT];
  try {
    const { selection } = await prompt<MainMenu>([
      { name: "selection", message: "Welcome adventure, What would you like to do?", type: "list", choices }
    ])

    if (selection === MainMenuAnswer.SELECT_CHARACTER) console.log("selectChar");
    if (selection === MainMenuAnswer.CREATE_CHARACTER) {
      const character = await createCharacter();
      callback(character);
    }
    if (selection === MainMenuAnswer.EXIT) {
      dialog(NpcNames.INNKEEPER, "Welcome back to the Inn adventure.", DialogTemper.HAPPY)
      dialog(NpcNames.INNKEEPER, "I've prepared your usual room for a nice rest.", DialogTemper.HAPPY)
      console.log(chalk.italic("You get up the stairs tired & slowly."));
      console.log(chalk.italic(`${chalk.bold("*boink*")}, you slam in the bed and fell deeply asleep`));
      console.log(chalk.italic("...zZzZz"));
      process.exit(0);
    };
  } catch (err) {
    console.error(err);
    console.log("Failed to execute main menu selection terminating.")
    process.exit(0)
  }
}