import {
  Badge,
  Button,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import React, { useState, useEffect } from "react";

const App = () => {
  const [allTodo, setAllTodo] = useState([]);
  const [id, setId] = useState(0);
  const [todo, setTodo] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Education");
  const [selectedId, setSelectedId] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [checkedId, setCheckedId] = useState("");
  const isDisabled = Boolean(!todo);
  const categories = [
    { id: "edc", name: "Education" },
    { id: "wrk", name: "Work" },
    { id: "sprt", name: "Sport" },
  ];

  const submitHandler = (e) => {
    let oldDatas = [...allTodo];
    oldDatas.push({ id, todo, category: selectedCategory });
    setAllTodo(oldDatas);

    setTodo("");
    setId((id) => id + 1);

    e.preventDefault();
  };
  const saveUpdateTodo = () => {
    let myArray = [...allTodo];
    myArray[myArray.findIndex((obj) => obj.id === selectedId)].todo =
      updateTodo;
    setAllTodo(myArray);
    setSelectedId("");
  };

  const deleteTodo = (id) =>
    setAllTodo((prev) => prev.filter((a) => a.id !== id));

  useEffect(() => {
    let filterData = allTodo.filter((f) => f.category === selectedCategory);
    const checkedData = filterData.find((f) => f.id === checkedId);
    filterData = filterData.filter((f) => f.id !== checkedId);
    if (checkedData) filterData.unshift(checkedData);
    setFilteredTodos(filterData);
  }, [selectedCategory, allTodo, checkedId]);

  const renderedList = filteredTodos.map((i, index) => {
    return selectedId !== i.id ? (
      <ListGroupItem
      color="dark"
        className="d-flex align-items-center justify-content-between"
        key={index}
      >
        {i.todo}
        <div>
          <input
            checked={checkedId === i.id}
            onChange={() => {
              setCheckedId(checkedId === i.id ? "" : i.id);
            }}
            className="checkBox"
            type={"checkbox"}
          />
          <Button
            onClick={() => {
              deleteTodo(i.id);
            }}
            className="remove-btn"
            color="danger"
          >
            Remove
          </Button>
          <Button
            className="edit-btn"
            onClick={() => {
              setSelectedId(i.id);
                setUpdateTodo(i.todo);
            }}
            color="warning"
          >
            Edit
          </Button>
        </div>
      </ListGroupItem>
    ) : (
      <ListGroupItem
      color="dark"
        className="d-flex align-items-center justify-content-between"
        key={index}
      >
        <Input
          className="w-50"
          value={updateTodo}
          onChange={(e) => {
            setUpdateTodo(e.target.value);
          }}
        />
        <div>
          <Button
            className="remove-btn"
            onClick={() => {
              setSelectedId("");
            }}
            color="danger"
          >
            Exit
          </Button>
          <Button disabled={updateTodo.trim().length===0} color={"success"} className="edit-btn" onClick={saveUpdateTodo}>
            Save
          </Button>
        </div>
      </ListGroupItem>
    );
  });

  return (
   <div className="app">
 <Container className="container">
      <Badge className="w-100" color="danger">
        {" "}
        <h1>Todo List</h1>
      </Badge>
      <div className="container">
        <form onSubmit={submitHandler} className="add-todo-form">
          <Input
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            placeholder="Todo..."
            type={"text"}
            className={"add-input"}
          />

          <Button disabled={isDisabled} className="add-btn " color="success">
            Add
          </Button>
          <Input
            className="w-25 mx-4"
            type="select"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            id="ctegories"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Input>
        </form>
        <ListGroup className="w-100">
          {filteredTodos.length > 0
            ? renderedList
            : <p style={{color:"#fff"}}>
                This category is empty. Please add a todo.
              </p>}
        </ListGroup>
      </div>
    </Container>
   </div>
  );
};

export default App;
