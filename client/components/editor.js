import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextState } from '../store';
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
  'sqlserver',
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
    // the following will only happen for a teacher creating a new recording.
    if (this.props.user.isCreator) {
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
      if (
        this.props.recorder.blobURL !== prevProps.recorder.blobURL &&
        !this.props.recorder.blobURL
      ) {
        this.onChange('');
      }
    }
    if (this.props.isPlayback) {
      this.audioIntervals = [this.audioIntervals[this.audioIntervals.length - 1]];
      this.togglePlayback();
    }
  }
  onLoad() {
    // console.log("i've loaded")
  }
  onChange(newValue) {
    if (this.props.recorder.isRecord) {
      this.timeStampObject[Date.now() - this.props.recorder.startTime] = newValue;
    }
    this.props.sendEditorCode(newValue);
    this.setState({
      value: newValue,
    });
  }
  togglePlayback() {
    this.audioIntervals.push(this.props.playbackTime);
    let previousTime = Math.floor(this.audioIntervals[this.audioIntervals.length - 2] * 1000);
    let currentTime = Math.floor(this.audioIntervals[this.audioIntervals.length - 1] * 1000);
    let currentInterval = currentTime - previousTime;
    let timeStampKeys;
    if (this.props.isPlayback) {
      timeStampKeys = Object.keys(this.props.editor)
        .map(time => Number(time))
        .sort((a, b) => a - b)
        .filter(time => time >= previousTime && time <= currentTime);
    }
    for (let i = 0; i < timeStampKeys.length; i++) {
      let currentTimeout = currentInterval / timeStampKeys.length;
      setTimeout(() => {
        this.setState({ value: this.props.editor[timeStampKeys[i]] });
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
      value: defaultValue,
      theme: 'sqlserver',
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
    this.timeStampObject = {};
    this.audioIntervals = [0];
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
  }
  render() {
    console.log('intervals time', this.audioIntervals);
    return (
      <AceEditor
        className="editor"
        mode={this.state.mode}
        theme={this.state.theme}
        wrapEnabled={true}
        readOnly={!!this.props.isPlayback}
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
        height={'80vh'}
        width={'40vw'}
        setOptions={{
          enableBasicAutocompletion: this.state.enableBasicAutocompletion,
          enableLiveAutocompletion: this.state.enableLiveAutocompletion,
          enableSnippets: this.state.enableSnippets,
          showLineNumbers: this.state.showLineNumbers,
          tabSize: 2,
        }}
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
    user: state.user,
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

//Below is a set of options for the text editor. We can re-add these options as needed. For now we've selected the most popular options.

// <div className="column">
//           <div className="field">
//             <label>Mode:</label>
//             <p className="control">
//               <span className="select">
//                 <select name="mode" onChange={this.setMode} value={this.state.mode}>
//                   {languages.map(lang => (
//                     <option key={lang} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </span>
//             </p>
//           </div>

//           <div className="field">
//             <label>Theme:</label>
//             <p className="control">
//               <span className="select">
//                 <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
//                   {themes.map(lang => (
//                     <option key={lang} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </span>
//             </p>
//           </div>

//           <div className="field">
//             <label>Font Size:</label>
//             <p className="control">
//               <span className="select">
//                 <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
//                   {[14, 16, 18, 20, 24, 28, 32, 40].map(lang => (
//                     <option key={lang} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </span>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.enableBasicAutocompletion}
//                   onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
//                 />
//                 Enable Basic Autocomplete
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.enableLiveAutocompletion}
//                   onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
//                 />
//                 Enable Live Autocomplete
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.showGutter}
//                   onChange={e => this.setBoolean('showGutter', e.target.checked)}
//                 />
//                 Show Gutter
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.showPrintMargin}
//                   onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
//                 />
//                 Show Print Margin
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.highlightActiveLine}
//                   onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
//                 />
//                 Highlight Active Line
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.enableSnippets}
//                   onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
//                 />
//                 Enable Snippets
//               </label>
//             </p>
//           </div>
//           <div className="field">
//             <p className="control">
//               <label className="checkbox">
//                 <input
//                   type="checkbox"
//                   checked={this.state.showLineNumbers}
//                   onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
//                 />
//                 Show Line Numbers
//               </label>
//             </p>
//           </div>
//         </div>
