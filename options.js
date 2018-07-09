class OptionMain extends React.Component {
	
	constructor (props){
		super (props);

		//bind functions 
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
 	    this.handlePick = this.handlePick.bind(this);
 	    this.handleAddOption = this.handleAddOption.bind(this);
	
		this.setState({
			options:[]})
	}


	handleAddOption(option) {
   		if (!option) {
     		return 'Enter valid value to add item';
   		} else if (this.state.options.indexOf(option) > -1) {
   		   return 'This option already exists';
   		}

   		this.setState((prevState) => {
    		  return {
    		    options: prevState.options.concat(option)
    		  };
    	});
 	}

	render(){
		return (
			<div>
			<h1> What should I do? </h1>
			<h2> These are your entered options: <h2>
			<Options 
				hasOptions={this.options.length>0 
				removeOptions=this.removeOptions
			/>
			<AddOption 
				handleAddOption=this.handleAddOption
			/>
			<PickOption 
				hasOptions={this.options.length>0}
			/>
		</div>)
	}
}


class Options extends React.Component {
	 render(){
	 	return (<button disabled={this.props.hasOptions} onClick={this.props.removeOptions}>Remove Options </button>
	 	this.props.options.map ( (option)=> <Option key={option} optionText={option}>);
	 )}
}
/
class Option extends React.Component {
	render(){
		return (<ul>this.props.optionText</ul>);
	}
}


class AddOption extends React.Component{

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  addOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return { error };
    });
  }

    render(){
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.addOption}>
					<input type="text" name="option"/>
					<button>Add Option </button>
				</form>
			</div>)
	}	
}