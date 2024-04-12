import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const csv = [];
const month = {};
const fetchMonth = async (ym) => {
  if (month[ym]) return;
  const url = "https://code4fukui.github.io/fukui-kanko-survey/monthly/" + ym + ".csv";
  const data = await CSV.fetchJSON(url);
  data.forEach(i => csv.push(i));
  month[ym] = true;
};

export const getSurvey = async (fromd, tod) => {
  if (!fromd) return csv;
  if (!tod) tod = new Day();
  if (tod.getDayOfGregorian() < fromd.getDayOfGregorian()) return [];
  const ym = d => d.year * 100 + d.month;
  for (let d = fromd; ym(d) <= ym(tod); d = d.nextMonth()) {
    const ym = d.toStringYM();
    await fetchMonth(ym);
  }
  /*
  if (!csv) {
    //const url = "./fukui-answer.csv";
    const url = "https://code4fukui.github.io/fukui-kanko-survey/all.csv";
    const data = await CSV.fetch(url);
    csv = await CSV.toJSON(data);
  }
  */

  return csv.filter(c => {
    const day = c["回答日時"];
    if (!day) return false;
    try {
      const answerDate = new Day(day).getDayOfGregorian();
      if (answerDate < fromd.getDayOfGregorian() || answerDate > tod.getDayOfGregorian()) {
      //if (answerDate.isBefore(fromDate) || answerDate.isAfter(toDate)) {
        return false;
      }
      return true;
    } catch (e) {
      console.log("day", day);
      return false;
    }
  });
};

