<template>
    <div class="container">
        <div>
            <h2> To do list </h2>
            <div id="app">
               <app-add-todo @addTodo="addTodo"></app-add-todo>
               <app-todos :todos="todos" @removeTodo="removeTodo" @deleteCompleted="deleteCompleted"></app-todos>
            </div>
        </div>
    </div>
</template>

<script>
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
export default {
  data(){
    return {
      todos: []
    }
  },
  components:{
    appAddTodo: AddTodo,
    appTodos:Todos
  },
  methods:{
    addTodo(todo){
      if(this.todos.length<10){
        this.todos.push({ title: todo, isChecked: false });
      }else{
        alert("Please delete item first")
      }
    },
    removeTodo(index){
        this.todos.splice(index, 1);
    },
    deleteCompleted(){
      this.todos = this.todos.filter(i => {
        return i.isChecked == false;
      });
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+Bhai|Montserrat&display=swap");

body {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  background-color: #f8f9fa !important
}
.container {
  margin-top: 10vh;
}

h2 {
  text-align: center;
  font-size: 3em !important;
  font-family: "Baloo Bhai", cursive;
  margin-top: 10px;
}

</style>
