class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.pickOption = this.pickOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: ["option one", "option two", "option three"]
    };
  }

  pickOption() {
    const index = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[index]);
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleAddOption(option) {
    if (!option) {
      return "Please enter a value.";
    } else if (this.state.options.indexOf(option) >= 0) {
      return "this option already exists...";
    }
    this.setState(prevState => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }
  render() {
    const app = {
      title: "indecision app",
      subtitle: "we got you..."
    };

    return React.createElement(
      "div",
      null,
      React.createElement(Header, { subtitle: app.subtitle }),
      React.createElement(Action, {
        pickOption: this.pickOption,
        hasOptions: this.state.options.length > 0
      }),
      React.createElement(Options, {
        options: this.state.options,
        handleDeleteOptions: this.handleDeleteOptions
      }),
      React.createElement(AddOption, { handleAddOption: this.handleAddOption })
    );
  }
}

const Header = props => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: "Indecision App.."
};

const Action = props => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { disabled: props.hasOptions, onClick: props.pickOption },
      "What should I do?"
    )
  );
};

const Options = props => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "ul",
      null,
      React.createElement(
        "button",
        { onClick: props.handleDeleteOptions },
        "Remove All "
      ),
      props.options.map(option => React.createElement(Option, { id: option }))
    )
  );
};

const Option = props => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "li",
      { id: props.id },
      " ",
      props.id,
      " "
    )
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.number = 10;

    this.state = {
      error: undefined
    };
  }

  addOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);
    console.log(error);
    if (error) {
      this.setState(() => ({ error }));
    } else {
      this.setState(() => ({ error: undefined }));
    }
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { onSubmit: this.addOption },
        this.state.error && React.createElement(
          "p",
          null,
          " ",
          this.state.error,
          " "
        ),
        React.createElement("input", { type: "text", name: "option" }),
        React.createElement(
          "button",
          null,
          "Add Option "
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(Main, null), document.getElementById("app"));
