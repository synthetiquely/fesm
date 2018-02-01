import * as React from 'react';

export interface Props {}
export interface State {}

class Form extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <form>
        <div className="field has-addons">
          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              className="input is-large"
              placeholder="Введите город"
              autoFocus
              autoComplete="off"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-map-marker" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
          <div className="control is-large">
            <button className="button is-primary is-large">Отправить</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
