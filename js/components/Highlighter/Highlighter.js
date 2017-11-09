// @flow
import React from 'react';
import TextHighlighting from 'react-text-highlighting';

type Props = {
  children: string,
  ranges: Array<[number, number]>,
};

const highlightColor = '#d35400';

const STYLES = {
  highlight: {backgroundColor: highlightColor},
  range: {
    start:   {backgroundColor: highlightColor},
    between: {backgroundColor: highlightColor},
    end:     {backgroundColor: highlightColor},
  },
};

const Highlighter = ({children, ranges}: Props) => (
  <TextHighlighting highlightCharsRanges={ranges.map(([start, end]) => ({start, end}))} styles={STYLES}>
    {children}
  </TextHighlighting>
);

export default Highlighter;
