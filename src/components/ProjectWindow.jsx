import { useState, useRef } from "react";
import "../styles.css";

export default function ProjectWindow({ project, onClose }) {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Start dragging
  function onMouseDown(e) {
    dragging.current = true;
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  // Dragging logic
  function onMouseMove(e) {
    if (!dragging.current) return;
    setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  }

  // Stop dragging
  function onMouseUp() {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  return (
    <div className="window" style={{ left: position.x, top: position.y }}>
      {/* Title Bar */}
      <div className="title-bar" onMouseDown={onMouseDown}>
        {project.title}
        <button className="close-button" onClick={onClose}>X</button>
      </div>

      {/* Window Content */}
      <div className="window-content">
        {/* Optional Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        )}

        {/* Project Info */}
        <p>{project.description}</p>
        <p><b>Tech:</b> {project.tech.join(", ")}</p>
        <p><b>Year:</b> {project.year}</p>

        {/* Optional Links */}
        {project.links && project.links.length > 0 && (
          <div className="project-links">
            <b>Links:</b>
            <ul>
              {project.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}