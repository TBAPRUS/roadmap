import React from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';

import { WindowType } from '../../store/window/types';

import { resetWindow } from '../../store/window/actions';

interface WindowProps {
  window: WindowType;
  resetWindow: typeof resetWindow;
}

const Window: React.FC<WindowProps> = ({
  window,
  resetWindow,
}): JSX.Element => {
  const answers = window.answers
    ? window.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => {
            window.methods[index](null, null, null);
            resetWindow();
          }}
        >
          {answer}
        </button>
      ))
    : null;

  return (
    <div className="window">
      <button onClick={resetWindow}>CLOSE</button>
      <h2>{window.title}</h2>
      {window.text && <p>{window.text}</p>}
      {answers && <div className="answers">{answers}</div>}
    </div>
  );
};

const mapStateToProps = (state: AppType) => {
  const { window } = state;
  return { window };
};

export default connect(mapStateToProps, { resetWindow })(Window);
