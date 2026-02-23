import { useState, useRef } from "react";

export default function Window({ title, children, onClose }) {

  const [position, setPosition] = useState({
    x: 100,
    y: 100
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  function onMouseDown(e) {

    dragging.current = true;

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

  }

  function onMouseMove(e) {

    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    });

  }

  function onMouseUp() {

    dragging.current = false;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

  }

  return (

    <div
      className="window"
      style={{
        left: position.x,
        top: position.y
      }}
    >

      <div
        className="title-bar"
        onMouseDown={onMouseDown}
      >

        {title}

        <button
          className="close-button"
          onClick={onClose}
          style={{ float: "right" }}
        >
          X
        </button>

      </div>

      <div className="window-content">
        {children}
      </div>

    </div>

  );

}