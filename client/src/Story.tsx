import React from 'react';
import storyDataJSON from './data/2.json';

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
  A: string;
  stage: number;
}

const StoryContent: React.FC<StoryContentProps> = ({ A, stage }) => {
  const stageString = stage.toString();

  if (!storyData.hasOwnProperty(stageString)) {
    return <p>Invalid stage number</p>;
  }

  const text = storyData[stageString].text;
  const question = storyData[stageString].question;
  const options = storyData[stageString].option;

  const lines = text.split('\r\n');
  const paragraphs = lines.map((line, index) => <p key={index}>{line}</p>);

  let optionElements: JSX.Element[] = [];
  if (options) {
    optionElements = Object.keys(options).map((optionKey, index) => (
      <p key={index + lines.length}>
        {optionKey}: {options[optionKey].text}
      </p>
    ));
  }

  return (
    <div>
      {paragraphs}
      {question && <p>{question}</p>}
      {optionElements}
    </div>
  );
}

export default StoryContent;
