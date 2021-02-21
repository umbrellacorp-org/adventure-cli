import util from "util";
import fs from "fs";

export { NpcNames } from "./npcs";
export { dialog, DialogTemper } from "./dialog";

// Async awaitable fs.readRile.
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);