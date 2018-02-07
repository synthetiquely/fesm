import * as React from 'react';
import classnames from 'classnames';

interface Props {
  text: string;
  type: 'default' | 'info' | 'primary' | 'success' | 'warning' | 'error';
}

const Alert = (props: Props) => (
  <div
    className={classnames('notification', {
      'is-danger': props.type === 'error',
      'is-warning': props.type === 'warning',
      'is-default': props.type === 'default',
      'is-primary': props.type === 'primary',
      'is-success': props.type === 'success',
      'is-info': props.type === 'info',
    })}
  >
    {props.text}
  </div>
);

export default Alert;
