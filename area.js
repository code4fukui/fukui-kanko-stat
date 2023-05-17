import { CSV } from "https://js.sabae.cc/CSV.js";

export const fetchAreas = async () => {
  const urlarea = "https://code4fukui.github.io/fukui-kanko-survey/area.csv";
  const areas = await CSV.fetchJSON(urlarea);
  areas.filter(a => !a.通し番号).forEach(a => a.通し番号 = 100000 + parseInt(a.id));
  areas.sort((a, b) => parseInt(a.通し番号) - parseInt(b.通し番号));
  return areas;
};

export const getAreaID = (areas, name) => areas.find(a => name == a.エリア名 || name == a.旧エリア名).id;

export const setAreaSelect = (areas, selarea) => {
  areas.forEach(a => {
    const opt = document.createElement("option");
    opt.textContent = a.エリア名;
    opt.value = a.id;
    selarea.appendChild(opt);
  });
};
