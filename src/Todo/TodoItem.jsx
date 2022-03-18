import PropTypes from "prop-types";
import Context from "../context";
import React, { useContext } from "react";

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];
  if (todo.completed) {
    classes.push("done");
  }
  return (
    <div className="wrapper">
      <li>
        <span className={classes.join(" ")}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              onChange(todo.id);
            }}
          />
          <strong>{index + 1}</strong>
          {todo.title}
        </span>
        <button onClick={() => removeTodo(todo.id)}>&times;</button>
      </li>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
