import "./styles/Header";
import SearchBar from "../SearchBar/SearchBar";
import { pagesList } from "@/utils/pagesList";

import { remoteVideosPage } from "@/utils/remoteStoreDrawer";

export default function Header(type: number) {
  const header = document.createElement("div");
  header.classList.add("header");

  const menuIcon = document.createElement("i");
  menuIcon.classList.add("menuIcon");
  menuIcon.addEventListener("click", async () => {
    await remoteVideosPage()
      .then((result) => {
        result.storeDrawer.dispatch(result.showDrawer());
      })
      .catch((err) => {
        console.error("Erro ao carregar a página de vídeos remotos:", err);
      });
  });

  header.appendChild(menuIcon);

  const brandLogo = document.createElement("div");
  brandLogo.classList.add("brandLogoHeader");

  const navigationBox = document.createElement("div");
  navigationBox.classList.add("navigationBox");
  navigationBox.appendChild(menuIcon);
  navigationBox.appendChild(brandLogo);

  header.appendChild(navigationBox);

  const verifyPages = () => {
    if (type === pagesList.videos) {
      header.appendChild(SearchBar());
    } else if (type === pagesList.favorites) {
    }
  };

  verifyPages();

  return header;
}
