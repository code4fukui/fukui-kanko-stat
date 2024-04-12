import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

let data = null;

export const getSurveyIshikawa = async (fromd) => {
  if (!data) {
    const url = "https://code4fukui.github.io/ishikawa-kanko-survey/all.csv";
    const data1 = CSV.toJSON(await CSV.fetch(url));
    data = [];
    data1.forEach(i => {
      if (i.施設) {
        i.回答エリア = i.施設;
      }
      if (i.回答日時) {
        data.push(i);
      }
    });
  }
  const data2 = data.filter(i => new DateTime(i.回答日時).day.isAfter(fromd));
  return data2;
};
