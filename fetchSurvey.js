import { getSurvey } from "./getSurvey.js";
import { getSurveyIshikawa } from "./getSurveyIshikawa.js";

export const fetchSurvey = async (before) => {
  const ishikawa = await getSurveyIshikawa(before);
  ishikawa.forEach(i => i.pref = "石川県");
  const fukui = await getSurvey(before);
  fukui.forEach(i => i.pref = "福井県");
  console.log("ishikawa", ishikawa)
  console.log("fukui", fukui)
  return [...ishikawa, ...fukui];
};
