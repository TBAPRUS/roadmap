import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppType } from '../../store';

import { changeError } from '../../store/error/actions';

export const CustomError: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppType) => state.error);

  return (
    <div className="error">
      {error}
      <button onClick={() => dispatch(changeError(''))}>close</button>
    </div>
  );
};
