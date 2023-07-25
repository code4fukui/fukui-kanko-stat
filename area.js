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
    opt.textContent = a.市町名 + " / " + a.エリア名;
    opt.value = a.id;
    selarea.appendChild(opt);
  });
};

export const getLongAreaName = (areas, area) => {
  const a = areas.find(a => a == エリア名 == area);
  if (!a) {
    return "- / " + area;
  }
  return a.市町名 + " / " + a.エリア名;
};

export const sortByAreaNumber = (areas, areanames) => {
  const get = (name) => {
    const n = areas.find(a => a.エリア名 == name)?.通し番号;
    if (n == undefined) {
      console.log(name); // ?
      return 10000;
    }
    return parseInt(n);
  };
  areanames.sort((a, b) => get(a) - get(b));

};
