class Main extends React.Component {

	constructor (props){
		super (props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.pickOption = this.pickOption.bind(this);
		this.handleAddOption = this.handleAddOption.bind (this)
		this.state = {
			options:['option one','option two','option three']
		}
	}


	pickOption(){
		const index = Math.floor (Math.random() * this.state.options.length);
		alert (this.state.options[index]);
	}

	handleDeleteOptions(){
		this.setState ( ()=> (
			{ options:[]	}))
		}

	handleAddOption (option){

		if (!option){
			return "Please enter a value."
		}else if (this.state.options.indexOf(option)>=0) {
			return "this option already exists..."
		} 
		this.setState ( (prevState) => {
			return {
				options: prevState.options.concat([option])
			}
		})
	}
	render(){

		const app={
		 title:"indecision app",
		 subtitle:"we got you...",
		}


		return (
		<div>
    <Header subtitle={app.subtitle}/>
		<Action 
			pickOption={this.pickOption}
			hasOptions={this.state.options.length >0}/>
		<Options 
			options={this.state.options}
			handleDeleteOptions={this.handleDeleteOptions}
		/>
		<AddOption 
			handleAddOption={this.handleAddOption}
		/>
  </div>
	)
	}
}

const Header = (props)=> {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  }

	Header.defaultProps = {
		title: "Indecision App.."
	}

const Action = (props) => {
    return (
      <div>
				  <button disabled={props.hasOptions} onClick={props.pickOption}>What should I do?</button>
      </div>
    );
  }


const Options  = (props)=>  {
    return (
      <div><ul>
			 <button onClick={props.handleDeleteOptions}>Remove All </button>
			  {props.options.map ((option)=> <Option id={option} />)}
      </ul></div>
    );
  }


const Option = (props)=>{
    return (
      <div>
        <li id={props.id}> {props.id} </li>
      </div>
    );
	}


	

class AddOption extends React.Component {

	constructor (props){
		super(props);
		this.addOption = this.addOption.bind(this);
		this.number=10;

		this.state = {
			error: undefined
		}
	}

	addOption(e){
		e.preventDefault();
		const option = e.target.elements.option.value.trim();
		
		const error = this.props.handleAddOption(option);
		console.log (error);
		if (error){
			this.setState(() =>  ({error}));
		}else {
			this.setState(() =>  ({error:undefined}));
		}
	}

	render() {
    return (
      <div>
				<form onSubmit={this.addOption}>
					{this.state.error && <p> {this.state.error} </p>}
					<input type="text" name="option"></input>
					<button>Add Option </button>
				</form>
      </div>
    );
  }
}



ReactDOM.render(<Main />, document.getElementById('app'));
