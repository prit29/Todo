import React from 'react';
import './App.css';

class TodoList extends React.Component {
  render(){
    return (
      <div className="Todos">
        {
          this.props.todos.map((todo)=>
            <TodoItem key={todo.id} todo={todo}
              DeleteTodo = {this.props.DeleteTodo}
              MarkComplete = {this.props.MarkComplete}
            />
          )
        }
      </div>
    );
  }
}

class TodoItem extends React.Component {
  render(){
    return (
      <div className="Todo-Container">
      {
        this.props.todo.completed && 
        <div className="Paragraph">
          <p className="Para-container-checked" onClick={(id)=> this.props.MarkComplete(this.props.todo.id)}> 
            <input type="checkbox" className="Check" defaultChecked={this.props.todo.completed} onChange={(id) => this.props.MarkComplete(this.props.todo.id)}/>
            {this.props.todo.title}&nbsp;
          </p>
          <div className="Button-container">
            <button className="Button-close" onClick={(id) => this.props.DeleteTodo(this.props.todo.id)}>X</button>
          </div>
        </div>
      }
      {
        !this.props.todo.completed && 
        <div className="Paragraph">
          <p className="Para-container" onClick={(id)=> this.props.MarkComplete(this.props.todo.id)}> 
            <input type="checkbox" className="Check" defaultChecked={this.props.todo.completed} onChange={(id) => this.props.MarkComplete(this.props.todo.id)}/>
            {this.props.todo.title}
          </p>
          <React.Fragment>
            <div className="Button-container">
              <button className="Button-close" onClick={(id) => this.props.DeleteTodo(this.props.todo.id)}>X</button>
            </div>
          </React.Fragment>
        </div>
      }
      </div> 
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    var lists = localStorage.getItem('todos');
    if(lists.length<=2){
      lists = JSON.stringify([{
        id: 1,
        title: 'Hello Welcome',
        completed: false
      }]);
    }
    this.state ={
      todos: lists!==null?JSON.parse(lists):[],
      todo: '',
    };
  }

  MarkComplete(id){
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    },
    ()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.todos));
    });
  }

  DeleteTodo(id){
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    },
    ()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.todos));
    });
  }

  ChangeTodo(event){
    this.setState({
      todo: event.target.value,
    });
  }

  AddTodo(event) {
    event.preventDefault();
    const date = new Date();
    if(this.state.todo.trim()===''){
      return;
    }
    const title = this.state.todo.trim();
    const newTodo = {
      id: date.getTime(),
      title: title.charAt(0).toUpperCase() + title.slice(1),
      completed: false
    }
    this.setState({
      todos: [...this.state.todos,newTodo],
      todo: ''
    },
    ()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.todos));
    });
  }

  render() {
    return (
      <div className="App-Container">
        <p className="Header">Todo&nbsp;</p>  
        <div>
          <form className="TodoInput" onSubmit={(e)=>this.AddTodo(e)}>
            <input type="text" placeholder="Add ToDo..." className="TextInput" value={this.state.todo} onChange={(e)=>this.ChangeTodo(e)}/>
            <input type="Submit" defaultValue="SUBMIT" className="SubmitInput"/>
          </form>
        </div>
        <TodoList todos={this.state.todos}
          DeleteTodo = {(id)=>this.DeleteTodo(id)}
          MarkComplete = {(id)=>this.MarkComplete(id)}
        />
      </div>
    );
  }
}

export default App;
