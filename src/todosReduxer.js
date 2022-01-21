// 2. lépés
import React from "react";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actions";

const initialState = [];
export const todosReduxer = (state = initialState, action) =>{
    const {type, payload} = action;

    // addTodo - todosReduxer: kap egy általunk generált id-t. a todo-t objektummá kell alakítani
    if (type === ADD_TODO){
        const todos = state // régi todos
        const todo = [{payload, id: Date.now().toString()}] // új todo ami hozzá lesz adva (objektum!)

        return [...todos, todo] // kettő kombinációja
    }

    if (type === DELETE_TODO){
        const todos = state // régi todos
        const todoID = [{payload, id: Date.now().toString()}] // új todo ami hozzá lesz adva (objektum!)

        return todos.filter((todo) => todo.id !== todoID) // DELETE-nél mindig filter kell mert a feltételnek megfelelő elemet tartja meg !
    }

    if (type === EDIT_TODO){
        const todos = state 
        const {todo, id} = payload

        return todos.map((t) => t.id === id ? {title: todo, id} : t)
    }

    return state; // kezeletlen eseménykor visszatér az eredeti állapottal
}
