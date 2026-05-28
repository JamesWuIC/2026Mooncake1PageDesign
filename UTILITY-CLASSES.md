# 2026 中秋月餅禮盒 — Utility Class 對照表

> 一套類似 Bootstrap / Tailwind 的 utility class 系統，所有 class 以 `u-` 為前綴避免衝突。
> CSS 來源：[`css/style.css` Section 32–33](./css/style.css)
> 完整文件分為三大類：
> - **Utility Classes**（小工具類）— 細粒度單一屬性控制
> - **Brand Components**（品牌成品元件）— 預組合好的 HTML 範本
> - **組合範例 & 使用建議**

---

## 📐 間距刻度（Spacing Scale）

所有間距相關 utility 都使用以下統一刻度：

| 數值 | 大小 | 數值 | 大小 |
|:---:|:---:|:---:|:---:|
| `0` | 0 | `5` | 32px |
| `1` | 4px | `6` | 48px |
| `2` | 8px | `7` | 64px |
| `3` | 16px | `8` | 96px |
| `4` | 24px | `auto` | auto |

---

# 📦 Utility Classes 完整對照表

## 1. Margin（外距）

| Class | 屬性 |
|---|---|
| `u-m-{0~8}` | margin（四邊） |
| `u-m-auto` | margin: auto |
| `u-mt-{0~8}` | margin-top |
| `u-mb-{0~8}` | margin-bottom |
| `u-ml-{0, 3, 4, auto}` | margin-left |
| `u-mr-{0, 3, 4, auto}` | margin-right |
| `u-mx-auto` | 水平置中（margin-left: auto + margin-right: auto） |
| `u-my-{3, 4, 5, 6}` | margin-top + margin-bottom |

---

## 2. Padding（內距 — 完整刻度 0–8）

| Class | 屬性 |
|---|---|
| `u-p-{0~8}` | padding（四邊） |
| `u-pt-{0~8}` | padding-top |
| `u-pb-{0~8}` | padding-bottom |
| `u-pl-{0~6}` | padding-left |
| `u-pr-{0~6}` | padding-right |
| `u-px-{0~8}` | padding-left + padding-right |
| `u-py-{0~8}` | padding-top + padding-bottom |

---

## 3. 文字對齊

| Class | 屬性 |
|---|---|
| `u-text-left` | text-align: left |
| `u-text-center` | text-align: center |
| `u-text-right` | text-align: right |
| `u-text-justify` | text-align: justify |

---

## 4. 文字顏色（品牌色票）

| Class | 顏色 | Hex / 用途 |
|---|---|---|
| `u-text-gold` | 主金色 | `#bea860` |
| `u-text-gold-deep` | 古董金 | `#8a6f2e` |
| `u-text-gold-pale` | 淡金 | `#d8c898` |
| `u-text-charcoal` | 炭黑 | `#1c1814` |
| `u-text-ink` | 深墨灰 | `#2a2420` |
| `u-text-grey-dark` | 中性灰 | `#857d74` |
| `u-text-grey-deep` | 深暖灰 | `#46403a` |
| `u-text-grey-mid` | 淺暖灰 | `#c4bfb8` |
| `u-text-ivory` | 象牙白 | `#DAD9D6` |
| `u-text-white` | 純白 | `#ffffff` |

---

## 5. 背景色

| Class | 顏色 |
|---|---|
| `u-bg-gold` | 主金色 |
| `u-bg-gold-deep` | 古董金 |
| `u-bg-charcoal` | 炭黑 |
| `u-bg-ink` | 深墨灰 |
| `u-bg-ivory` | 象牙白 |
| `u-bg-ivory-soft` | 淺象牙 |
| `u-bg-white` | 純白 |
| `u-bg-transparent` | 透明 |

---

## 6. 字型 / 字重 / 樣式

| Class | 屬性 |
|---|---|
| `u-font-serif-tc` | Noto Serif TC（中文標題與正文） |
| `u-font-display` | Cormorant Garamond / EB Garamond（裝飾英文） |
| `u-font-en` | EB Garamond（英文） |
| `u-italic` | 斜體 |
| `u-not-italic` | 取消斜體 |
| `u-fw-300` | font-weight: 300（細） |
| `u-fw-400` | font-weight: 400（正常） |
| `u-fw-500` | font-weight: 500（中粗） |
| `u-fw-600` | font-weight: 600（粗） |

---

## 7. 字級（Font Size）

| Class | 大小 |
|---|---|
| `u-text-xs` | 11px |
| `u-text-sm` | 13px |
| `u-text-base` | 15px |
| `u-text-lg` | 18px |
| `u-text-xl` | 22px |
| `u-text-2xl` | 28px |
| `u-text-3xl` | 36px |
| `u-text-4xl` | 48px |
| `u-text-5xl` | 64px |

---

## 8. 字距（Letter Spacing）

| Class | 屬性 |
|---|---|
| `u-tracking-tight` | -0.02em（緊縮） |
| `u-tracking-normal` | 0（一般） |
| `u-tracking-wide` | 0.1em |
| `u-tracking-wider` | 0.18em |
| `u-tracking-widest` | 0.32em |
| `u-tracking-extra` | 0.42em（極寬，用於 eyebrow / 按鈕） |

---

## 9. 行高（Line Height）

| Class | 屬性 |
|---|---|
| `u-leading-none` | 1 |
| `u-leading-tight` | 1.3 |
| `u-leading-normal` | 1.6 |
| `u-leading-relaxed` | 2 |
| `u-leading-loose` | 2.2 |

---

## 10. Display 顯示模式

| Class | 屬性 |
|---|---|
| `u-d-none` | display: none |
| `u-d-block` | display: block |
| `u-d-inline` | display: inline |
| `u-d-inline-block` | display: inline-block |
| `u-d-flex` | display: flex |
| `u-d-inline-flex` | display: inline-flex |
| `u-d-grid` | display: grid |

---

## 11. Flexbox

| Class | 屬性 |
|---|---|
| `u-flex-row` | flex-direction: row |
| `u-flex-col` | flex-direction: column |
| `u-flex-wrap` | flex-wrap: wrap |
| `u-flex-nowrap` | flex-wrap: nowrap |
| `u-flex-1` | flex: 1 |
| `u-flex-auto` | flex: auto |
| `u-flex-none` | flex: none |
| `u-justify-start` | justify-content: flex-start |
| `u-justify-center` | justify-content: center |
| `u-justify-end` | justify-content: flex-end |
| `u-justify-between` | justify-content: space-between |
| `u-justify-around` | justify-content: space-around |
| `u-justify-evenly` | justify-content: space-evenly |
| `u-items-start` | align-items: flex-start |
| `u-items-center` | align-items: center |
| `u-items-end` | align-items: flex-end |
| `u-items-baseline` | align-items: baseline |
| `u-items-stretch` | align-items: stretch |

---

## 12. Gap（flex / grid 間距）

| Class | 屬性 |
|---|---|
| `u-gap-0` | 0 |
| `u-gap-1` | 4px |
| `u-gap-2` | 8px |
| `u-gap-3` | 16px |
| `u-gap-4` | 24px |
| `u-gap-5` | 32px |
| `u-gap-6` | 48px |

---

## 13. Grid 網格

| Class | 屬性 |
|---|---|
| `u-grid-2` | 2 欄等寬 |
| `u-grid-3` | 3 欄等寬 |
| `u-grid-4` | 4 欄等寬 |
| `u-grid-5` | 5 欄等寬 |
| `u-grid-6` | 6 欄等寬 |

> ⚠ 手機 ≤600px 自動降為單欄

---

## 14. 寬高 / 最大寬度

| Class | 屬性 |
|---|---|
| `u-w-full` | width: 100% |
| `u-w-half` | width: 50% |
| `u-w-auto` | width: auto |
| `u-w-fit` | width: fit-content |
| `u-h-full` | height: 100% |
| `u-h-auto` | height: auto |
| `u-h-screen` | height: 100vh |
| `u-max-w-sm` | max-width: 480px |
| `u-max-w-md` | max-width: 680px |
| `u-max-w-lg` | max-width: 880px |
| `u-max-w-xl` | max-width: 1080px |
| `u-max-w-2xl` | max-width: 1280px |
| `u-max-w-full` | max-width: 100% |

---

## 15. 邊框

| Class | 屬性 |
|---|---|
| `u-border-none` | border: none |
| `u-border` | 1px 中性灰 |
| `u-border-gold` | 1px 主金色 |
| `u-border-gold-deep` | 1px 古董金 |
| `u-border-charcoal` | 1px 炭黑 |
| `u-border-t` | border-top（中性灰） |
| `u-border-b` | border-bottom |
| `u-border-l` | border-left |
| `u-border-r` | border-right |
| `u-border-t-gold` | border-top 金色 |
| `u-border-b-gold` | border-bottom 金色 |

---

## 16. 圓角

| Class | 屬性 |
|---|---|
| `u-rounded-none` | 0 |
| `u-rounded-sm` | 4px |
| `u-rounded` | 8px |
| `u-rounded-md` | 12px |
| `u-rounded-lg` | 16px |
| `u-rounded-xl` | 24px |
| `u-rounded-full` | 9999px（完全圓） |

---

## 17. 陰影（共三種類型，依套用對象選擇）

### 17-A. Box-shadow（容器 / 卡片 / 矩形元素）

| Class | 用途 |
|---|---|
| `u-shadow-none` | 移除陰影 |
| `u-shadow-sm` | 微小提示陰影 |
| `u-shadow` | 中等浮起卡片 |
| `u-shadow-lg` | 強烈浮起（重點卡片） |
| `u-shadow-gold` | 金色光暈陰影 |

### 17-B. Drop-shadow（PNG 透明背景圖用 — filter 屬性）

| Class | 用途 |
|---|---|
| `u-ds-sm` | 輕度浮起（淺底淡陰影） |
| `u-ds-md` | 中度浮起（常用插圖） |
| `u-ds-lg` | 深度浮起（雙層，呼應 .animal-img） |
| `u-ds-gold` | 金色光暈（高貴感） |

### 17-C. Text-shadow（文字陰影 — 影片 / 圖片背景上）

| Class | 用途 |
|---|---|
| `u-ts-none` | 無陰影 |
| `u-ts-sm` | 淺底圖片 / 微弱輪廓 |
| `u-ts-md` | 一般圖片背景上的文字 |
| `u-ts-lg` | 影片 / 複雜背景上的中等字 |
| `u-ts-xl` | 大字標題在高對比背景 |
| `u-ts-light` | 淺底深字浮雕感（罕用） |
| `u-ts-gold-glow` | 金色發光（emphasis / luxe） |

### 🎯 三種陰影選擇指南

| 你要套到... | 使用 |
|---|---|
| **文字**（h1 / p / span） | `u-ts-*` |
| **PNG 透明圖**（無底色 / 異形） | `u-ds-*` |
| **矩形容器 / 卡片 / 按鈕** | `u-shadow-*` |

---

## 18. 定位 / 透明度 / 游標 / 溢出

| Class | 屬性 |
|---|---|
| `u-relative` | position: relative |
| `u-absolute` | position: absolute |
| `u-fixed` | position: fixed |
| `u-sticky` | position: sticky; top: 0 |
| `u-inset-0` | top/right/bottom/left: 0 |
| `u-opacity-{0, 25, 50, 75, 100}` | opacity 0→1 |
| `u-cursor-pointer` | cursor: pointer |
| `u-cursor-default` | cursor: default |
| `u-cursor-not-allowed` | cursor: not-allowed |
| `u-overflow-hidden` | overflow: hidden |
| `u-overflow-auto` | overflow: auto |
| `u-overflow-visible` | overflow: visible |
| `u-overflow-x-hidden` | overflow-x: hidden |
| `u-overflow-y-auto` | overflow-y: auto |

---

## 19. 過場與 Hover 微互動

| Class | 效果 |
|---|---|
| `u-trans` | 0.3s ease 過場 |
| `u-trans-fast` | 0.18s 快速 |
| `u-trans-slow` | 0.55s 慢速精緻過場 |
| `u-hover-lift` | hover 時上浮 4px |
| `u-hover-grow` | hover 時放大 1.04 |
| `u-hover-glow` | hover 時金色光暈 |

---

## 20. RWD 顯示控制

| Class | 行為 |
|---|---|
| `u-hide-tablet` | 平板 ≤900px 隱藏 |
| `u-hide-mobile` | 手機 ≤600px 隱藏 |
| `u-show-mobile-only` | 只在手機 ≤600px 顯示 |

---

---

# 🎁 Brand Components（品牌成品元件）

可直接複製貼上 HTML 範本，套用品牌風格。

## 分隔線

```html
<!-- 40px 金色短線 -->
<span class="u-line-gold"></span>

<!-- 同上但置中 -->
<span class="u-line-gold-center"></span>

<!-- 漸層金線 -->
<span class="u-line-gradient"></span>
```

## 卡片

```html
<!-- 玻璃霧面卡片（hover 浮起） -->
<div class="u-card-glass u-p-5">
  <h3 class="u-feature-title">內容標題</h3>
  <p class="u-feature-desc">說明文字。</p>
</div>

<!-- 金邊雙框卡片 -->
<div class="u-card-gold u-p-6">
  <p>含內層 6px 細金邊的精緻卡片。</p>
</div>
```

## 按鈕

```html
<!-- 古董金實心按鈕（主要 CTA） -->
<a class="u-btn-gold">立即購買</a>

<!-- 金邊空心按鈕（hover 填滿） -->
<a class="u-btn-outline">了解更多</a>

<!-- 全站既有 .btn-primary / .btn-text 同樣風格，可直接使用 -->
<a class="btn-primary">立即購買</a>
<a class="btn-text">了解更多</a>
```

## 章節標題組合

```html
<p class="u-eyebrow">
  <span class="u-eyebrow-num">05</span>Section Title
</p>
<h2 class="u-title">章節標題文字</h2>
<span class="u-line-gold-center"></span>
<p class="u-desc">章節敘述...</p>
```

## 引言（Pull Quote）

```html
<blockquote class="u-quote">
  以一盒月餅，串聯雙城的中秋時刻。
</blockquote>
```

## 月相分隔（區段間裝飾）

```html
<div class="u-divider-moon">
  <span></span>
  <span></span>
  <span class="full"></span>
  <span></span>
  <span></span>
</div>
```

## 編號特色項目

```html
<div class="u-feature">
  <div class="u-feature-num">01</div>
  <div class="u-feature-line"></div>
  <h3 class="u-feature-title">特色標題</h3>
  <p class="u-feature-desc">說明文字</p>
</div>
```

---

---

# 🛠 全站既有按鈕規範

全站 `.btn-primary` 與 `.btn-text` 已統一為以下樣式（CSS Section 34）：

| | 淺底（預設） | 深底（反相） |
|---|---|---|
| **主按鈕背景** | 古董金 `#8a6f2e` | 象牙白 `#DAD9D6` |
| **主按鈕文字** | 象牙白 | 炭黑 |
| **Hover 背景** | 亮金 | 亮金 |
| **次按鈕文字** | 古董金 | 象牙白 |
| **Hover 文字色** | 炭黑 | 亮金 |

## 深底反相機制

**方法 A：父容器加 `.dark-bg`**（推薦，整段一次切換）
```html
<section class="dark-bg">
  <a class="btn-primary">立即購買</a>
  <a class="btn-text">了解更多</a>
</section>
```

**方法 B：按鈕本身加 `.btn-on-dark`**（單顆按鈕切換）
```html
<a class="btn-primary btn-on-dark">立即購買</a>
<a class="btn-text btn-on-dark">了解更多</a>
```

## 按鈕群組（垂直堆疊 + 置中）

以下 class 會自動將內部按鈕「垂直堆疊 + 置中」：
- `.btn-group`
- `.hero-actions`
- `.statement-actions`
- `.h3-cta`

---

---

# 💡 組合範例

## A. 標準章節區段（標題置中 + 4 欄特色 + CTA）

```html
<section class="u-py-7 u-px-5 u-bg-ivory u-text-center">
  <p class="u-eyebrow u-mx-auto">
    <span class="u-eyebrow-num">05</span>Brand Story
  </p>
  <h2 class="u-title">標題</h2>
  <span class="u-line-gold-center"></span>
  <p class="u-desc u-mx-auto u-mb-6">章節描述文字</p>

  <div class="u-grid-4 u-gap-4 u-mb-6 u-max-w-2xl u-mx-auto">
    <div class="u-feature u-card-glass u-hover-lift">
      <div class="u-feature-num">01</div>
      <div class="u-feature-line"></div>
      <h3 class="u-feature-title">第一點</h3>
      <p class="u-feature-desc">說明文字</p>
    </div>
    <!-- 重複 4 次 -->
  </div>

  <div class="btn-group">
    <a class="btn-primary">立即購買</a>
    <a class="btn-text">了解更多</a>
  </div>
</section>
```

## B. 左右兩欄（圖片 + 文字）

```html
<section class="u-d-grid u-grid-2 u-gap-6 u-py-7 u-px-5 u-items-center">
  <img src="image.png" class="u-w-full u-ds-md" />
  <div>
    <p class="u-eyebrow">
      <span class="u-eyebrow-num">06</span>Featured
    </p>
    <h2 class="u-title">標題</h2>
    <p class="u-desc u-mt-4">說明文字</p>
    <a class="btn-primary u-mt-5">立即查看</a>
  </div>
</section>
```

## C. PNG 圖片浮起金色光暈（任何透明背景圖）

```html
<img src="mooncake.png" class="u-ds-lg u-hover-glow" />
```

## D. 影片背景上的標題

```html
<div class="u-relative u-overflow-hidden">
  <video class="u-absolute u-inset-0 u-w-full u-h-full"
         autoplay loop muted></video>
  <h1 class="u-relative u-text-center u-text-white
             u-text-4xl u-ts-xl u-py-8">
    映月恆藏
  </h1>
</div>
```

## E. 深底 hero + 反相按鈕

```html
<section class="u-bg-charcoal u-py-8 u-text-center dark-bg">
  <h2 class="u-title u-text-ivory">深底章節</h2>
  <p class="u-desc u-text-grey-mid u-mx-auto u-mb-6">深底章節描述</p>
  <div class="btn-group">
    <a class="btn-primary">立即購買</a>
    <a class="btn-text">了解更多</a>
  </div>
</section>
```

---

---

# 📁 相關檔案

- CSS 來源：[`css/style.css`](./css/style.css)
  - Section 32：Utility Class System（line 4022+）
  - Section 33：Brand Components（line 4150+）
  - Section 34：Button Unified Style（line 4486+）
- 主頁面：[`2026Mooncake1Page.html`](./2026Mooncake1Page.html)
- 專案說明：[`CLAUDE.md`](./CLAUDE.md)

---

# 🔄 版本紀錄

| 日期 | 變更 |
|---|---|
| 2026-05-22 | 初版建立 Utility Class 系統與品牌成品元件 |
| 2026-05-22 | 補齊 padding 0–8 完整刻度 + left/right 個別控制 |
| 2026-05-22 | 加入 text-shadow utility（`u-ts-*`） |
| 2026-05-22 | 整合按鈕統一規範與反相機制 |

---

**【AI 草稿】**本文件由 Claude Code 協助生成，最終以實際 CSS 內容與品牌規範為準。
