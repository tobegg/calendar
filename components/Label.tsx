import React, { FC } from 'react';

interface LabelProps {
  color: string;
}

const Label: FC<LabelProps> = ({ color }) => {
  const classes = `p-1 bg-${color}-500 rounded-md max-w-[50px]`;

  return (
    <div className={classes}></div>
  );
};

export default Label;
