import React from 'react';
import { connect } from 'react-redux';

import { AppType } from '../../store';
import { ErrorType } from '../../store/error/types';

import { changeError } from '../../store/error/actions';

interface ErrorProps {
  error: ErrorType;
  changeError: typeof changeError;
}

const ErrorSFC: React.SFC<ErrorProps> = ({
  error,
  changeError,
}): JSX.Element => (
  <div className="error">
    {error}
    <button onClick={() => changeError('')}>close</button>
  </div>
);

const mapStateToProps = (state: AppType) => {
  const { error } = state;
  return { error };
};

export const CustomError = connect(mapStateToProps, { changeError })(ErrorSFC);
