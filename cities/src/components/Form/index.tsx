import * as React from 'react';
import classnames from 'classnames';
import { validateCityName } from '../../utils/validate';
import {
  initializeSpeechRecognition,
  SpeechEvent,
} from '../../utils/speechRecognition';

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
  hashVoiceSupport: boolean;
  isSpeaking: boolean;
}

interface Form {
  recognition: any;
  isMobile: boolean;
}

class Form extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { hashVoiceSupport, recognition } = initializeSpeechRecognition();
    this.state = {
      hashVoiceSupport,
      isSpeaking: false,
      city: '',
      error: null,
    };
    if (hashVoiceSupport) {
      this.recognition = recognition;
    }
    this.isMobile =
      'ontouchstart' in document.documentElement &&
      /Mobi/i.test(navigator.userAgent);
  }

  componentDidMount() {
    if (this.state.hashVoiceSupport) {
      this.recognition.onresult = (event: SpeechEvent) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        this.setState({
          city: transcript,
        });
      };
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.apiError) {
      this.setState({
        error: nextProps.apiError,
      });
    }
  }

  validate = (value: string) => {
    if (validateCityName(value.trim())) {
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
      this.props.handleSubmitForm(this.state.city.trim());
      this.setState({
        city: '',
      });
    } else {
      if (this.props.currentLetter) {
        this.setState({
          error: `Введите город на букву "${this.props.currentLetter}"`,
        });
      } else {
        this.setState({
          error: `Похоже вы забыли ввести название города`,
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

  onStartSpeaking = () => {
    if (this.state.hashVoiceSupport) {
      if (!this.state.isSpeaking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
      this.setState((prevState: State) => {
        return {
          isSpeaking: !prevState.isSpeaking,
          city: '',
        };
      });
    }
  };

  render() {
    const { city, error, isSpeaking, hashVoiceSupport } = this.state;
    const { gameInProgress, isLoading } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="field has-addons has-addons-right">
          <div
            className={classnames('control', { 'is-large': !this.isMobile })}
          >
            <button
              type="button"
              onClick={this.onStartSpeaking}
              className={classnames('button', {
                'is-success': isSpeaking,
                'is-default': !isSpeaking,
                'is-large': !this.isMobile,
              })}
              disabled={!hashVoiceSupport}
              title="Нажмите, чтобы ввести название голосом"
            >
              <i className="fas fa-microphone" />
            </button>
          </div>
          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              className={classnames('input', {
                'is-danger': !!error,
                'is-large': !this.isMobile,
              })}
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
          <div
            className={classnames('control', { 'is-large': !this.isMobile })}
          >
            <button
              className={classnames('button is-primary', {
                'is-loading': isLoading,
                'is-large': !this.isMobile,
              })}
              disabled={!gameInProgress}
              type="submit"
            >
              Готово
            </button>
          </div>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </form>
    );
  }
}

export default Form;
