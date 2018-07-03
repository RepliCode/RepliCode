import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setConsoleState } from '../store';
import AceEditor from '../src/ace.js';
import 'brace/mode/jsx';
import { Col, Container, Button, Row } from 'reactstrap';

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
class Console extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isRecord !== prevProps.recorder.isRecord &&
      this.props.recorder.isRecord
    ) {
      // this may or may not work. Look here if errors occur
      this.consoleTimeStamp = {};
    } else if (
      this.props.recorder.isRecord !== prevProps.recorder.isRecord &&
      !this.props.recorder.isRecord
    ) {
      this.setState({ value: '' });
    }
    if (this.props.isPlayback) {
      this.togglePlayback();
    }
    if (
      this.props.recorder.blobURL !== prevProps.recorder.blobURL &&
      !this.props.recorder.blobURL
    ) {
      this.setState({ value: '' });
    }
    if (this.props.consoleValue !== prevProps.consoleValue) {
      this.setState({ value: this.props.consoleValue });
    }
  }
  onLoad() {
    // console.log("i've loaded")
  }
  //   onChange(newValue) {
  //     if (this.props.recorder.isRecord) {
  //       this.consoleTimeStamp[Date.now() - this.props.recorder.startTime] = newValue;
  //     }
  //     this.setState({
  //       value: newValue,
  //     });
  //   }
  togglePlayback() {
    this.audioIntervals.push(this.props.playbackTime);
    let previousTime = Math.floor(this.audioIntervals[this.audioIntervals.length - 2] * 1000);
    let currentTime = Math.floor(this.audioIntervals[this.audioIntervals.length - 1] * 1000);
    let currentInterval = currentTime - previousTime;
    let timeStampKeys;
    if (this.props.isPlayback) {
      timeStampKeys = Object.keys(this.props.console)
        .map(time => Number(time))
        .sort((a, b) => a - b)
        .filter(time => time >= previousTime && time <= currentTime);
    }
    for (let i = 0; i < timeStampKeys.length; i++) {
      let currentTimeout = currentInterval / timeStampKeys.length;
      setTimeout(() => {
        this.setState({ value: this.props.console[timeStampKeys[i]] });
      }, currentTimeout * (i + 1));
    }
  }

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
      value: '',
      theme: 'monokai',
      mode: 'javascript',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: true,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
    };
    this.consoleTimeStamp = {};
    this.audioIntervals = [0];
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
  }
  render() {
    return (
      <AceEditor
        className="editor"
        mode="javascript"
        theme="monokai"
        readOnly={true}
        fontSize={14}
        height="calc(100vh - 15rem)"
        width="35vw"
        showGutter={false}
        value={this.state.value}
      />
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
    isPlayback: state.recorder.isPlayback,
    console: state.consoleEditor,
  };
};

const mapDispatch = dispatch => {
  return {
    setTimestamps(timestamps) {
      dispatch(setConsoleState(timestamps));
    },
  };
};

export default connect(mapState, mapDispatch)(Console);
