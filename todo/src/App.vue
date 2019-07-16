<template>
    <div class="container">
        <div>
          <h2> To do list </h2>
          <div id="app" v-if="auth">
              <app-add-todo @addTodo="addTodo"></app-add-todo>
              <app-todos :todos="todos" @removeTodo="removeTodo" @deleteCompleted="deleteCompleted"></app-todos>
              <div class="row justify-content-center">
                <div class="btn_logout col-md-6"><button class="btn btn-secondary" @click="googleLogout">logout</button></div>
              </div>
          </div>
          <div v-else style="text-align:center">
            <button class="btn btn-info" @click="googleLogin">Google Login</button>
          </div>
        </div>
    </div>
</template>

<script>
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import firebase from 'firebase'
export default {
  data () {
    return {
      todos: [],
      auth:false
    }
  },
  components:{
    appAddTodo: AddTodo,
    appTodos:Todos
  },
  methods:{
    addTodo(todo) {
      if(this.todos.length<10){
        this.todos.push({ title: todo, isChecked: false })
      } else {
        alert('Please delete item first')
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    deleteCompleted () {
      this.todos = this.todos.filter(i => {
        return i.isChecked == false
      })
    },
    saveTodo (){
      localStorage.setItem("todos", JSON.stringify(this.todos))
    },
    loadTodo (){
      this.todos = JSON.parse(localStorage.getItem('todos'))
      if (!this.todos) {
        this.todos = []
      }
    },
    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken
        const user = result.user
        this.auth = true
      }).catch(error => {
        this.errorMessage = 'Please check your google account'
        this.showError = true
      })
    },
    googleLogout () {
      firebase.auth().signOut().then(() => {
        alert('logout success')
        this.auth = false
      })
    }
  },
  mounted (){
    this.loadTodo()
  },
  watch: {
    todos: {
      handler(todos) {
        this.saveTodo()
      }
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
.btn_logout{
  margin-top:10px;
  text-align: right
}
</style>
