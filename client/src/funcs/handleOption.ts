import storyLogic from "./../data/2_tree.json";

interface StoryLogic {
  [key: string]: { [key: string]: string };
}

const storyLogicData: StoryLogic = storyLogic;

export const handleOptionSelection = (
    currentStage: string,
    choice?: string  
): string => {
  if (storyLogicData.hasOwnProperty(currentStage)) {
    
    const options = storyLogicData[currentStage];
    if (choice) {
      return options[choice];
    } else {
      return `Error: choice '${choice}' not found in storyLogicData`;
    }
  } else if (currentStage === "-1") return "0";
  else {
    return `Error: currentStage '${currentStage}' not found in storyLogicData`;
  }
};
