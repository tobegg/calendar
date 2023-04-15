import React, { FC } from 'react';

interface LabelProps {
  color: string;
}

const Label: FC<LabelProps> = ({ color }) => {
  const classes = `p-1 bg-${color} mr-1 mb-1 rounded-md w-[40px]`;

  return (
    <div className={classes}></div>
  );
};

export default Label;
