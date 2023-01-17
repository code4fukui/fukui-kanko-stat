import { CSV } from "https://js.sabae.cc/CSV.js";

addEventListener("load", async () => {
  const insertFirst = (parent, c) => {
    if (parent.children.length == 0) {
      parent.appendChild(c);
    } else {
      parent.insertBefore(c, parent.children[0]);
    }
  };
  
  //const base = location.href.indexOf("[::]") >= 0 ? "./" : "https://code4fukui.github.io/fukui-kanko-stat/";
  const base = "https://code4fukui.github.io/fukui-kanko-stat/";
  // const base = "./";
  
  const url = base + "data/apps.csv";
  const smenu = await CSV.fetchJSON(url);
  console.log(smenu);
  
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "style.css";
  document.head.appendChild(css);
  
  const navButtonElement = document.createElement("div");
  navButtonElement.id = "nav-button";
  navButtonElement.textContent = "≡";
  insertFirst(document.body, navButtonElement);
  
  const navElement = document.createElement("nav");
  navElement.id = "sitemap-menu";
  const menuTitleElement = document.createElement("h3");
  menuTitleElement.textContent = "サイトマップ";
  navElement.appendChild(menuTitleElement);
  navElement.appendChild(document.createElement("hr"));
  const menuElement = document.createElement("ul");
  navElement.appendChild(menuElement);
  for (const s of smenu) {
    const li = document.createElement("li");
    li.textContent = s.name;
    li.onclick = () => location.href = s.url;
    menuElement.appendChild(li);
  }
  insertFirst(document.body, navElement);
  
  const headerOverlayElement = document.createElement("div");
  headerOverlayElement.id = "header-overlay";
  insertFirst(document.body, headerOverlayElement);
  
  const toggleNav = () => {
    navElement.classList.toggle('menu-open');
    headerOverlayElement.classList.toggle('overlay-on');
  };
  
  headerOverlayElement.onclick = (_) => {
    toggleNav();
  };
  
  navButtonElement.onclick = (_) => {
    toggleNav();
  };
});
