import React, { useState } from "react";

export default function TagsInput(props) {
  console.log(`Props value in TagsInput ->`, props.data);
  var stateVal = [];
  if (props.data && props.data.length > 0) {
    stateVal = [...stateVal, ...props.data];
  }
  console.log(`stateValstateVal ->`, stateVal);
  const [tags, setTags] = useState(stateVal);
  const handleOnKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
    props.onChange([...tags, value]);
  };

  const removeTags = (index) => {
    setTags(tags.filter((el, i) => i !== index));
    props.onChange(tags.filter((el, i) => i !== index));
  };

  //   const handleOnChange = () => {
  //     props.onChange(tags);
  //   }

  return (
    <div className="tags-input-container">
      {tags &&
        tags.map((el, index) => {
          return (
            <div className="tags-items" key={index}>
              <span className="text">{el}</span>
              <span className="close" onClick={() => removeTags(index)}>
                &times;
              </span>
            </div>
          );
        })}
      <input
        type="text"
        onKeyDown={handleOnKeyDown}
        // onChange={props.onChange(tags)}
        className="tags-input"
        placeholder="Add a tag"
      />
    </div>
  );
}
