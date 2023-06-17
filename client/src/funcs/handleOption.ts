// import storyLogic from "./../data/2_tree.json";

const storyLogicData = [
  {
    A: 1,
    B: 2,
  },
  {
    A: 3,
    B: 4,
  },
  {
    A: 5,
    B: 6,
  },
  {
    A: 7,
    B: 8,
  },
  {
    A: 9,
    B: 10,
  },
];

export const handleOptionSelection = (
  currentStage: number,
  choice?: string
): number => {
  if (currentStage > storyLogicData.length) {
    return -1;
  } else {
    if (choice === "A") {
      return storyLogicData[currentStage].A;
    } else if (choice === "B") {
      return storyLogicData[currentStage].B;
    } else {
      return -1;
    }
  }
};
