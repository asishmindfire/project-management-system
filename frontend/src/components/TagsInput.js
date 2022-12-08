import React, { useState } from "react";

export default function TagsInput(props) {
  const [tags, setTags] = useState([]);
  const handleOnKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
    props.onChange([...tags, value])

  };

  const removeTags = (index) => {
    setTags(tags.filter((el, i) => i !== index));
    props.onChange(tags.filter((el, i) => i !== index))
  };

//   const handleOnChange = () => {
//     props.onChange(tags);
//   }

  return (
    <div className="tags-input-container">
      {tags.map((el, index) => {
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
