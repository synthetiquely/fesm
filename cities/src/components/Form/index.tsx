import * as React from 'react';
import classnames from 'classnames';

export interface Props {
  currentLetter: string;
  apiError: any;
  isLoading: boolean;
  gameInProgress: boolean;
  handleSubmitForm: (city: string) => void;
}

export interface State {
  city: string;
  error: any;
}

class Form extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: '',
      error: null,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.apiError) {
      this.setState({
        error: nextProps.apiError,
      });
    }
  }

  validate = (value: string) => {
    if (value.trim() !== '') {
      if (this.props.currentLetter) {
        if (this.props.currentLetter === value[0].toLowerCase()) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  };

  onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      error: null,
    });
    if (this.validate(this.state.city)) {
      this.props.handleSubmitForm(this.state.city);
    } else {
      if (this.props.currentLetter) {
        this.setState({
          error: 'Вы забыли ввести название города',
        });
      } else {
        this.setState({
          error: `Введите город на букву ${this.props.currentLetter}`,
        });
      }
    }
  };

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      error: null,
      city: e.currentTarget.value,
    });
  };

  render() {
    const { city, error } = this.state;
    const { gameInProgress, isLoading } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="field has-addons">
          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              className={classnames('input is-large', { 'is-danger': !!error })}
              placeholder="Введите город"
              autoFocus
              autoComplete="off"
              disabled={!gameInProgress}
              value={city}
              onChange={this.onChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-map-marker" />
            </span>
            {!error &&
              !isLoading && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              )}
            {error &&
              !isLoading && (
                <span className="icon is-small is-right">
                  <i className="fas fa-times" />
                </span>
              )}
          </div>
          <div className="control is-large">
            <button
              className={classnames('button is-primary is-large', { 'is-loading': isLoading })}
              disabled={!gameInProgress}
              type="submit"
            >
              Отправить
            </button>
          </div>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </form>
    );
  }
}

export default Form;
