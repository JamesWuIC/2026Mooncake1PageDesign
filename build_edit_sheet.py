"""
產生 edit text content.xlsx — 網頁文字編輯總表
使用方式：python3 build_edit_sheet.py
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ─────────────────────────────────────────────────────────────
# 文字資料：(ID, 區段, 層級, 語言, 現有文字, 備註)
# ID 為穩定識別碼，請勿修改；只編輯「新文字」欄即可
# ─────────────────────────────────────────────────────────────
rows = [
    # ─── Hero 1 · 轉盤遊戲 ───
    ("hero1.top.before",    "Hero 1 · 轉盤遊戲", "頂部文字", "中", "祝福您屬", "前綴詞"),
    ("hero1.top.zodiac",    "Hero 1 · 轉盤遊戲", "頂部文字", "中", "馬", "轉盤連動，預設值（會被 JS 覆寫）"),
    ("hero1.top.middle",    "Hero 1 · 轉盤遊戲", "頂部文字", "中", "的朋友", "中綴詞"),
    ("hero1.top.blessing",  "Hero 1 · 轉盤遊戲", "頂部文字", "中", "平安相伴", "轉盤連動，預設值（會被 JS 覆寫）"),
    ("hero1.btn.outer",     "Hero 1 · 轉盤遊戲", "按鈕",   "中", "按我 轉一下 生肖", "外圈轉盤按鈕"),
    ("hero1.btn.inner",     "Hero 1 · 轉盤遊戲", "按鈕",   "中", "按我 轉一下 祝福", "內圈轉盤按鈕"),
    ("hero1.tagline.zh",    "Hero 1 · 轉盤遊戲", "說明文字", "中", "映月恆藏，為您生命中最重要的人客製一份祝福。", ""),
    ("hero1.tagline.en",    "Hero 1 · 轉盤遊戲", "說明文字", "英", "Eternal Continuum — A bespoke blessing for the ones you cherish.", ""),
    ("hero1.zodiac.stem",   "Hero 1 · 轉盤遊戲", "生肖大字", "中", "午", "天干（預設值，會被 JS 覆寫）"),
    ("hero1.zodiac.animal", "Hero 1 · 轉盤遊戲", "生肖大字", "中", "馬", "動物（預設值，會被 JS 覆寫）"),
    ("hero1.zodiac.en",     "Hero 1 · 轉盤遊戲", "生肖大字", "英", "Horse", "英文（預設值，會被 JS 覆寫）"),

    # ─── Marquee 跑馬燈（兩處共用同一組文字，編輯後兩處同步）───
    ("marquee.1",  "Marquee · 跑馬燈", "跑馬燈文字", "中", "映月・恆藏", "出現 2 處跑馬燈"),
    ("marquee.2",  "Marquee · 跑馬燈", "跑馬燈文字", "英", "Eternal Continuum", "出現 2 處跑馬燈"),
    ("marquee.3",  "Marquee · 跑馬燈", "跑馬燈文字", "中", "雙城共啟・洲際在台", "出現 2 處跑馬燈"),
    ("marquee.4",  "Marquee · 跑馬燈", "跑馬燈文字", "英", "Taipei × Kaohsiung", "出現 2 處跑馬燈"),
    ("marquee.5",  "Marquee · 跑馬燈", "跑馬燈文字", "中", "中秋紀念禮盒", "出現 2 處跑馬燈"),
    ("marquee.6",  "Marquee · 跑馬燈", "跑馬燈文字", "英", "Mid-Autumn 2026 Collection", "出現 2 處跑馬燈"),
    ("marquee.7",  "Marquee · 跑馬燈", "跑馬燈文字", "中", "開盒掃碼・解鎖雙城禮遇", "出現 2 處跑馬燈"),
    ("marquee.8",  "Marquee · 跑馬燈", "跑馬燈文字", "英", "Twin-City Hospitality", "出現 2 處跑馬燈"),

    # ─── Hero 2B · 品牌主視覺文字 ───
    ("statement.eyebrow",   "Hero 2B · 品牌主視覺", "小標 Eyebrow", "英", "Mid-Autumn 2026 · Twin Cities Collection", ""),
    ("statement.subtitle",  "Hero 2B · 品牌主視覺", "副標",        "英", "ARTISAN MOONCAKE · TAIPEI & KAOHSIUNG", ""),
    ("statement.desc.l1",   "Hero 2B · 品牌主視覺", "內文 第1行", "中", "高雄洲際酒店 × 台北洲際酒店", ""),
    ("statement.desc.l2",   "Hero 2B · 品牌主視覺", "內文 第2行", "中", "首款雙城共啟的中秋紀念禮盒，", ""),
    ("statement.desc.l3",   "Hero 2B · 品牌主視覺", "內文 第3行", "中", "以設計美學、互動禮遇與在地茶藝，", ""),
    ("statement.desc.l4",   "Hero 2B · 品牌主視覺", "內文 第4行", "中", "將節慶送禮昇華為值得收藏的款待體驗。", ""),
    ("statement.cta1",      "Hero 2B · 品牌主視覺", "主按鈕",      "中英", "立即預訂 · Order Now", ""),
    ("statement.cta2",      "Hero 2B · 品牌主視覺", "次按鈕",      "中", "了解禮盒故事", ""),

    # ─── Hero 2A · 純底圖 ───
    ("hero2a.scrollhint",   "Hero 2A · 純底圖", "捲動提示", "英", "Scroll to explore", "右下角向下捲動提示"),

    # ─── Hero 3 · 月餅展示 ───
    ("hero3.eyebrow",       "Hero 3 · 月餅展示", "小標 Eyebrow", "英", "Mooncake Collection", ""),
    ("hero3.title",         "Hero 3 · 月餅展示", "大標",         "中", "六款匠心·映月精選", "title-divider 為「·」分隔線"),
    ("hero3.desc.l1",       "Hero 3 · 月餅展示", "內文 第1行",   "中", "以節氣為時、以手藝為心，", ""),
    ("hero3.desc.l2",       "Hero 3 · 月餅展示", "內文 第2行",   "中", "每一枚月餅承載一段雙城往返的雋永記憶。", ""),

    ("hero3.item1.name",    "Hero 3 · 月餅 01", "品名 中", "中", "蓮蓉蛋黃", ""),
    ("hero3.item1.sub",     "Hero 3 · 月餅 01", "品名 英", "英", "Lotus & Salted Yolk", ""),
    ("hero3.item1.tagline", "Hero 3 · 月餅 01", "說明",   "中", "經典原味，鹹甜交織。", ""),

    ("hero3.item2.name",    "Hero 3 · 月餅 02", "品名 中", "中", "紫芋流心", ""),
    ("hero3.item2.sub",     "Hero 3 · 月餅 02", "品名 英", "英", "Taro Lava", ""),
    ("hero3.item2.tagline", "Hero 3 · 月餅 02", "說明",   "中", "紫芋香濃，金沙緩流。", ""),

    ("hero3.item3.name",    "Hero 3 · 月餅 03", "品名 中", "中", "抹茶紅豆", ""),
    ("hero3.item3.sub",     "Hero 3 · 月餅 03", "品名 英", "英", "Matcha & Azuki", ""),
    ("hero3.item3.tagline", "Hero 3 · 月餅 03", "說明",   "中", "京都抹茶，餘韻悠長。", ""),

    ("hero3.item4.name",    "Hero 3 · 月餅 04", "品名 中", "中", "棗泥核桃", ""),
    ("hero3.item4.sub",     "Hero 3 · 月餅 04", "品名 英", "英", "Date & Walnut", ""),
    ("hero3.item4.tagline", "Hero 3 · 月餅 04", "說明",   "中", "沉穩雋永，秋日溫潤。", ""),

    ("hero3.item5.name",    "Hero 3 · 月餅 05", "品名 中", "中", "廣式奶黃", ""),
    ("hero3.item5.sub",     "Hero 3 · 月餅 05", "品名 英", "英", "Cantonese Custard", ""),
    ("hero3.item5.tagline", "Hero 3 · 月餅 05", "說明",   "中", "奶香細密，入口即化。", ""),

    ("hero3.item6.name",    "Hero 3 · 月餅 06", "品名 中", "中", "五仁傳統", ""),
    ("hero3.item6.sub",     "Hero 3 · 月餅 06", "品名 英", "英", "Five Kernels", ""),
    ("hero3.item6.tagline", "Hero 3 · 月餅 06", "說明",   "中", "百年配方，匠人之選。", ""),

    ("hero3.cta",           "Hero 3 · 月餅展示", "按鈕", "中英", "立即購買 · Order Now", "圖庫區底部 CTA"),

    # ─── Story · 雙城共啟敘事 ───
    ("story.eyebrow",       "Story · 雙城共啟", "小標 Eyebrow", "英", "A New Chapter", ""),
    ("story.title.l1",      "Story · 雙城共啟", "大標 第1行",   "中", "雙城共啟", ""),
    ("story.title.l2",      "Story · 雙城共啟", "大標 第2行",   "中", "洲際在台嶄新篇章", ""),
    ("story.lead",          "Story · 雙城共啟", "導言",         "中", "2026 中秋，高雄洲際酒店與即將開幕的台北洲際酒店首度攜手，以「映月・恆藏」紀念禮盒，象徵 InterContinental 品牌在台灣的雙城布局新篇章。", "段內「映月・恆藏」自動以斜體呈現"),
    ("story.i.title",       "Story · 里程碑 i", "小標", "中", "台北開幕里程碑", ""),
    ("story.i.desc",        "Story · 里程碑 i", "說明", "中", "揭開洲際品牌北高雙城新章。", ""),
    ("story.ii.title",      "Story · 里程碑 ii", "小標", "中", "高雄五周年前哨", ""),
    ("story.ii.desc",       "Story · 里程碑 ii", "說明", "中", "高雄洲際邁向五周年的紀念之作。", ""),
    ("story.iii.title",     "Story · 里程碑 iii", "小標", "中", "首款雙城節慶紀念禮盒", ""),
    ("story.iii.desc",      "Story · 里程碑 iii", "說明", "中", "兩館聯合監製的中秋限定典藏。", ""),

    # ─── Features · 四重承諾 ───
    ("features.eyebrow",    "Features · 四重承諾", "小標 Eyebrow", "英", "Our Promise", ""),
    ("features.title.l1",   "Features · 四重承諾", "大標 第1行",   "中", "四重承諾", ""),
    ("features.title.l2",   "Features · 四重承諾", "大標 第2行",   "中", "映月・恆藏", ""),
    ("features.title.l3",   "Features · 四重承諾", "大標 第3行",   "中", "款待之心", ""),
    ("features.desc",       "Features · 四重承諾", "內文",         "中", "從工藝、設計、互動到永續，以雙城洲際的款待哲學，回應您對品質與情感的雙重期待。", ""),

    ("features.item1.title", "Features · 承諾 01", "小標", "中", "雙城共啟・洲際在台", ""),
    ("features.item1.desc",  "Features · 承諾 01", "內文", "中", "台北開幕里程碑 × 高雄五周年前哨，首款雙城聯名節慶紀念禮盒。", ""),
    ("features.item2.title", "Features · 承諾 02", "小標", "中", "以禮傳情・收藏優雅", ""),
    ("features.item2.desc",  "Features · 承諾 02", "內文", "中", "洲際黑與淺灰設計，生肖轉盤與祝福文字延伸為數位祝福卡。", ""),
    ("features.item3.title", "Features · 承諾 03", "小標", "中", "開盒有禮・解鎖旅程", ""),
    ("features.item3.desc",  "Features · 承諾 03", "內文", "中", "掃描 QR Code 人人有獎，有機會搶先體驗台北洲際餐飲與住房禮遇。", ""),
    ("features.item4.title", "Features · 承諾 04", "小標", "中", "台灣風土・延續款待", ""),
    ("features.item4.desc",  "Features · 承諾 04", "內文", "中", "在地台灣茶合作，茶葉罐可二次利用，呼應永續與生活美學。", ""),

    # ─── Testimonials · 口碑評語 ───
    ("testimonials.eyebrow", "Testimonials · 口碑", "小標 Eyebrow", "英", "Reviews & Voices", ""),
    ("testimonials.title",   "Testimonials · 口碑", "大標",         "中", "口碑相傳·映月恆藏", "title-divider 為「·」"),

    ("testimonials.1.text",   "Testimonials · 評語 01", "評語內文", "中", "打開禮盒、掃描 QR Code 那一瞬間，竟意外抽到台北洲際的下午茶體驗。中秋從一份月餅，變成一場期待中的雙城之旅。", ""),
    ("testimonials.1.author", "Testimonials · 評語 01", "署名",     "中", "陳小姐 · 個人贈禮", ""),
    ("testimonials.1.date",   "Testimonials · 評語 01", "標籤",     "中英", "情境示意 · Sample", ""),

    ("testimonials.2.text",   "Testimonials · 評語 02", "評語內文", "中", "公司今年選用映月・恆藏作為中秋客戶禮。雙城紀念意涵搭配洲際品質，每位收禮的合作夥伴都印象深刻，整體質感令人放心。", ""),
    ("testimonials.2.author", "Testimonials · 評語 02", "署名",     "中", "林經理 · 企業採購", ""),
    ("testimonials.2.date",   "Testimonials · 評語 02", "標籤",     "中英", "情境示意 · Sample", ""),

    ("testimonials.3.text",   "Testimonials · 評語 03", "評語內文", "中", "茶葉罐的設計與質感太好了，月餅吃完後我用它收納茶具與小物。是禮盒、是紀念，也是一份能持續陪伴的生活美學。", ""),
    ("testimonials.3.author", "Testimonials · 評語 03", "署名",     "中", "王小姐 · IHG One Rewards 會員", ""),
    ("testimonials.3.date",   "Testimonials · 評語 03", "標籤",     "中英", "情境示意 · Sample", ""),

    ("testimonials.cta",      "Testimonials · 口碑",   "按鈕",     "中英", "立即預訂\\nOrder Now", "\\n 代表 HTML <br/> 換行"),

    # ─── Footer · 頁尾 ───
    ("footer.brand.zh",      "Footer · 品牌欄", "品牌中文", "中", "映月・恆藏", ""),
    ("footer.brand.hotel",   "Footer · 品牌欄", "副標",     "英", "Eternal Continuum · Mid-Autumn 2026", ""),
    ("footer.brand.sub",     "Footer · 品牌欄", "說明",     "英", "A Twin-City Hospitality Collection", "斜體呈現"),

    ("footer.col1.label",    "Footer · 高雄洲際", "欄位標題", "中",   "高雄洲際酒店", ""),
    ("footer.col1.en",       "Footer · 高雄洲際", "英文名",   "英",   "InterContinental Kaohsiung", ""),
    ("footer.col1.addr_zh",  "Footer · 高雄洲際", "地址 中",  "中",   "高雄市前鎮區成功二路 262 號", ""),
    ("footer.col1.addr_en",  "Footer · 高雄洲際", "地址 英",  "英",   "No. 262, Chenggong 2nd Rd, Qianzhen Dist., Kaohsiung", "顯示時 Rd, 後會換行"),

    ("footer.col2.label",    "Footer · 雙城合作", "欄位標題", "中",   "雙城合作 · 訂購說明", ""),
    ("footer.col2.l1",       "Footer · 雙城合作", "說明 第1行", "中", "聯名出品 · 台北洲際酒店（即將開幕）", ""),
    ("footer.col2.l2",       "Footer · 雙城合作", "說明 第2行", "中", "中秋限定禮盒 · 歡迎企業採購", ""),
    ("footer.col2.l3",       "Footer · 雙城合作", "說明 第3行", "中", "訂製祝福卡 · 開盒互動禮遇", ""),

    ("footer.bottom.l1",     "Footer · 底部",   "標語",     "英", "Eternal Continuum · Twin-City Mid-Autumn Collection 2026", ""),
    ("footer.bottom.l2",     "Footer · 底部",   "版權",     "英", "© 2026 InterContinental Hotels Group. All rights reserved.", ""),

    # ─── Navbar · LOGO alt 文字 ───
    ("nav.logo.alt",         "Navbar · 導覽列", "LOGO 替代文字", "中英", "InterContinental Kaohsiung 高雄洲際酒店", "視障輔助 alt 文字"),
]

# ─────────────────────────────────────────────────────────────
# 產生 xlsx
# ─────────────────────────────────────────────────────────────
wb = Workbook()
ws = wb.active
ws.title = "edit text content"

# 表頭
headers = ["ID（請勿修改）", "區段 Section", "層級 Type", "語言", "現有文字（請勿修改）", "新文字（編輯這欄）", "備註"]
ws.append(headers)

# 表頭樣式
header_font = Font(name="PingFang TC", size=11, bold=True, color="FFFFFF")
header_fill = PatternFill("solid", fgColor="3B362E")  # 深炭
header_align = Alignment(horizontal="center", vertical="center", wrap_text=True)
thin = Side(border_style="thin", color="C6BCA6")
border = Border(left=thin, right=thin, top=thin, bottom=thin)

for col_idx, _ in enumerate(headers, start=1):
    cell = ws.cell(row=1, column=col_idx)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = header_align
    cell.border = border

# 資料列
body_font   = Font(name="PingFang TC", size=11)
edit_font   = Font(name="PingFang TC", size=11, color="A0863C", bold=True)
section_fills = {}
palette = ["FFF8EE", "F4EFE3", "EDE6D2", "F8F2E0"]  # 暖色循環

current_section = None
section_index = -1

for r, row in enumerate(rows, start=2):
    rid, section, layer, lang, text, note = row

    if section != current_section:
        current_section = section
        section_index += 1
    fill_color = palette[section_index % len(palette)]
    fill = PatternFill("solid", fgColor=fill_color)

    values = [rid, section, layer, lang, text, "", note]
    for col_idx, v in enumerate(values, start=1):
        cell = ws.cell(row=r, column=col_idx, value=v)
        cell.font = edit_font if col_idx == 6 else body_font
        cell.fill = fill
        cell.alignment = Alignment(vertical="top", wrap_text=True)
        cell.border = border

# 欄寬
widths = [26, 26, 16, 8, 56, 56, 30]
for i, w in enumerate(widths, start=1):
    ws.column_dimensions[get_column_letter(i)].width = w

# 凍結首列
ws.freeze_panes = "A2"

# 自動套用篩選
ws.auto_filter.ref = ws.dimensions

# 列高（讓 wrap_text 起作用）
ws.row_dimensions[1].height = 36

# ─────────────────────────────────────────────────────────────
# 第二個工作表：使用說明
# ─────────────────────────────────────────────────────────────
ws2 = wb.create_sheet("使用說明")
guide = [
    ["edit text content — 網頁文字編輯總表"],
    [""],
    ["使用步驟"],
    ["1. 在「新文字（編輯這欄）」F 欄輸入修改後的文字。"],
    ["2. 若該行不需修改，請保持 F 欄空白。"],
    ["3. 編輯完成後存檔（保持 .xlsx 格式）。"],
    ["4. 對 AI 助理說：「請依照 edit text content.xlsx 更新網頁文字」，AI 會讀取本檔並依 ID 自動套用變更。"],
    [""],
    ["欄位說明"],
    ["A · ID：穩定識別碼，AI 用來定位 HTML 中的文字位置，請勿修改。"],
    ["B · 區段：對應網頁的 hero 區塊或頁尾，方便對照網頁位置。"],
    ["C · 層級：標示這段文字是大標 / 小標 / 內文 / 按鈕 / 標籤等。"],
    ["D · 語言：中 / 英 / 中英 標記。"],
    ["E · 現有文字：目前網頁實際呈現的文字（請勿修改，僅供對照）。"],
    ["F · 新文字：請在此輸入想替換的新文字，空白代表保持原樣。"],
    ["G · 備註：補充說明，例如換行符、JS 連動、跑馬燈重複等。"],
    [""],
    ["特殊符號"],
    ["· 「\\n」代表 HTML 中的 <br/> 強制換行（例如按鈕文字）。"],
    ["· 「·」「・」為設計用的點分隔線，請保留原樣。"],
    ["· 跑馬燈每筆文字在 HTML 中出現 2 次，AI 會自動同步兩處。"],
    [""],
    ["注意事項"],
    ["· 不要新增或刪除整列，以免 ID 對應失效。"],
    ["· 若想新增區段或刪除某段文字，請另外口頭告知 AI。"],
    ["· 轉盤生肖大字、頂部祝福詞為 JS 動態更新，改 HTML 預設值僅影響網頁載入瞬間的畫面。"],
    [""],
    ["【AI 草稿】此檔為內部編輯工具，網頁更新後仍須由設計/行銷/公關主管覆核後才可上線。"],
]

for r, line in enumerate(guide, start=1):
    for c, txt in enumerate(line, start=1):
        cell = ws2.cell(row=r, column=c, value=txt)
        if r == 1:
            cell.font = Font(name="PingFang TC", size=16, bold=True, color="3B362E")
        elif txt and txt[0] in "使欄特注【":
            cell.font = Font(name="PingFang TC", size=12, bold=True, color="A0863C")
        else:
            cell.font = Font(name="PingFang TC", size=11)
        cell.alignment = Alignment(vertical="top", wrap_text=True)

ws2.column_dimensions["A"].width = 88

# 存檔
import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "edit text content.xlsx")
wb.save(out)
print(f"OK -> {out}")
print(f"資料列數: {len(rows)}")
