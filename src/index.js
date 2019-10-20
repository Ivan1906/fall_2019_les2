import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MoreButton from "./MoreButton";
import PostList from "./PostList";
import FilterPostList from "./FilterPostList";

const STEP = 10;
const URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [state, setState] = useState({
    items: [],
    total: 0,
    valueFilter: "",
    typeFilter: "title",
    countItemPosts: STEP,
    loading: false
  });

  const moreLoader = () => {
    setState(prevState => {
      return { ...prevState, countItemPosts: prevState.countItemPosts + STEP };
    });
  };

  const changeTextInput = event => {
    event.persist();
    setState(prevState => {
      return { ...prevState, valueFilter: event.target.value };
    });
  };

  const changeSelect = event => {
    event.persist();
    setState(prevState => {
      return { ...prevState, typeFilter: event.target.value };
    });
  };

  const FilterBY = (array, type, value) => {
    if (type === "title" && !!value.trim()) {
      return array.filter(el => el.title.includes(value));
    } else if (type === "body" && !!value.trim()) {
      return array.filter(el => el.body.includes(value));
    }
    return array;
  };

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        data.forEach((el, i) => {
          if (i < state.countItemPosts) {
            setState(prevState => {
              return {
                ...prevState,
                items: [
                  ...prevState.items,
                  { id: el.id, title: el.title, body: el.body }
                ],
                total: data.length
              };
            });
          }
        });
      })
      .catch(err => console.log(err));

    return () => {
      setState(prevState => {
        return { ...prevState, items: [] };
      });
    };
  }, [state.countItemPosts]);

  return (
    <div className="App">
      <FilterPostList
        changeTextInput={changeTextInput}
        changeSelect={changeSelect}
      />
      <PostList
        Items={FilterBY(state.items, state.typeFilter, state.valueFilter)}
      />
      {state.countItemPosts < state.total ? (
        <MoreButton onClick={moreLoader} />
      ) : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
