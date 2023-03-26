import axios from "axios";

const iTUNESAPI = "https://itunes.apple.com";

export async function getRandomAlbums(artistName: string) {
  const url = `${iTUNESAPI}/search?term=${encodeURIComponent(
    artistName
  )}&entity=album&limit=5`;
  const response = await axios.get(url);
  const albums = response.data.results.filter(
    (result: any) => result.wrapperType === "collection"
  );
  const randomAlbums = getRandomElementsFromArray(albums, 5);
  return randomAlbums;
}

export function getRandomElementsFromArray<T>(arr: T[], numElements: number) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

export function getRandomElementFromArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
