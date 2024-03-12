import { IoMdCreate } from 'react-icons/io';
import "./index.css"

const TodoItem = (props)=>{
    const deleteItem = ()=>{
        props.deleteTodo(props.eachTodo.id)
    }

    return(<>
        <span>{props.eachTodo.todo} (Updated {props.eachTodo.updateCount} {props.eachTodo.updateCount===1?"time":"times"})</span>
        <button className="button" onClick={()=>props.editTodo(props.eachTodo.id)}><IoMdCreate /></button>
        <button className="button" onClick={deleteItem}>×</button>
    </>)
}

export default TodoItem;