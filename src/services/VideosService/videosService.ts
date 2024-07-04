import ApiService from "../apiService";
import { GET_VIDEO_PLAYER_MOCK } from "./_mocks_/getVideoPlayerMock";
import { SEARCH_VIDEOS_MOCK } from "./_mocks_/searchVideosMock";

const apiService = new ApiService();

const windowWidth = window.innerWidth < 8192 ? window.innerWidth : 8192;

const windowHeight =
  window.innerHeight < 8192
    ? Math.ceil(window.innerHeight - (window.innerHeight / 100) * 20)
    : 8192;

class VideosService {
  getVideoPlayer(videoId: string) {
    return apiService.get({
      endpoint: `/videos?part=player&id=${videoId}&maxHeight=${windowHeight}&maxWidth=${windowWidth}`,
      mock: GET_VIDEO_PLAYER_MOCK,
    });
  }

  getFavoriteVideos(ids: string[]) {
    let concatedIds = "";
    const formatedIds = () => ids.map((id) => (concatedIds += `&id=${id}`));
    formatedIds();
    return apiService.get({
      endpoint: `/videos?part=snippet&maxResults=50&id=${concatedIds}`,
      mock: SEARCH_VIDEOS_MOCK,
    });
  }

  searchVideos(value: string) {
    return apiService.get({
      endpoint: `/search?part=snippet&maxResults=50&q=${value}`,
      mock: SEARCH_VIDEOS_MOCK,
    });
  }
}

export const videosService = new VideosService();
