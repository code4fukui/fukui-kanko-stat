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
  // const base = "https://code4fukui.github.io/fukui-kanko-stat/";
  const base = "./";
  
  const url = base + "apps.csv";
  const smenu = await CSV.fetchJSON(url);
  console.log(smenu);
  
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "style.css";
  document.head.appendChild(css);
  
  const menu = document.createElement("ul");
  menu.className = "menu";
  for (const s of smenu) {
    const li = document.createElement("li");
    li.textContent = s.name;
    li.onclick = () => location.href = s.url;
    li.style.display = "inline-block";
    li.style.listStyle = "none";
    li.style.margin = ".2em 2em";
    menu.appendChild(li);
  }
  insertFirst(document.body, menu);
});
