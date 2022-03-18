import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList(props) {
  return (
    <div className="wrapper">
      <ul>
        {props.todos.map((todo, index) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              index={index}
              onChange={props.onToggle}
            />
          );
        })}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
