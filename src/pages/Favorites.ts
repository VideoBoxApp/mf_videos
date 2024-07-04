import Header from "@/components/Header/Header";
import VideoCard from "@/components/VideoCard/VideoCard";
import { storeFavoriteVideos } from "@/store/favoriteVideos.store";
import { pagesList } from "@/utils/pagesList";

export default function Favorites() {
  const content = document.createElement("div");
  content.classList.add("content");
  content.appendChild(Header(pagesList.favorites));

  const cardsBox = document.createElement("div");
  cardsBox.classList.add("cardsBox");
  content.appendChild(cardsBox);

  const renderVideos = () => {
    while (cardsBox.firstChild) {
      cardsBox.removeChild(cardsBox.firstChild);
    }

    const videos = storeFavoriteVideos.getState().value.payload

    if (videos) {
      videos.map((video: any) => {
        cardsBox.appendChild(VideoCard(video));
      });
    }
  };

  storeFavoriteVideos.subscribe(renderVideos);
  renderVideos();

  return content;
}
