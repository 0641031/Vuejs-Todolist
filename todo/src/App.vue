<template>
  <div>
    <div class="row justify-content-center">
      <div class="row col-md-6">
        <input
          type="text"
          class="form-control col-10"
          v-model="item"
          id="add_txt"
          v-on:keyup.enter="addItem">
        <button class="btn btn-info col-2" id="add_btn" @click="addItem">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <ul class="col-md-6" v-if="todos.length > 0">
        <li v-for="(todo,index) in todos">
          <label v-bind:class="{ done: todo.isChecked }">
            <input type="checkbox" v-model="todo.isChecked" @change="saveTodo()">
            {{ todo.title }}
          </label>
          <a @click="removeItem(index)">
            <i class="fas fa-times"></i>
          </a>
        </li>
        <p>{{ numberChecked }} / {{ this.todos.length }}</p>

        <a @click="deleteCompleted" class="delCompleted">Clear completed</a>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: "",
      todos: []
    };
  },
  methods: {
    addItem() {
      if (this.todos.length >= 10) {
        alert("Remove item first");
      } else if (this.item != "") {
        this.todos.push({ title: this.item, isChecked: false });
        this.item = "";
        this.saveTodo();
      }
    },
    removeItem(index) {
      this.todos.splice(index, 1);
      this.saveTodo();
    },
    saveTodo() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    loadTodo() {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      if (!this.todos) {
        this.todos = [];
      }
    },
    deleteCompleted() {
      this.todos = this.todos.filter(i => {
        return i.isChecked == false;
      });
      this.saveTodo();
    }
  },
  mounted() {
    this.loadTodo();
  },
  computed: {
    numberChecked() {
      return this.todos.filter(i => i.isChecked == true).length;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+Bhai|Montserrat&display=swap");

body {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
}
.container {
  margin-top: 10vh;
}
ul {
  margin: 10px 0 0 0;
  padding: 0;
}
li {
  list-style: none;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border: solid 1px #ccc;
  margin-top: 4px;
  color: #333;
  background: #fff;
}
.done {
  text-decoration: line-through;
}
a {
  text-decoration: none;
  cursor: pointer;
  float: right;
}
h2 {
  text-align: center;
  font-size: 3em;
  font-family: "Baloo Bhai", cursive;
  margin-top: 10px;
}
input[type="checkbox"] {
  font-size: 1.1em;
  line-height: 2em;
}
button > i {
  color: #fff;
}
#add_txt {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#add_btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
a > i {
  color: #777;
}
p {
  margin-top: 5px;
  display: inline-block;
}
.delCompleted {
  line-height: 2em;
}
</style>
