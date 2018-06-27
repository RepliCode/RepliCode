import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextState } from '../store';
import AceEditor from '../src/ace.js';
import 'brace/mode/jsx';

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css',
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
];

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

const defaultValue = ``;
class Editor extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isRecord !== prevProps.recorder.isRecord &&
      this.props.recorder.isRecord
    ) {
      // this may or may not work. Look here if errors occur
      this.timeStampObject = {};
      this.onChange(this.state.value);
    } else if (
      this.props.recorder.isRecord !== prevProps.recorder.isRecord &&
      !this.props.recorder.isRecord
    ) {
      this.props.setTimestamps(this.timeStampObject);
    }
  }
  onLoad() {
    // console.log("i've loaded")
  }
  onChange(newValue) {
    // change this.state to this.props when  redux is plugged in
    if (this.props.recorder.isRecord) {
      this.timeStampObject[Date.now() - this.props.recorder.startTime] = newValue;
      console.log('time stamp obj', this.timeStampObject);
    }
    this.setState({
      value: newValue,
    });
  }
  onPlayback() {
    let timeStampKeys = Object.keys(this.timeStampObject).sort((a, b) => a - b);
    for (let i = 0; i < timeStampKeys.length; i++) {
      setTimeout(() => {
        this.setState({ value: this.timeStampObject[timeStampKeys[i]] });
      }, timeStampKeys[i] - timeStampKeys[0]);
    }
  }
  // onPause() {
  //   this.setState({
  //     isRecord: false,
  //   });
  // }

  // onRecord() {
  //   if (!this.props.recorder.isRecord) {
  //     this.timeStampObject = {};
  //   }
  //   this.setState({
  //     isRecord: true,
  //     startTime: Date.now(),
  //   });
  // }
  onSelectionChange(newValue, event) {
    // console.log('select-change', newValue)
    // console.log('select-change-event', event)
  }

  onCursorChange(newValue, event) {
    // console.log('cursor-change', newValue)
    // console.log('cursor-change-event', event)
  }

  onValidate(annotations) {
    // console.log('onValidate', annotations)
  }
  setTheme(e) {
    this.setState({
      theme: e.target.value,
    });
  }
  setMode(e) {
    this.setState({
      mode: e.target.value,
    });
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value,
    });
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10),
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      theme: 'monokai',
      mode: 'javascript',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
    };
    this.timeStampObject = {};
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.onPlayback = this.onPlayback.bind(this);
  }
  render() {
    console.log('PRIZZOPS', this.props);
    return (
      <div className="columns">
        <div className="column">
          <div className="field">
            <button type="button" onClick={this.onRecord}>
              Record
            </button>
            <button type="button" onClick={this.onPlayback}>
              Playback
            </button>
            <button type="button" onClick={this.onPause}>
              Pause
            </button>
            <label>Mode:</label>
            <p className="control">
              <span className="select">
                <select name="mode" onChange={this.setMode} value={this.state.mode}>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label>Theme:</label>
            <p className="control">
              <span className="select">
                <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                  {themes.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label>Font Size:</label>
            <p className="control">
              <span className="select">
                <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
                  {[14, 16, 18, 20, 24, 28, 32, 40].map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.enableBasicAutocompletion}
                  onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
                />
                Enable Basic Autocomplete
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.enableLiveAutocompletion}
                  onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
                />
                Enable Live Autocomplete
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showGutter}
                  onChange={e => this.setBoolean('showGutter', e.target.checked)}
                />
                Show Gutter
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showPrintMargin}
                  onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
                />
                Show Print Margin
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.highlightActiveLine}
                  onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
                />
                Highlight Active Line
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.enableSnippets}
                  onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
                />
                Enable Snippets
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showLineNumbers}
                  onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
                />
                Show Line Numbers
              </label>
            </p>
          </div>
        </div>
        <div className="examples column">
          <h2>Editor</h2>
          <AceEditor
            mode={this.state.mode}
            theme={this.state.theme}
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            onCursorChange={this.onCursorChange}
            onValidate={this.onValidate}
            value={this.state.value}
            fontSize={this.state.fontSize}
            showPrintMargin={this.state.showPrintMargin}
            showGutter={this.state.showGutter}
            highlightActiveLine={this.state.highlightActiveLine}
            setOptions={{
              enableBasicAutocompletion: this.state.enableBasicAutocompletion,
              enableLiveAutocompletion: this.state.enableLiveAutocompletion,
              enableSnippets: this.state.enableSnippets,
              showLineNumbers: this.state.showLineNumbers,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    recorder: state.recorder,
    editor: state.editor,
  };
};

const mapDispatch = dispatch => {
  return {
    setTimestamps(timestamps) {
      dispatch(setTextState(timestamps));
    },
  };
};

export default connect(mapState, mapDispatch)(Editor);
