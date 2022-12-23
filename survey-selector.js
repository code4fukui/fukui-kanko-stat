import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/dayjs.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/locale/ja.min.js";

class SurveySelector {
  // 各チャートの情報
  surveys = {
    "都道府県": {
      selectCode: {
        "北海道": 1,
        "青森県": 2,
        "岩手県": 3,
        "宮城県": 4,
        "秋田県": 5,
        "山形県": 6,
        "福島県": 7,
        "茨城県": 8,
        "栃木県": 9,
        "群馬県": 10,
        "埼玉県": 11,
        "千葉県": 12,
        "東京都": 13,
        "神奈川県": 14,
        "新潟県": 15,
        "富山県": 16,
        "石川県": 17,
        "福井県": 18,
        "山梨県": 19,
        "長野県": 20,
        "岐阜県": 21,
        "静岡県": 22,
        "愛知県": 23,
        "三重県": 24,
        "滋賀県": 25,
        "京都府": 26,
        "大阪府": 27,
        "兵庫県": 28,
        "奈良県": 29,
        "和歌山県": 30,
        "鳥取県": 31,
        "島根県": 32,
        "岡山県": 33,
        "広島県": 34,
        "山口県": 35,
        "徳島県": 36,
        "香川県": 37,
        "愛媛県": 38,
        "高知県": 39,
        "福岡県": 40,
        "佐賀県": 41,
        "長崎県": 42,
        "熊本県": 43,
        "大分県": 44,
        "宮崎県": 45,
        "鹿児島県": 46,
        "沖縄県": 47
      }
    },
    "年代": {
      selectCode: {
        "10歳未満": 0,
        "10代": 1,
        "20代": 2,
        "30代": 3,
        "40代": 4,
        "50代": 5,
        "60代": 6,
        "70代": 7,
        "80歳以上": 8,
      }
    },
    "性別": {
      selectCode: {
        "男": 0,
        "女": 1,
        "その他": 2,
        "無回答": 3
      }
    },
    "6分類": {
      selectCode: {
        "あわら市・坂井市": 0,
        "勝山市・大野市": 1,
        "福井市・永平寺町": 2,
        "丹南": 3,
        "嶺南東部（若狭町以東）": 4,
        "嶺南西部（小浜市以西）": 5
      }
    },
    "回答エリア2": {
    },
    "世帯年収": {
      selectCode: {
        "100万円未満": 0,
        "100万円以上 200万円未満": 1,
        "200万円以上 300万円未満": 2,
        "300万円以上 400万円未満": 3,
        "400万円以上 500万円未満": 4,
        "500万円以上 600万円未満": 5,
        "600万円以上 700万円未満": 6,
        "700万円以上 800万円未満": 7,
        "800万円以上 900万円未満": 8,
        "900万円以上 1,000万円未満": 9,
        "1,000万円以上 1,200万円未満": 10,
        "1,200万円以上 1,500万円未満": 11,
        "1,500万円以上": 12,
        "分からない/無回答": 13
      }
    },
    "回答月": {
    },
    "満足度": {
      selectCode: {
        "とても満足": 0,
        "満足": 1,
        "どちらでもない": 2,
        "不満": 3,
        "とても不満": 4
      }
    },
    "不便さ": {
      selectCode: {
        "感じなかった": 0,
        "感じた": 1
      }
    },
    "NPS": {
    },
    "宿泊数（県内）": {
    },
    "今後の来訪意向": {
      selectCode: {
        "また行きたい（1年以内）": 0,
        "機会があれば行きたい": 1,
        "どちらともいえない": 2,
        "あまり行きたいと思わない": 3,
        "行きたくない": 4,
        "福井県在住": 5
      }
    },
    "同行者": {
      selectCode: {
        "自分ひとり": 0,
        "恋人": 1,
        "夫婦2人": 2,
        "小学生以下連れの家族": 3,
        "中学生以上連れの家族": 4,
        "親": 5,
        "その他家族": 6,
        "友人": 7,
        "団体旅行": 8,
        "学校関係（修学旅行・社会科見学等）": 9,
        "職場の同僚": 10,
        "その他": 11
      }
    }
  };
  
  sortSelectCodes(name, codes) {
    switch(name) {
      case "都道府県":
      case "年代":
      case "性別":
      case "世帯年収":
      case "満足度":
      case "不便さ":
      case "今後の来訪意向":
      return codes.sort((c1, c2) => {
        if (this.surveys[name]["selectCode"][c1] < this.surveys[name]["selectCode"][c2]) {
          return -1;
        }
        
        if (this.surveys[name]["selectCode"][c1] > this.surveys[name]["selectCode"][c2]) {
          return 1;
        }
        
        return 0;
      });
      
      case "6分類":
      case "同行者":
      return Object.keys(this.surveys[name]["selectCode"]).sort((c1, c2) => {
        if (this.surveys[name]["selectCode"][c1] < this.surveys[name]["selectCode"][c2]) {
          return -1;
        }
        
        if (this.surveys[name]["selectCode"][c1] > this.surveys[name]["selectCode"][c2]) {
          return 1;
        }
        
        return 0;
      });
      
      case "回答月":
      return codes.sort((c1, c2) => {
        const n1 = Number(c1.slice(-1));
        const n2 = Number(c2.slice(-1));
        
        if (n1 < n2) {
          return -1;
        }
        
        if (n1 > n2) {
          return 1;
        }
        
        return 0;
      });
      
      case "NPS":
      return codes.sort((c1, c2) => {
        const n1 = Number(c1);
        const n2 = Number(c2);
        
        if (n1 < n2) {
          return 1;
        }
        
        if (n1 > n2) {
          return -1;
        }
        
        return 0;
      });
      
      default:
      break;
    }
    
    return codes.sort();
  };
  
  convertData(key, data) {
    switch (key) {
      case "6分類":
      switch (data[key]) {
        case "嶺南東部":
        data[key] += "（若狭町以東）";
        break;
        
        case "嶺南西部":
        data[key] += "（小浜市以西）";
        break;
        
        default:
        break;
      }
      break;
      
      case "同行者":
      if (!Object.keys(this.surveys[key]["selectCode"]).includes(data[key])) {
        data[key] = "その他";
      }
      break;
      
      default:
      break;
    }
  }
  
  createSelectElement(divsels, csv, show, fromDate, toDate) {
    const addElementToBox = (box, sel, parent) => {
      switch (sel) {
        case "都道府県":
        const input = parent.querySelectorAll("select")[0];
        
        const allButton = document.createElement("button");
        allButton.textContent = "全国";
        allButton.onclick = (event) => {
          input.querySelectorAll("option").forEach(o => {
            o.selected = false;
          });
          input.onchange();
        };
        
        const inButton = document.createElement("button");
        inButton.textContent = "福井県内";
        inButton.onclick = (event) => {
          input.querySelectorAll("option").forEach(o => {
            if (o.value == "福井県") {
              o.selected = true;
              return;
            }
            
            o.selected = false;
          });
          input.onchange();
        };
        
        const outButton = document.createElement("button");
        outButton.textContent = "福井県外";
        outButton.onclick = () => {
          input.querySelectorAll("option").forEach(o => {
            if (o.value == "福井県" || !o.value) {
              o.selected = false;
              return;
            }
            
            o.selected = true;
          });
          input.onchange();
        };
        
        box.appendChild(allButton);
        box.appendChild(inButton);
        box.appendChild(outButton);
        break;
        
        default:
        break;
      }
    };
    
    const sels = Object.keys(this.surveys);
    for (const sel of sels) {
      const box = document.createElement("span");
      box.style.display = "inline-block";
      const txt = document.createElement("span");
      txt.textContent = sel;
      box.appendChild(txt);
      box.appendChild(document.createElement("br"));
      const s = document.createElement("select");
      s.setAttribute("multiple", true);
      s.appendChild(document.createElement("option"));
      const names = this.sortSelectCodes(sel, ArrayUtil.toUnique(csv.map(a => a[sel])));
      names.forEach(name => {
        if (!name) {
          return;
        }
        const opt = document.createElement("option");
        opt.textContent = name;
        s.appendChild(opt);
      });
      box.appendChild(s);
      addElementToBox(prefbox, sel, box);
      divsels.appendChild(box);
      s.dataname = sel;
      s.onchange = show;
    }
    
    divsels.appendChild(document.createElement("br"));
    
    const from = !fromDate ? dayjs().subtract(1, "months") : dayjs(fromDate);
    const to = !toDate ? dayjs() : dayjs(toDate);
    this.createDateInputElement(divsels, {
      title: "開始日",
      elementId: "fromDate",
      date: from.format("YYYY-MM-DD"),
      onChange: show
    });
    this.createDateInputElement(divsels, {
      title: "終了日",
      elementId: "toDate",
      date: to.format("YYYY-MM-DD"),
      onChange: show
    });
  }
  
  createDateInputElement(parent, option) {
    const box = document.createElement("span");
    box.style.display = "inline-block";
    const txt = document.createElement("span");
    txt.textContent = option["title"];
    box.appendChild(txt);
    box.appendChild(document.createElement("br"));
    const dateInputElement = document.createElement("input");
    dateInputElement.setAttribute("id", option["elementId"]);
    dateInputElement.setAttribute("type", "date");
    dateInputElement.value = option["date"];
    if (option["onChange"]) {
      dateInputElement.onchange = option["onChange"];
    }
    box.appendChild(dateInputElement);
    parent.appendChild(box);
  }
  
  getFromDate() {
    return dayjs(document.getElementById("fromDate").value);
  }
  
  getToDate() {
    return dayjs(document.getElementById("toDate").value);
  }
  
  filter(csv) {
    const node2array = (nodes) => {
      const res = [];
      for (const n of nodes) {
        res.push(n);
      }
      return res;
    };
    
    const generateKeys = (selectedOptions) => {
      const keys = [];
      for (let i = 0; i < selectedOptions.length; i++) {
        keys.push(selectedOptions[i].value);
      }
      // 空要素は削除
      return keys.filter(Boolean);
    };
    
    const keys = node2array(divsels.querySelectorAll("select")).map(s => [s.dataname, generateKeys(s.selectedOptions)]);
    const fromDate = this.getFromDate();
    const toDate = this.getToDate();
    
    return csv.filter(c => {
      const answerDate = dayjs(c["回答日時"]).hour(0).minute(0).second(0);
      if (answerDate < fromDate || answerDate > toDate ) {
        return false;
      }
      
      for (const key of keys) {
        if (key[1].length != 0) {
          this.convertData(key[0], c);
          if (!key[1].includes(c[key[0]])) {
            return false;
          }
        }
      }
      
      return true;
    });
  }
}

export { SurveySelector };
