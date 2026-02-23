import { useState } from "react";

import Icon from "./Icon.jsx";
import Window from "./Window.jsx";
import Taskbar from "./Taskbar.jsx";

import Explorer from "../windows/Explorer.jsx";

export default function Desktop() {

  const [openWindows, setOpenWindows] = useState([]);

  function openWindow(name) {

    if (!openWindows.includes(name))
      setOpenWindows([...openWindows, name]);

  }

  function closeWindow(name) {

    setOpenWindows(openWindows.filter(w => w !== name));

  }

  function openLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }


  return (

    <div className="desktop">
      {/* Home Icon */}
      <Icon
        label="Home"
        emoji="🏠"
        onDoubleClick={() => openLink("https://sushi.sushiware.online")}
      />

      {/* Group Icon */}
      <Icon
        label="Group"
        emoji="👥"
        onDoubleClick={() => openLink("https://sushiware.online")}
      />

      {/* Projects Explorer */}
      <Icon
        label="Projects"
        onDoubleClick={() => openWindow("explorer")}
      />

      {openWindows.includes("explorer") && (

        <Window
          title="Projects Explorer"
          onClose={() => closeWindow("explorer")}
        >

          <Explorer />

        </Window>

      )}

      <Taskbar />

    </div>

  );

}