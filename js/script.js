/*
 * ════════════════════════════════════════════════════════════════
 *  2026 中秋月餅禮盒 — 全站 JavaScript
 *  script.js
 *
 *  目錄
 *  ──────────────────────────────────────────
 *  01. Scroll Reveal（滾動進場動畫）
 *  02. Toast 通知
 *  03. 加入購物車
 *  04. Hero-3 月餅圖片 Slider
 *  05. 產品 Slider（6 格）
 *  06. 生肖轉盤遊戲 — 資料定義
 *  07. 生肖轉盤遊戲 — 旋轉邏輯（spinOuter / spinInner）
 *  08. 頁面平滑錨點捲動
 *  09. 頁面載入後立即顯示已在視窗內的 reveal 元素
 *  10. 開場自動轉動引導（introSpin）
 * ════════════════════════════════════════════════════════════════
 */


/* ════════════════════════════════════════════════════════════════
 * 01. Scroll Reveal（滾動進場動畫）
 *
 * 原理：IntersectionObserver 偵測 .reveal 元素進入視窗時，
 *       加上 .visible class 觸發 CSS transition（見 style.css #15）。
 * 調整觸發時機：改 rootMargin（負值 = 元素進入一段距離後才觸發）。
 * 調整觸發比例：改 threshold（0.1 = 元素露出 10% 就觸發）。
 * ════════════════════════════════════════════════════════════════ */
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target); // 觸發一次後停止監聽，節省效能
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
);

reveals.forEach((el) => io.observe(el));


/* ════════════════════════════════════════════════════════════════
 * 02. Toast 通知
 *
 * showToast(msg) → 在右下角顯示訊息，3 秒後自動消失。
 * 調整顯示時間：改 setTimeout 的 3000（毫秒）。
 * ════════════════════════════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}


/* ════════════════════════════════════════════════════════════════
 * 03. 加入購物車
 *
 * addToCart(name) → 觸發 Toast 顯示品項名稱。
 * 若要接真實購物車功能，在此函式內加入 API 呼叫或本地端儲存邏輯。
 * ════════════════════════════════════════════════════════════════ */
function addToCart(name) {
  showToast("Added: " + name);
}


/* ════════════════════════════════════════════════════════════════
 * 03b. 分享給好友（手機版按鈕）
 *
 * shareToFriend() → 將當下生肖 / 祝福組合分享給好友。
 *   1) 優先呼叫 navigator.share()（手機原生分享面板：LINE、訊息、IG…）
 *   2) 不支援則複製到剪貼簿並 toast 提示
 *   3) 兩者都不支援則 fallback 提示使用者手動複製
 *
 * 分享文案會帶上目前生肖大字 + 品牌資訊 + 頁面網址。
 * ════════════════════════════════════════════════════════════════ */
function shareToFriend() {
  const stem    = document.getElementById("zodiacStem")?.textContent.trim() || "";
  const animal  = document.getElementById("zodiacAnimal")?.textContent.trim() || "";
  const zodiac  = document.getElementById("gtZodiac")?.textContent.trim() || animal;

  const text =
    `祝福您屬 ${zodiac} 的朋友・藏月無境\n` +
    `映月・恆藏 中秋紀念禮盒 — 高雄洲際酒店 × 台北洲際酒店`;
  const url = window.location.href;

  // 1) Web Share API（行動裝置原生分享）
  if (navigator.share) {
    navigator.share({
      title: "映月・恆藏 Eternal Continuum",
      text:  text,
      url:   url,
    }).catch(() => { /* 使用者取消、靜默 */ });
    return;
  }

  // 2) Clipboard API fallback
  const payload = `${text}\n${url}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(payload).then(
      () => showToast("已複製分享文字 · 可貼到 LINE / IG"),
      () => showToast("複製失敗，請手動長按複製")
    );
    return;
  }

  // 3) 都不支援
  showToast("此瀏覽器不支援分享，請手動複製網址");
}


/* ════════════════════════════════════════════════════════════════
 * 04. Hero-3 月餅圖片 Slider
 *
 * h3Total   → 圖片總數，新增 / 刪除圖片時同步更新此值
 * h3Goto(n) → 跳到第 n 張（從 0 開始）
 * h3Slide(dir) → dir = 1 往右, -1 往左
 *
 * 原理：.h3slider-track 用 translateX(-n * 100%) 切換顯示的 slide。
 * ════════════════════════════════════════════════════════════════ */
var h3Current = 0;
var h3Total   = 5; // ← 圖片張數，若新增/刪除圖片請同步修改

function h3Goto(idx) {
  h3Current = (idx + h3Total) % h3Total; // 循環處理（超出邊界回到頭尾）
  document.getElementById("h3sliderTrack").style.transform =
    "translateX(-" + h3Current * 100 + "%)";
  // 更新圓點狀態
  document.querySelectorAll(".h3dot").forEach(function (d, i) {
    d.classList.toggle("active", i === h3Current);
  });
}

function h3Slide(dir) {
  h3Goto(h3Current + dir);
}

// 動態建立圓點按鈕
(function () {
  var dots = document.getElementById("h3sliderDots");
  if (!dots) return;
  for (var i = 0; i < h3Total; i++) {
    var d = document.createElement("button");
    d.className = "h3dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "slide " + (i + 1));
    (function (idx) {
      d.onclick = function () { h3Goto(idx); };
    })(i);
    dots.appendChild(d);
  }
})();


/* ════════════════════════════════════════════════════════════════
 * 05. 產品 Slider（6 格）
 *
 * pTotal    → 產品總數，新增產品時同步更新此值
 * pGoto(n)  → 跳到第 n 張（從 0 開始）
 * pSlide(dir) → dir = 1 往右, -1 往左
 *
 * 原理同 Hero-3 Slider，使用 translateX 切換。
 * ════════════════════════════════════════════════════════════════ */
var pCurrent = 0;
var pTotal   = 6; // ← 產品數量，若新增/刪除產品請同步修改

function pGoto(idx) {
  pCurrent = (idx + pTotal) % pTotal;
  document.getElementById("psliderTrack").style.transform =
    "translateX(-" + pCurrent * 100 + "%)";
  document.querySelectorAll(".pdot").forEach(function (d, i) {
    d.classList.toggle("active", i === pCurrent);
  });
}

function pSlide(dir) {
  pGoto(pCurrent + dir);
}

// 動態建立圓點按鈕
(function () {
  var dots = document.getElementById("psliderDots");
  if (!dots) return;
  for (var i = 0; i < pTotal; i++) {
    var d = document.createElement("button");
    d.className = "pdot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "slide " + (i + 1));
    (function (idx) {
      d.onclick = function () { pGoto(idx); };
    })(i);
    dots.appendChild(d);
  }
})();


/* ════════════════════════════════════════════════════════════════
 * 06. 生肖轉盤遊戲 — 資料定義
 *
 * zodiacData（12 筆）
 * ─────────────────────────────────────────────
 * 順序對應 Layer2 圖盤位置，從 12 點鐘方向（午馬）起順時針排列。
 * 每旋轉 30 度 = 切換一格生肖。
 *
 * 欄位說明：
 *   name → 天干 + 生肖（2 字），例如「午馬」
 *   char → 僅生肖字，顯示在頂部文字
 *   en   → 英文名，顯示在右側斜體裝飾文字
 *   img  → 對應生肖插圖路徑
 *   msg  → 祝福語（預留，目前未顯示在畫面上，可自行運用）
 *
 * 修改方式：直接改各欄位的文字或圖片路徑即可。
 * ─────────────────────────────────────────────
 * blessingData（12 筆，含 2 個空白格作為轉盤空格）
 * ─────────────────────────────────────────────
 * 對應 Layer4 祝福內盤，同樣從 12 點鐘方向起順時針排列。
 * zh = "" 表示該格為空白（轉動時自動跳過）。
 * 若要修改祝福詞，直接改 zh / en 文字即可。
 * ════════════════════════════════════════════════════════════════ */
const zodiacData = [
  { name: "午馬", char: "馬", en: "Horse",   img: "images/06_Animal/20260511_MockupDesign-04.png", msg: "奔放自由，千載難逢機遇近在眼前" },
  { name: "未羊", char: "羊", en: "Goat",    img: "images/06_Animal/20260511_MockupDesign-15.png", msg: "溫和善良，家庭和諧幸福美滿" },
  { name: "申猴", char: "猴", en: "Monkey",  img: "images/06_Animal/20260511_MockupDesign-14.png", msg: "聰明活潑，無限創意帶來豐收" },
  { name: "酉雞", char: "雞", en: "Rooster", img: "images/06_Animal/20260511_MockupDesign-13.png", msg: "勤奮努力，縝密細心成就非凡" },
  { name: "戌狗", char: "狗", en: "Dog",     img: "images/06_Animal/20260511_MockupDesign-12.png", msg: "忠誠可靠，多方貴人相助運強" },
  { name: "亥豬", char: "豬", en: "Pig",     img: "images/06_Animal/20260511_MockupDesign-11.png", msg: "福厚緣深，財富與福氣自然聚集" },
  { name: "子鼠", char: "鼠", en: "Rat",     img: "images/06_Animal/20260511_MockupDesign-10.png", msg: "靈巧機敏，今年財運格外旺盛" },
  { name: "丑牛", char: "牛", en: "Ox",      img: "images/06_Animal/20260511_MockupDesign-09.png", msg: "勤勤懇懇，事業穩步持續向前" },
  { name: "寅虎", char: "虎", en: "Tiger",   img: "images/06_Animal/20260511_MockupDesign-08.png", msg: "勇猛威嚴，身旁貴人緣份極佳" },
  { name: "卯兔", char: "兔", en: "Rabbit",  img: "images/06_Animal/20260511_MockupDesign-07.png", msg: "溫柔細膩，人際關係圓融和諧" },
  { name: "辰龍", char: "龍", en: "Dragon",  img: "images/06_Animal/20260511_MockupDesign-06.png", msg: "龍騰四海，宏圖大展時機已到" },
  { name: "巳蛇", char: "蛇", en: "Snake",   img: "images/06_Animal/20260511_MockupDesign-05.png", msg: "睿智深沉，直覺敏銳引領好運" },
];

const blessingData = [
  { zh: "平安相伴", en: "Peace Together"    }, // 0
  { zh: "心光相映", en: "Hearts Aglow"      }, // 1
  { zh: "月圓人圓", en: "Moon & Family"     }, // 2
  { zh: "",         en: ""                  }, // 3 空白格（轉盤無文字區）
  { zh: "映月團圓", en: "Moonlit Reunion"   }, // 4
  { zh: "時刻共好", en: "Every Moment"      }, // 5
  { zh: "珍藏此刻", en: "Cherish Now"       }, // 6
  { zh: "藏月無境", en: "Moon Boundless"    }, // 7
  { zh: "光影流轉", en: "Light & Shadow"    }, // 8
  { zh: "",         en: ""                  }, // 9 空白格（轉盤無文字區）
  { zh: "圓滿如願", en: "Wishes Fulfilled"  }, // 10
  { zh: "幸福長久", en: "Lasting Happiness" }, // 11
];


/* ════════════════════════════════════════════════════════════════
 * 07. 生肖轉盤遊戲 — 旋轉邏輯
 *
 * 狀態變數：
 *   gOuterRot  → gL2（生肖外盤）目前累積旋轉角度（度）
 *   gInnerRot  → gL4（祝福內盤）目前累積旋轉角度（度）
 *   gOuterStep → 目前指向的生肖索引（0–11）
 *   gInnerStep → 目前指向的祝福索引（0–11）
 *   gBusy      → 動畫進行中時鎖定，防止連按
 *
 * spinOuter()
 *   每次點擊「生肖」按鈕時觸發：
 *   1. 盤面旋轉 30 度（一格）
 *   2. 左側生肖圖、右側大字以 ease-in 飛出
 *   3. 等待 650ms 後更換資料，再 ease-out 飛入
 *
 * spinInner()
 *   每次點擊「祝福」按鈕時觸發：
 *   1. 跳過空白格，尋找下一個有文字的祝福
 *   2. 根據跳格數計算旋轉角度與動畫時間
 *   3. 等待動畫完成後更新頂部文字
 *
 * 調整動畫速度：改 L2.style.transition / dur 相關數值（秒）。
 * ════════════════════════════════════════════════════════════════ */
let gOuterRot  = 0, gInnerRot  = 0, gBusy = false;
let gOuterStep = 0, gInnerStep = 0;

function spinOuter() {
  if (gBusy) return;
  gBusy = true;
  document.getElementById("btnZodiac").disabled  = true;
  document.getElementById("btnBlessing").disabled = true;

  gOuterStep = (gOuterStep + 1) % 12;
  gOuterRot -= 30; // 順時針旋轉一格（-30 度）

  var leftInner  = document.getElementById("panelLeftInner");
  var rightInner = document.getElementById("panelRightInner");
  var gtZodiac   = document.getElementById("gtZodiac");

  // 出場：ease-in 加速離開
  leftInner.style.transition  = "transform 0.45s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.3s ease-in";
  rightInner.style.transition = "transform 0.45s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.3s ease-in";
  leftInner.classList.add("panel-out");
  rightInner.classList.add("panel-out");

  // 頂部文字：向下淡出
  gtZodiac.style.transition = "opacity 0.22s ease-in, transform 0.22s ease-in";
  gtZodiac.style.opacity    = "0";
  gtZodiac.style.transform  = "translateY(22px)";

  // 旋轉生肖外盤（gL2）
  var L2 = document.getElementById("gL2");
  L2.style.transition = "transform 0.45s cubic-bezier(0.33, 1, 0.68, 1)";
  L2.style.transform  = "rotate(" + gOuterRot + "deg)";

  setTimeout(function () {
    // 更新資料
    var z = zodiacData[gOuterStep];
    gtZodiac.textContent = z.char;
    document.getElementById("animalImg").src         = z.img;
    document.getElementById("animalImg").alt         = z.name;
    document.getElementById("zodiacStem").textContent   = z.name[0]; // 天干字
    document.getElementById("zodiacAnimal").textContent = z.name[1]; // 生肖字
    document.getElementById("zodiacLargeEn").textContent = z.en;

    // 入場：清除 JS transition，改回 CSS 定義的 ease-out
    leftInner.style.transition  = "";
    rightInner.style.transition = "";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        leftInner.classList.remove("panel-out");
        rightInner.classList.remove("panel-out");
      });
    });

    // 頂部文字：從下方飛入
    gtZodiac.style.transition = "none";
    gtZodiac.style.transform  = "translateY(22px)";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        gtZodiac.style.transition = "opacity 0.38s ease-out, transform 0.42s cubic-bezier(0.22,1,0.36,1)";
        gtZodiac.style.opacity    = "1";
        gtZodiac.style.transform  = "translateY(0)";
      });
    });

    gBusy = false;
    document.getElementById("btnZodiac").disabled  = false;
    document.getElementById("btnBlessing").disabled = false;
  }, 650); // 等待出場動畫（~450ms）完成後換資料
}

function spinInner() {
  if (gBusy) return;
  gBusy = true;
  document.getElementById("btnZodiac").disabled  = true;
  document.getElementById("btnBlessing").disabled = true;

  var gtBlessing = document.getElementById("gtBlessing");

  // 頂部文字：向下淡出
  gtBlessing.style.transition = "opacity 0.22s ease-in, transform 0.22s ease-in";
  gtBlessing.style.opacity    = "0";
  gtBlessing.style.transform  = "translateY(22px)";

  // 尋找下一個非空白格（跳過 blessingData 中 zh === "" 的格）
  // steps = 實際旋轉格數，用來計算角度與動畫時間
  var steps    = 0;
  var nextStep = gInnerStep;
  do {
    nextStep = (nextStep + 1) % 12;
    steps++;
  } while (blessingData[nextStep].zh === "" && steps < 12);

  gInnerStep = nextStep;
  gInnerRot -= steps * 30; // 每格 30 度

  // 跳格越多，動畫時間越長（steps=1 → 0.45s，steps=2 → 0.71s，以此類推）
  var L4  = document.getElementById("gL4");
  var dur = steps === 1 ? 0.45 : 0.55 + steps * 0.08;
  L4.style.transition = "transform " + dur + "s cubic-bezier(0.33, 1, 0.68, 1)";
  L4.style.transform  = "rotate(" + gInnerRot + "deg)";

  setTimeout(
    function () {
      // 更新頂部祝福文字
      gtBlessing.textContent = blessingData[gInnerStep].zh;

      // 頂部文字：從下方飛入
      gtBlessing.style.transition = "none";
      gtBlessing.style.transform  = "translateY(22px)";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          gtBlessing.style.transition = "opacity 0.38s ease-out, transform 0.42s cubic-bezier(0.22,1,0.36,1)";
          gtBlessing.style.opacity    = "1";
          gtBlessing.style.transform  = "translateY(0)";
        });
      });

      gBusy = false;
      document.getElementById("btnZodiac").disabled  = false;
      document.getElementById("btnBlessing").disabled = false;
    },
    dur * 1000 + 50 // 等旋轉動畫結束後再換文字（+50ms 緩衝）
  );
}


/* ════════════════════════════════════════════════════════════════
 * 08. 頁面平滑錨點捲動
 *
 * 攔截所有 href="#xxx" 的連結點擊，改用 scrollIntoView 平滑捲動。
 * 若需要加入 offset（例如固定 Header 的高度），
 * 改用 window.scrollTo({ top: el.offsetTop - 80 }) 代替。
 * ════════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ════════════════════════════════════════════════════════════════
 * 09. 頁面載入後立即顯示已在視窗內的 reveal 元素
 *
 * IntersectionObserver 在頁面載入時不一定會觸發已可見元素，
 * 此段補足：載入完成後手動檢查並加上 .visible。
 * ════════════════════════════════════════════════════════════════ */
window.addEventListener("load", () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight)
      el.classList.add("visible");
  });
});


/* ════════════════════════════════════════════════════════════════
 * 10. 開場自動轉動引導（introSpin）
 *
 * 頁面載入後：
 *   t = 600ms   → 「生肖」按鈕光暈動畫 → 自動觸發 spinOuter()
 *   t = ~2200ms → 「祝福」按鈕光暈動畫 → 自動觸發 spinInner()
 *
 * 目的是引導使用者注意到轉盤的互動操作。
 *
 * 調整延遲：改 glowThenSpin 最後一個參數的 delay 毫秒值。
 * 取消開場動畫：直接刪除整個 introSpin IIFE 即可。
 * ════════════════════════════════════════════════════════════════ */
(function introSpin() {
  var btnZ = document.getElementById("btnZodiac");
  var btnB = document.getElementById("btnBlessing");

  /**
   * glowThenSpin(btn, spinFn, delay, afterDelay, afterCb)
   * btn        → 要發光的按鈕元素
   * spinFn     → 光暈動畫結束後要呼叫的旋轉函式
   * delay      → 幾毫秒後開始光暈（從現在起算）
   * afterDelay → spinFn 完成後，幾毫秒後呼叫 afterCb
   * afterCb    → 後續動作的 callback（null = 無）
   */
  function glowThenSpin(btn, spinFn, delay, afterDelay, afterCb) {
    setTimeout(function () {
      btn.classList.add("btn-intro-glow");
      btn.addEventListener(
        "animationend",
        function onEnd() {
          btn.removeEventListener("animationend", onEnd);
          btn.classList.remove("btn-intro-glow");
          spinFn(); // 執行旋轉
          if (afterCb) setTimeout(afterCb, afterDelay);
        },
        { once: true }
      );
    }, delay);
  }

  // 先讓「生肖」按鈕光暈並旋轉，旋轉完成（~1000ms）後再讓「祝福」按鈕光暈
  glowThenSpin(btnZ, spinOuter, 600, 1000, function () {
    glowThenSpin(btnB, spinInner, 0, 0, null);
  });
})();


/* ════════════════════════════════════════════════════════════════
 * 11. 觸控滑動支援（Touch Swipe — h3Slider & pSlider）
 *
 * 判斷邏輯：
 *   touchstart  → 記錄起始 X / Y
 *   touchmove   → 若垂直位移 > 水平位移，標記為「頁面捲動」並鎖定
 *   touchend    → 水平位移 > 40px 且未被鎖定，才觸發換頁
 *
 * passive: true → 不攔截 scroll，維持捲動流暢度。
 * 調整靈敏度：改 THRESHOLD 數值（px）。
 * ════════════════════════════════════════════════════════════════ */
(function () {
  var THRESHOLD = 40; // 最小觸發滑動距離（px）

  function addSwipe(trackId, slideFn) {
    var el = document.getElementById(trackId);
    if (!el) return;
    var startX = 0, startY = 0, scrollLocked = false;

    el.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      scrollLocked = false;
    }, { passive: true });

    el.addEventListener("touchmove", function (e) {
      if (scrollLocked) return;
      var dx = Math.abs(e.touches[0].clientX - startX);
      var dy = Math.abs(e.touches[0].clientY - startY);
      if (dy > dx) scrollLocked = true; // 垂直滑動優先，交還給頁面捲動
    }, { passive: true });

    el.addEventListener("touchend", function (e) {
      if (scrollLocked) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > THRESHOLD) slideFn(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  addSwipe("h3sliderTrack", h3Slide);
  addSwipe("psliderTrack",  pSlide);
})();


/* ════════════════════════════════════════════════════════════════
 * 12. 鍵盤方向鍵支援（Keyboard Navigation）
 *
 * 焦點在 .hero3（月餅圖片 Slider）或 .products（產品 Slider）
 * 區塊內時，左右方向鍵可切換 slide。
 * ════════════════════════════════════════════════════════════════ */
document.addEventListener("keydown", function (e) {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  var dir = e.key === "ArrowRight" ? 1 : -1;
  var active = document.activeElement;
  if (!active || !active.closest) return;
  if (active.closest(".hero3"))    { e.preventDefault(); h3Slide(dir); }
  if (active.closest(".products")) { e.preventDefault(); pSlide(dir); }
});


/* ════════════════════════════════════════════════════════════════
 * 13. Hero 3 月餅展示 — 手機版自動 Slider
 *
 * 桌機：維持 CSS grid 排版，本段邏輯不啟動。
 * 手機（≤600px）：.h3-showcase 由 CSS 切換為 scroll-snap 容器，
 *                  本段 JS 負責：
 *                    1) 動態建立圓點指示器（依 .h3-item 數量）
 *                    2) 每 4.5 秒自動切換下一張
 *                    3) 使用者觸控 / scroll 時暫停，停止 3 秒後恢復
 *                    4) 圓點可點擊跳轉指定卡片
 *                    5) 視窗 resize 跨越斷點時自動 enable/disable
 *
 * 調整自動播放秒數：改 AUTO_INTERVAL 數值（毫秒）
 * ════════════════════════════════════════════════════════════════ */
(function h3MobileSlider() {
  var showcase = document.querySelector(".h3-showcase");
  var items    = document.querySelectorAll(".h3-item");
  var dotsWrap = document.getElementById("h3Dots");
  var prevBtn  = document.getElementById("h3Prev");
  var nextBtn  = document.getElementById("h3Next");
  if (!showcase || !items.length || !dotsWrap) return;

  var AUTO_INTERVAL = 1000;   // 自動切換間隔（ms）— 每 1 秒切換一張
  var RESUME_DELAY  = 3000;   // 使用者操作後多久恢復自動
  var mq = window.matchMedia("(max-width: 600px)");

  var currentIdx   = 0;
  var autoTimer    = null;
  var resumeTimer  = null;
  var scrollDebounce = null;
  var userInteracting = false;

  // 動態建立圓點按鈕（依 .h3-item 數量）
  for (var i = 0; i < items.length; i++) {
    var dot = document.createElement("button");
    dot.className = "h3-dot" + (i === 0 ? " active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", "第 " + (i + 1) + " 款月餅");
    (function (idx) {
      dot.addEventListener("click", function () {
        goTo(idx);
        pauseAndResume();
      });
    })(i);
    dotsWrap.appendChild(dot);
  }

  function updateDots(idx) {
    var dots = dotsWrap.querySelectorAll(".h3-dot");
    for (var j = 0; j < dots.length; j++) {
      dots[j].classList.toggle("active", j === idx);
    }
  }

  function goTo(idx) {
    currentIdx = ((idx % items.length) + items.length) % items.length;
    var target = items[currentIdx];
    // 用 scrollTo 而非 scrollIntoView 以避免整頁也跟著捲動
    showcase.scrollTo({
      left: target.offsetLeft - showcase.offsetLeft,
      behavior: "smooth"
    });
    updateDots(currentIdx);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(currentIdx + 1);
    }, AUTO_INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function pauseAndResume() {
    stopAuto();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () {
      if (mq.matches) startAuto();
    }, RESUME_DELAY);
  }

  // 監聽使用者手動 scroll，同步 dots
  // 由於卡片寬度為 88% + 兩側 6% margin，單位 step 應取自
  // 「相鄰兩張卡片 offsetLeft 的差」而非 offsetWidth，
  // 才能正確對應到 scrollLeft 上的卡片索引。
  function onScroll() {
    if (scrollDebounce) clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(function () {
      if (items.length < 2) return;
      var sl   = showcase.scrollLeft;
      var step = items[1].offsetLeft - items[0].offsetLeft;
      if (step <= 0) return;
      var idx = Math.round(sl / step);
      if (idx < 0) idx = 0;
      if (idx > items.length - 1) idx = items.length - 1;
      if (idx !== currentIdx) {
        currentIdx = idx;
        updateDots(currentIdx);
      }
    }, 120);
  }

  function onTouchStart() {
    userInteracting = true;
    stopAuto();
  }
  function onTouchEnd() {
    userInteracting = false;
    pauseAndResume();
  }

  // 左右箭頭按鈕事件
  function onPrev() {
    goTo(currentIdx - 1);
    pauseAndResume();
  }
  function onNext() {
    goTo(currentIdx + 1);
    pauseAndResume();
  }

  function enable() {
    showcase.addEventListener("scroll", onScroll, { passive: true });
    showcase.addEventListener("touchstart", onTouchStart, { passive: true });
    showcase.addEventListener("touchend", onTouchEnd, { passive: true });
    if (prevBtn) prevBtn.addEventListener("click", onPrev);
    if (nextBtn) nextBtn.addEventListener("click", onNext);
    // 開始時跳到第一張並啟動自動
    goTo(0);
    startAuto();
  }

  function disable() {
    stopAuto();
    if (resumeTimer) clearTimeout(resumeTimer);
    showcase.removeEventListener("scroll", onScroll);
    showcase.removeEventListener("touchstart", onTouchStart);
    showcase.removeEventListener("touchend", onTouchEnd);
    if (prevBtn) prevBtn.removeEventListener("click", onPrev);
    if (nextBtn) nextBtn.removeEventListener("click", onNext);
  }

  function applyMode() {
    if (mq.matches) {
      enable();
    } else {
      disable();
      // 桌機回到原本 grid，無需 scroll 位置
    }
  }

  // 初始化 + 監聽螢幕尺寸變化（跨斷點時自動切換 enable/disable）
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", applyMode);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(applyMode); // 舊瀏覽器相容
  }
  applyMode();
})();
