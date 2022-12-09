import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/dayjs.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/locale/ja.min.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

// jmaStationNumber参照先
// https://code4fukui.github.io/jma_station/jma_station_active.csv
const weathers = {
  "福井": {
    url: "./data/weather-fukui.csv",
    jmaStationNumber: "57066"
  },
  "敦賀": {
    url: "./data/weather-tsuruga.csv",
    jmaStationNumber: "57248"
  }
};

let weatherData;
let wbgts;

class Weather {
  constructor(parent) {
    this.init(parent);
  }
  
  async init(parent) {
    const css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", "./weather.css");
    document.getElementsByTagName("head")[0].appendChild(css);
    
    const urlwbgt = "https://code4fukui.github.io/wbgt-japan/data/yohou_data.csv";
    wbgts = await CSV.toJSON(await CSV.fetch(urlwbgt));
    weatherData = {};
    await Promise.all(Object.keys(weathers).map(async (key) => {
      weatherData[key] = await CSV.toJSON(await CSV.fetch(weathers[key]["url"]));
    }));
    
    const weatherGridElement = document.createElement("div");
    weatherGridElement.id = "weather-grid";
    parent.append(weatherGridElement);
    
    const weekButtonElement = document.createElement("div");
    weekButtonElement.id = "week-button";
    
    const titleElement = document.createElement("div");
    titleElement.style = "font-weight: bold;";
    titleElement.textContent = "気象情報";
    weekButtonElement.append(titleElement);
    
    const beforeWeekSpanElement = document.createElement("span");
    beforeWeekSpanElement.textContent = "前の週";
    weekButtonElement.append(beforeWeekSpanElement);
    
    const beforeWeekButtonElement = document.createElement("input");
    beforeWeekButtonElement.type = "button";
    beforeWeekButtonElement.id = "before-week";
    beforeWeekButtonElement.value = "←";
    weekButtonElement.append(beforeWeekButtonElement);
    
    const nextWeekButtonElement = document.createElement("input");
    nextWeekButtonElement.type = "button";
    nextWeekButtonElement.id = "next-week";
    nextWeekButtonElement.value = "→";
    weekButtonElement.append(nextWeekButtonElement);
    
    const nextWeekSpanElement = document.createElement("span");
    nextWeekSpanElement.textContent = "次の週";
    weekButtonElement.append(nextWeekSpanElement);
    
    weatherGridElement.append(weekButtonElement);
    
    const weatherDataElement = document.createElement("div");
    weatherDataElement.id = "weather-data";
    weatherGridElement.append(weatherDataElement);
    
    this.createWeatherElement();
  }
  
  getWBGTMean(wbgt) {
    if (wbgt === null) {
      return { color: "violet", desc: "値なし" };
    }
    if (wbgt < 21) {
      return { color: "blue", desc: "ほぼ安全" };
    } else if (wbgt < 25) {
      return { color: "green", desc: "注意" };
    } else if (wbgt < 28) {
      return { color: "yellow", desc: "警戒" };
    } else if (wbgt < 31) {
      return { color: "orange", desc: "厳重警戒" };
    }
    return { color: "red", desc: "危険" };
  }
  
  getMaxWBGT(jmaStationNumber, day) {
    const d = wbgts.find(d => d["Station Number"] == jmaStationNumber);
    if (!d) {
      return { wbgt: null, hour: null };
    }
    const today = dayjs(day).format("YYYYMMDD");
    let max = -100;
    let hour = null;
    for (const n in d) {
      if (n.startsWith(today)) {
        if (d[n] > max) {
          max = d[n];
          hour = n.substring(8);
        }
      }
    }
    if (max == -100) {
      return { wbgt: null, hour: null };
    }
    return { wbgt: max, hour: hour };
  }
  
  async createWeatherElement() {
    dayjs.locale("ja");
    const baseDate = dayjs(weatherData[Object.keys(weathers)[0]][0]["年月日"]);
    let nowDate = dayjs();
    
    const showWeather = (() => {
      const index = nowDate.diff(baseDate, "day");
      const showColumn = [
        "天気概況(昼：06時～18時)",
        "天気概況(夜：18時～翌日06時)",
        "最高気温(℃)",
        "最低気温(℃)"
      ];
      const weatherDataElement = document.getElementById("weather-data");
      weatherDataElement.innerHTML = "";
      
      Object.keys(weathers).forEach((key) => {
        const table = document.createElement("table");
        
        const headerTr = document.createElement("tr");
        headerTr.append(document.createElement("th"));
        for (let m = 0; m < 7; m++) {
          const th = document.createElement("th");
          th.textContent = `${nowDate.subtract(6 - m, "day").format("YYYY/MM/DD（ddd）")}`;
          headerTr.append(th);
        }
        table.append(headerTr);
        
        for (let n = 0; n < showColumn.length; n++) {
          const tr = document.createElement("tr");
          const th = document.createElement("th");
          th.textContent = showColumn[n];
          tr.append(th);
          for (let m = 0; m < 7; m++) {
            const td = document.createElement("td");
            if (index - 6 + m < weatherData[key].length && index - 6 + m >= 0) {
              td.textContent = weatherData[key][index - 6 + m][showColumn[n]];
            }
            tr.append(td);
          }
          table.append(tr);
        }
        
        const wbgtTr = document.createElement("tr");
        const wbgtTh = document.createElement("th");
        wbgtTh.textContent = "暑さ指数";
        wbgtTr.append(wbgtTh);
        for (let m = 0; m < 7; m++) {
          const maxWbgt = this.getMaxWBGT(weathers[key]["jmaStationNumber"], nowDate.subtract(6 - m, "day").format("YYYY/MM/DD"));
          const td = document.createElement("td");
          td.textContent = this.getWBGTMean(maxWbgt["wbgt"])["desc"];
          wbgtTr.append(td);
        }
        table.append(wbgtTr);
        
        const title = document.createElement("h3");
        title.textContent = `${key}`;
        weatherDataElement.append(title);
        weatherDataElement.append(table);
      });
    });
    
    const onClickBeforeWeekButton = ((event) => {
      nowDate = nowDate.subtract(1, "week");
      showWeather();
    });
    
    const onClickNextWeekButton = ((event) => {
      nowDate = nowDate.add(1, "week");
      showWeather();
    });
    
    const beforeWeekButtonElement = document.getElementById("before-week");
    beforeWeekButtonElement.onclick = onClickBeforeWeekButton;
    const nextWeekButtonElement = document.getElementById("next-week");
    nextWeekButtonElement.onclick = onClickNextWeekButton;
    
    showWeather();
  }
}

export { Weather };
