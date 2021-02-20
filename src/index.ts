import { mainMenu } from "./commands";

const run = async (): Promise<void> => {
  await mainMenu()
}

run();