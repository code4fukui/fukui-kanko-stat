import { CSV } from "https://js.sabae.cc/CSV.js";
    
export const fetchSurvey = async () => {
  const urls = {
    福井県: "https://code4fukui.github.io/fukui-kanko-survey/all.csv",
    石川県: "https://code4fukui.github.io/ishikawa-kanko-survey/all.csv",
  };
  const data = [];
  for (const name in urls) {
    const url = urls[name];
    const data1 = CSV.toJSON(await CSV.fetch(url));
    data1.forEach(i => {
      i.pref = name;
      if (i.施設) {
        i.回答エリア = i.施設;
      }
      if (!i.回答日時)
        throw new Error();
      data.push(i);
    });
    //console.log(data1[0])
  }
  return data;
};
