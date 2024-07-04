import "./styles/Videos";
import Header from "@/components/Header/Header";
import VideoCard from "@/components/VideoCard/VideoCard";
import { storeVideos } from "@/store/videos.store";
import { pagesList } from "@/utils/pagesList";

export default function Videos() {
  const content = document.createElement("div");
  content.classList.add("content");
  content.appendChild(Header(pagesList.videos));

  const cardsBox = document.createElement("div");
  cardsBox.classList.add("cardsBox");
  content.appendChild(cardsBox);

  const renderVideos = () => {
    while (cardsBox.firstChild) {
      cardsBox.removeChild(cardsBox.firstChild);
    }

    const videos = storeVideos.getState().value?.payload?.items;

    if (videos) {
      videos.map((video: any) => {
        cardsBox.appendChild(VideoCard(video));
      });
    }
  };

  storeVideos.subscribe(renderVideos);
  renderVideos();
  
  return content;
}
