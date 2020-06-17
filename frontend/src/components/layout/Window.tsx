import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppType } from '../../store';

import { resetWindow } from '../../store/window/actions';

export const Window: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const window = useSelector((state: AppType) => state.window);

  const answers = window.answers
    ? window.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => {
            window.methods[index](null, null, null);
            dispatch(resetWindow());
          }}
        >
          {answer}
        </button>
      ))
    : null;

  return (
    <div className="window">
      <button onClick={() => dispatch(resetWindow())}>CLOSE</button>
      <h2>{window.title}</h2>
      {window.text && <p>{window.text}</p>}
      {answers && <div className="answers">{answers}</div>}
    </div>
  );
};
