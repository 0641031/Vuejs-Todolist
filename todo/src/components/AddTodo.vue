<template>
<div class="row justify-content-center">
      <div class="row col-md-6">
        <input
          type="text"
          class="form-control col-10"
          v-model="todo"
          id="add_txt"
          v-on:keyup.enter="addTodo">
        <button class="btn btn-info col-2" id="add_btn" @click="addTodo">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            todo: ""
        }
    },
    methods:{
        addTodo(){
          if(this.todo ==""){
            alert("Please fill the blank")
          }else{
            this.$emit('addTodo',this.todo)
            this.todo=""
          }
            
        }
    }
    
    
}
</script>

<style>
    
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
</style>