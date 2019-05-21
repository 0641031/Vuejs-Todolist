var app = new Vue({
        el: '#app',
        data: {
            item: '',
            todos: []
        },
        methods: {
            addItem() {
                if(this.todos.length>=10){
                    alert("Remove item first");
                }else if (this.item != "") {
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
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            loadTodo() {
                this.todos = JSON.parse(localStorage.getItem("todos"));
                if (!this.todos) {
                    this.todos = []
                }
            },
            deleteCompleted(){
                this.todos =  this.todos.filter(i => {
                    return i.isChecked == false
                })
                this.saveTodo();
            }
        },
        mounted() {
            this.loadTodo();
        },
        computed: {
            numberChecked(){
                return this.todos.filter(i=>i.isChecked==true).length
            }
        }
    })