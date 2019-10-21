import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MoreButton from "./MoreButton";
import PostList from "./PostList";
import FilterPostList from "./FilterPostList";
import Loader from "./Loader";

const STEP = 10;
const URL = "https://jsonplaceholder.typicode.com/posts";

const fetchData = async url => await (await fetch(url)).json();

function App() {
  const [state, setState] = useState({
    items: [],
    total: 0,
    countItemPosts: STEP,
    valueFilter: "",
    typeFilter: "title",
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

  const FilterBY = (array, countEl, type, value) => {
    if (type === "title" && !!value.trim()) {
      return array.filter(el => el.title.includes(value)).slice(0, countEl);
    } else if (type === "body" && !!value.trim()) {
      return array.filter(el => el.body.includes(value)).slice(0, countEl);
    }
    return array.slice(0, countEl);
  };

  useEffect(() => {
    let timer;
    setState({ ...state, loading: true });
    fetchData(URL)
      .then(data => {
        let items = data.map(el => ({
          id: el.id,
          title: el.title,
          body: el.body
        }));
        timer = setTimeout(() => {
          setState({ ...state, items: items, total: items.length });
        }, 3000);
      })
      .catch(err => console.log(err));

    return () => {
      clearTimeout(timer);
      setState({ ...state, items: [] });
    };
  }, []);

  return (
    <div className="App">
      <FilterPostList
        changeTextInput={changeTextInput}
        changeSelect={changeSelect}
      />
      {state.loading ? (
        <Loader />
      ) : (
        <PostList
          Items={FilterBY(
            state.items,
            state.countItemPosts,
            state.typeFilter,
            state.valueFilter
          )}
        />
      )}
      {state.countItemPosts < state.total ? (
        <MoreButton onClick={moreLoader} />
      ) : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
