// 4. lépés
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./actions";
import { getTodo } from "./selector";

function App() {

  // HOROG: input értéke itt tárolódik
  const [value, setValue] = useState("");
  // HOROG: ez kell a handleEdithez
  const [key, setKey] = useState("");

  // DISPATCH-el lehet eseményeket kiadni a Reduxnak!!
  const dispatch = useDispatch()
  
  // a Selector olvassa ki a Todo (vagy Store) tartalmát !! useSelector-t adja a Redux
  const todos = useSelector(getTodo);

  // gomb megnyomásakor az eltárolt input értékét felveszi a Redux Store-ba
  // a dispatch hívja meg a függvényt
  const handleClick = ({target}) =>{
    if(key !== ""){
      dispatch(editTodo(value, key))
     setKey("")}
    else{
      dispatch(addTodo(value))}
    setValue("") // ez mindkét esetben megjelenik
  };

  const handleDelete = (todo) =>{
    dispatch(deleteTodo(todo))
  }

  // új értéket ad az objektumnak
  const handleEdit = (todo, id) =>{
    setValue(todo)
    setKey(id)
  }


  return (
    <div className="App">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={(e) => handleClick(e)}>
        {key !== "" ? "Módosít" : "Felvétel"}
        </button>
      <table>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td onClick={() => handleDelete(todo.id)}>{todo.title}</td>
              <td>
                <button onClick={() => handleEdit(todo.title, todo.id)}>Változtat</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
