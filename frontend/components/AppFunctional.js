import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function sonrakiIndex(yon) {
    let newIndex = activeIndex;
    switch (yon) {
      case "sol":
        newIndex = activeIndex % 3 === 0 ? activeIndex : activeIndex - 1;
        break;
      case "sag":
        newIndex = activeIndex % 3 === 2 ? activeIndex : activeIndex + 1;
        break;
      case "yukari":
        newIndex = activeIndex < 3 ? activeIndex : activeIndex - 3;
        break;
      case "asagi":
        newIndex = activeIndex > 5 ? activeIndex : activeIndex + 3;
        break;
      case "reset":
        newIndex = initialIndex;
        break;

      default:
        break;
    }
    setActiveIndex(newIndex);
  }
  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({(activeIndex % 3) + 1},{" "}
          {Math.floor(activeIndex / 3 + 1)})
        </h3>
        <h3 id="steps">0 kere ilerlediniz</h3>
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
        <h3 id="message"></h3>
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
        <button onClick={() => sonrakiIndex("reset")} id="reset">
          reset
        </button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
