import { getAllNews } from "./api.js";
const data = await getAllNews();
function getNav() {
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const home = document.createElement("a");
  home.classList.add("links");
  home.textContent = "Home";
  const newPostLink = document.createElement("a");
  newPostLink.classList.add("links");
  newPostLink.textContent = "NewPost";
  const postim = document.createElement("a");
  postim.classList.add("links");
  postim.textContent = "Postim";
  nav.appendChild(home);
  nav.appendChild(newPostLink);
  nav.appendChild(postim);
  nav.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("links")) {
      if (e.target.textContent === "Home") {
        loadPage();
        const box = document.createElement("div");
        box.id = "box";
        root.appendChild(box);
        data.forEach((p) => homepage(p));
      } else if (e.target.textContent === "NewPost") {
        newPost();
      } else if (e.target.textContent === "Postim") {
        postimpage();
      }
    }
  });
  return nav;
}

function homepage(post) {
  const boxs = document.getElementById("box");
  const news = document.createElement("div");
  news.classList.add("news");
  const image = document.createElement("img");
  image.classList.add("news-image");
  image.src =
    post.imageUrl ||
    post.urlToImage ||
    "https://cdn.geektime.co.il/wp-content/uploads/2025/08/bug-no-internet.jpg";
  const title = document.createElement("h2");
  title.innerText = post.author || "No Connection";
  const content = document.createElement("p");
  content.innerText = post.title || "haker acse internet connection.";
  news.appendChild(image);
  news.appendChild(title);
  news.appendChild(content);
  news.addEventListener("click", function () {
    showBigPost(post);
  });
  boxs.appendChild(news);
}

function showBigPost(post) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(getNav());
  const bigDiv = document.createElement("div");
  bigDiv.classList.add("big-news");
  const image = document.createElement("img");
  image.src =
    post.imageUrl ||
    post.urlToImage ||
    "https://cdn.geektime.co.il/wp-content/uploads/2025/08/bug-no-internet.jpg";
  image.classList.add("big-news-image");
  const title = document.createElement("h1");
  title.innerText = post.author || "No Connection";
  title.classList.add("big-news-title");
  const content = document.createElement("p");
  content.innerText =
    post.content || post.title || "haker acse internet connection.";
  content.classList.add("big-news-content");
  const backBtn = document.createElement("button");
  backBtn.innerText = "Home page";
  backBtn.classList.add("back-home-btn");
  backBtn.onclick = function () {
    root.innerHTML = "";
    root.appendChild(getNav());
    const box = document.createElement("div");
    box.id = "box";
    root.appendChild(box);
    let localPosts = [];
    try {
      localPosts = JSON.parse(localStorage.getItem("data") || "[]");
      if (!Array.isArray(localPosts)) localPosts = [];
    } catch (e) {
      localPosts = [];
    }
    localPosts.forEach((p) => {
      try {
        homepage(p);
      } catch (err) {}
    });
  };
  bigDiv.appendChild(image);
  bigDiv.appendChild(title);
  bigDiv.appendChild(content);
  bigDiv.appendChild(backBtn);
  root.appendChild(bigDiv);
}

function newPost() {
  const root = document.getElementById("root");
  loadPage();
  const form = document.createElement("form");
  form.classList.add("NP-form");
  const image = document.createElement("input");
  image.type = "file";
  image.accept = "image/*";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter post title";
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Enter post content";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Submit";
  form.appendChild(image);
  form.appendChild(input);
  form.appendChild(textarea);
  form.appendChild(submit);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = input.value.trim();
    const content = textarea.value.trim();
    if (!title || !content || !image.files[0]) {
      alert("not all fields filled");
      return;
    }
    // צור blob URL להצגת התמונה
    const imageUrl = URL.createObjectURL(image.files[0]);
    const author = "You";
    const post = { title, content, imageUrl, author };
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    data.push(post);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Post saved successfully!");
    loadPage();
  });
  root.appendChild(form);
}

function postimpage() {
  const root = document.getElementById("root");
  loadPage();
  const postimDiv = document.createElement("div");
  postimDiv.innerText = "Postim Page";
  root.appendChild(postimDiv);
}

function loadPage() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(getNav());
}

const root = document.getElementById("root");
root.appendChild(getNav());
