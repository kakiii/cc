import React from 'react';
import storyDataJSON from './data/2.json';
import { handleOptionSelection } from './funcs/handleOption';

interface Option {
  [key: string]: { text: string; goto: string };
}

interface StoryData {
  [key: string]: {
    text: string;
    question?: string;
    ending: boolean;
    option?: Option;
  };
}

const storyData: StoryData = storyDataJSON as StoryData;

interface StoryContentProps {
  stage: string;
  choice?: string;

}

const StoryContent: React.FC<StoryContentProps> = ({ stage, choice }) => {
  let stageString = "";
  if (stage === "-1") {
    stageString = "0";
  } else {
    const nextStage = handleOptionSelection(stage, choice);
    if (nextStage.length !== 1) console.error("Invalid next stage");
    stageString = nextStage;
    
  }
  


  if (!storyData.hasOwnProperty(stageString)) {
    return <p>Invalid stage number</p>;
  }

  const text = storyData[stageString].text;
  const question = storyData[stageString].question;
  const options = storyData[stageString].option;

  const lines = text.split('\r\n');
  const paragraphs = lines.map((line, index) => <p key={index}>{line}</p>);

  // add question and options as text
  const optionElements: JSX.Element[] = [];
  if (options) {
    for (let option in options) {
      optionElements.push(
        <p key={option} >
          {option}: {options[option].text}
        </p>
      );
    }
  }

  

  return (
    <>
      {paragraphs}
      {question && <p>{question}</p>}
      {optionElements}
    </>
  );
}

export default StoryContent;
