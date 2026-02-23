import { useEffect, useState } from "react";
import ProjectWindow from "../components/ProjectWindow";
import "../styles.css";

export default function Explorer() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("categories");
  const [currentCategory, setCurrentCategory] = useState("");
  const [openProject, setOpenProject] = useState(null); // <-- add this

  useEffect(() => {
    fetch("/projects/index.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  function openCategory(category) {
    fetch(`/projects/${category}.json`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setCurrentCategory(category);
        setView("projects");
      })
      .catch((err) => console.error(err));
  }

  function goBack() {
    setView("categories");
  }

  return (
    <div>
      {view === "categories" && (
        <div>
          <b>Projects</b>
          <div className="grid">
            {categories.map((cat) => (
              <div
                key={cat}
                className="folder-icon"
                onDoubleClick={() => openCategory(cat)}
              >
                <div className="icon-image">📁</div>
                <div className="icon-label">{cat}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "projects" && (
        <div>
          <div
            onClick={goBack}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            ⬅ Back
          </div>

          <b>{currentCategory}</b>
          <div className="grid" style={{ marginTop: "10px" }}>
            {projects.map((project) => (
              <div
                key={project.title}
                className="folder-icon"
                onDoubleClick={() => setOpenProject(project)} // <-- open window
              >
                <div className="icon-image">{project.icon || "📄"}</div>
                <div className="icon-label">{project.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render the open project window */}
      {openProject && (
        <ProjectWindow
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </div>
  );
}