import "./styles/VideoCard";
import {
  storeVideoPlayer,
  showVideoPlayer,
} from "@/store/videoPlayerModal.store";
import { videosService } from "@/services/VideosService/videosService";
import { ResponseData } from "@/types/ResponseData";
import {
  setPlayerElement,
  storePlayerElement,
} from "@/store/playerElement.store";
import {
  toggleFavorite,
  storeFavoriteIdList,
} from "@/store/favoriteIdList.store";

const getVideoPlayer = async (videoId: string) => {
  await videosService
    .getVideoPlayer(videoId)
    .then((response: ResponseData) => {
      storeVideoPlayer.dispatch(showVideoPlayer());
      storePlayerElement.dispatch(
        setPlayerElement(response.data.items[0].player.embedHtml)
      );
    })
    .catch((error) => {
      alert("Error: " + error.summary);
    });
};

export default function VideoCard(videoData: any) {
  const cardBox = document.createElement("div");
  cardBox.classList.add("cardBox");

  const card = document.createElement("div");
  cardBox.appendChild(card);
  card.classList.add("card");
  card.style.backgroundImage = `url(${
    videoData.snippet.thumbnails.high.url ??
    videoData.snippet.thumbnails.default.url
  })`;
  card.addEventListener("click", () => {
    getVideoPlayer(videoData?.id?.videoId);
  });

  const favoriteIcon = document.createElement("i");
  favoriteIcon.classList.add("heartIcon");
  favoriteIcon.addEventListener("click", () => {
    if (videoData.id.videoId || videoData.id) {
      storeFavoriteIdList.dispatch(
        toggleFavorite(videoData.id.videoId ?? videoData.id)
      );
    }
  });

  card.appendChild(favoriteIcon);

  const updateFavoriteIcon = () => {
    if (
      storeFavoriteIdList
        .getState()
        .value.includes(videoData.id.videoId || videoData.id)
    ) {
      favoriteIcon.classList.add("favorite");
      favoriteIcon.classList.remove("not_favorite");
    } else {
      favoriteIcon.classList.add("not_favorite");
      favoriteIcon.classList.remove("favorite");
    }
  };

  storeFavoriteIdList.subscribe(updateFavoriteIcon);
  updateFavoriteIcon();

  const legendBox = document.createElement("div");
  legendBox.classList.add("legendBox");
  cardBox.appendChild(legendBox);

  const legend = document.createElement("p");
  legend.classList.add("legend");
  legend.innerText = videoData.snippet.title;
  legendBox.appendChild(legend);

  return cardBox;
}
