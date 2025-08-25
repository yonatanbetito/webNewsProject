import { API_KEY } from "./env.js";
const API = API_KEY;
export async function getAllNews() {
  let data = localStorage.getItem("data");
  if (data) {
    console.log("if");
    data = JSON.parse(data);
  } else {
    console.log("else");
    const respons = await fetch(
      `https://newsapi.org/v2/everything?q=apple&from=2025-08-23&to=2025-08-23&sortBy=popularity&apiKey=${API}`
    );
    data = await respons.json();
    data = data.articles;
    localStorage.setItem("data", JSON.stringify(data));
  }
  return data;
}
