<template>
 <div class="row justify-content-center">
      <ul class="col-md-6" v-if="todos.length > 0">
        <li v-for="(todo,index) in todos">
          <label v-bind:class="{ done: todo.isChecked }">
            <input type="checkbox" v-model="todo.isChecked">
            {{ todo.title }}
          </label>
          <a @click="removeItem(index)">
            <font-awesome-icon icon="times" />
          </a>
        </li>
        <p>{{ numberChecked }} / {{ this.todos.length }}</p>

        <a @click="deleteCompleted" class="delCompleted">Clear completed</a>
      </ul>
    </div>
</template>

<script>
export default {
    props:['todos'],
    methods: {
      deleteCompleted(){
        this.$emit('deleteCompleted',this.todos)
      },
      removeItem(index) {
          this.$emit('removeTodo',index)
      }
    },
    computed:{
      numberChecked() {
        return this.todos.filter(i => i.isChecked == true).length;
      }
    }
}
</script>

<style>
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
.delCompleted {
  line-height: 2em;
}
input[type="checkbox"] {
  font-size: 1.1em;
  line-height: 2em;
}
button > i {
  color: #fff;
}
</style>