import "./styles/SearchBar";
import { videosService } from "@/services/VideosService/videosService";
import { ResponseData } from "@/types/ResponseData";

import { storeVideos, setVideos } from "@/store/videos.store";

const searchVideos = async (value: string) => {
  await videosService
    .searchVideos(value)
    .then((response: ResponseData) => {
      storeVideos.dispatch(setVideos(response.data));
    })
    .catch((error) => {
      alert(error?.summary);
    });
};

const handleSearch = (value: string) => {
  if (value !== " ") {
    searchVideos(value);
  }
};

export default function SearchBar() {
  const searchBar = document.createElement("div");
  searchBar.classList.add("searchBar");

  const searchField = document.createElement("input");
  searchField.classList.add("searchField");
  searchField.addEventListener("keypress", (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  });

  searchField.setAttribute("placeholder", "Pesquisar");

  searchBar.appendChild(searchField);

  const searchIcon = document.createElement("i");
  searchIcon.classList.add("searchIcon");
  searchIcon.addEventListener("click", () => {});
  searchBar.appendChild(searchIcon);

  return searchBar;
}
