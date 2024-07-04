export const GET_VIDEO_PLAYER_MOCK = {
  kind: "youtube#videoListResponse",
  etag: "F4ioKDvNG8mDaq04fPmS7O9Ur-8",
  items: [
    {
      kind: "youtube#video",
      etag: "-BJKc1dxyY1q5H2sLZSzXBbh3tQ",
      id: "f2P0gy1o64Q",
      player: {
        embedHtml:
          '<iframe width="480" height="270" src="//www.youtube.com/embed/f2P0gy1o64Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      },
    },
  ],
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
};
