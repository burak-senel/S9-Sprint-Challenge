import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi
const initialFormData = {
  email: initialEmail,
  x: null,
  y: null,
  steps: null,
};

export default function AppFunctional(props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [formData, setFormData] = useState(initialFormData);

  function getXY(activeIndex) {
    return {
      x: (activeIndex % 3) + 1,
      y: Math.floor(activeIndex / 3) + 1,
    };
  }

  function reset() {
    setActiveIndex(initialIndex);
    setSteps(initialSteps);
  }
  function sonrakiIndex(yon) {
    let newIndex = activeIndex;
    let newMessage = "";
    switch (yon) {
      case "sol":
        newIndex = activeIndex % 3 === 0 ? activeIndex : activeIndex - 1;
        newMessage =
          activeIndex === newIndex ? "Daha fazla sola gidemezsiniz." : "";
        break;
      case "sag":
        newIndex = activeIndex % 3 === 2 ? activeIndex : activeIndex + 1;
        newMessage =
          activeIndex === newIndex ? "Daha fazla sağa gidemezsiniz." : "";
        break;
      case "yukari":
        newIndex = activeIndex < 3 ? activeIndex : activeIndex - 3;
        newMessage =
          activeIndex === newIndex ? "Daha fazla yukarı gidemezsiniz." : "";
        break;
      case "asagi":
        newIndex = activeIndex > 5 ? activeIndex : activeIndex + 3;
        newMessage =
          activeIndex === newIndex ? "Daha fazla aşağı gidemezsiniz." : "";
        break;
    }
    if (activeIndex !== newIndex) {
      setSteps(steps + 1);
    }
    setActiveIndex(newIndex);
    setMessage(newMessage);
  }

  function handleChange(evt) {
    let { name, value } = evt.target;
    const newState = { ...formData, [name]: value };
    setFormData(newState);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const { x, y } = getXY(activeIndex);
    const updatedFormData = {
      ...formData,
      x: x,
      y: y,
      steps: steps,
    };
    setFormData(updatedFormData);
    reset();
    axios
      .post("http://localhost:9000/api/result", updatedFormData)
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({getXY(activeIndex).x}, {getXY(activeIndex).y})
        </h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === activeIndex ? " active" : ""}`}
          >
            {idx === activeIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => sonrakiIndex("sol")} id="left">
          SOL
        </button>
        <button onClick={() => sonrakiIndex("yukari")} id="up">
          YUKARI
        </button>
        <button onClick={() => sonrakiIndex("sag")} id="right">
          SAĞ
        </button>
        <button onClick={() => sonrakiIndex("asagi")} id="down">
          AŞAĞI
        </button>
        <button onClick={() => reset()} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="email girin"
          onChange={handleChange}
          value={formData.email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
