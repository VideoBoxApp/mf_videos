import {
  hideVideoPlayer,
  storeVideoPlayer,
} from "@/store/videoPlayerModal.store";
import "./styles/VideoPlayer";
import { storeWireframe } from "@/store/wireframe.store";

export default function VideoPlayer() {
  const videoPlayerBox = document.createElement("div");
  videoPlayerBox.classList.add("videoPlayerBox");
  videoPlayerBox.id = "videoPlayerBox";

  const wireframe = document.createElement("div");
  wireframe.classList.add("wireframe");
  videoPlayerBox.appendChild(wireframe);

  const actionsBox = document.createElement("div");
  actionsBox.classList.add("actionsBox");
  wireframe.appendChild(actionsBox);

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("closeIcon");
  actionsBox.appendChild(closeIcon);
  closeIcon.addEventListener("click", () => {
    storeVideoPlayer.dispatch(hideVideoPlayer());
  });

  let wireframeElement = document.createElement("div");
  wireframeElement.classList.add("wireframeElement");
  wireframe.appendChild(wireframeElement);

  storeWireframe.subscribe(() => {
    wireframeElement.innerHTML = storeWireframe.getState().value?.payload;
  });

  return videoPlayerBox;
}
