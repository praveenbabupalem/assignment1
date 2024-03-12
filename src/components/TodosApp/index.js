import {Component} from "react"
import {v4 as uuidv4} from "uuid"
import TodoItem from "../TodoItem"
import './index.css';

class TodosApp extends Component {
  state = {userInput:"", todosList:[],edit:false,updateId:''}

  onClickBtn = () => {
    const { userInput, todosList, edit, updateId } = this.state;

    if (userInput.trim() !== "") {
        let input = userInput.trim();
        let repeatCount = 1;

      if (!isNaN(input.slice(-1))) {
          repeatCount = parseInt(input.slice(-1));
          input = input.slice(0, -1); 
      }
          
      if (edit) {
        const updatedList = todosList.map(todo => {
        if (todo.id === updateId) {
          return { ...todo, todo: input, updateCount: todo.updateCount + 1 };
        } else {
          return todo;
        }
        });

        this.setState({
          todosList: updatedList,
        });
        } else {
            for (let i = 0; i < repeatCount; i++) {
              const newTodo = { id: uuidv4(), todo: input, updateCount: 0 };
              this.setState(prevState => ({ todosList: [...prevState.todosList, newTodo] }));
            }
        }     
    }

    this.setState({ userInput: "", edit: false });
}


  deleteTodo = (removeId)=>{
    const{todosList} = this.state
    const updatedList = todosList.filter(each=>each.id !==removeId)
    this.setState({todosList:updatedList})
  }

  
  editTodo = (editId) => {
    const { todosList } = this.state;
    const editTodo = todosList.find(each => each.id === editId);
    
    if (editTodo) {
        this.setState({
          userInput: editTodo.todo,edit:true,updateId:editId
        });
    } else {
        console.log("Todo not found!"); 
    }
    
}

  render(){
    const {userInput,todosList,edit} = this.state
    
    return (
      <div className="bg">
        <h1>Daily Goals!</h1>
        
        <input className="input" value={userInput} type="text" placeholder="Enter a Todo" 
        onChange={(e)=>this.setState({userInput:e.target.value})}/>
        <br/>
        <button type="button" onClick={this.onClickBtn}>{edit?"Update":"Add Todo"}</button>
        
        <ul>
          {todosList.map(each=>(
            <li className="list-item" key={each.id}>
              <TodoItem eachTodo={each} 
              
              deleteTodo={this.deleteTodo} 
              editTodo={this.editTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
}

export default TodosApp;
