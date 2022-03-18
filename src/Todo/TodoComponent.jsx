import React, { useEffect } from "react";
import "../App.css";
import Context from "../context";
import TodoList from "./TodoList";
import Loader from "./Loader";
// import AddTodo from "./AddTodo"; changing to lazyload
const AddTodo = React.lazy(() => import("./AddTodo"));

const TodoComponent = () => {
  const [todos, setTodos] = React.useState([
    // { id: 1, completed: false, title: "Buy milk" },
    // { id: 2, completed: false, title: "Buy water" },
    // { id: 3, completed: false, title: "Buy bread" },
    // { id: 4, completed: false, title: "Buy cheese" },
  ]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    //По возможности не юзаем контекст, так как это усложняет повторное использование компонентов.
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        {/* lazyload realization */}
        <React.Suspense fallback={<p>Loading..</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <h2>No todos</h2>
        )}
      </div>
    </Context.Provider>
  );
};

export default TodoComponent;
