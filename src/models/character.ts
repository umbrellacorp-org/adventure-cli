export enum CharacterClass {
  ROGUE = "Rogue",
  WARRIOR = "Warrior",
  MAGICIAN = "Magician",
  RANGER = "Ranger",
  PRIEST = "Priest",
}

export type Character = {
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  nextLevelExperience: number;
}