import chalk from "chalk";
import { mainMenu } from "./commands";
import { Character } from "./models/character";

const renderGame = (character: Character): void => {
  console.log(`Welcome to ${chalk.bold.green("Kashan")} ${character.name}`)
}

const run = async (): Promise<void> => {
  await mainMenu(renderGame);
}

run();