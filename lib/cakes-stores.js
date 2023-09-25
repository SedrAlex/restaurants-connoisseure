import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCakesStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&query=${query}&limit=${limit}`;
};

const getListOfCakesStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "cake shop",
    page: 1,
    perPage: 50,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};
export const fetchCakeStores = async (
  latLong = "48.87090904314266%2C2.303529072119216"
) => {
  const photos = await getListOfCakesStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    },
  };

  const response = await fetch(
    getUrlForCakesStores(
      latLong ,
      "dessert",
      6
    ),
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    const locality = result.location.locality;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      locality: locality,
      imgUrl: photos.length > 0 ? photos[index + 12] : null,
    };
  });
};
