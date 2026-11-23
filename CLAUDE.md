# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概觀

FHIR.tw 的官方網站：一個單頁靜態網站，介紹「台灣 FHIR 公共網域」免費二級網域註冊服務（如 `myblog.fhir.tw`），並列出 FHIR／醫學資訊相關的公開資源。

網站內容全部在 `public/`，沒有建置流程、測試或 lint。根目錄其餘檔案只負責部署，不會被公開。

## 開發

直接編輯 `public/` 內的檔案。本機預覽：

```bash
npm run preview        # python3 -m http.server 8000 -d public
```

- `public/index.html`：全部內容與一小段 inline script。首屏的子網域輸入框在空白且未聚焦時會以打字機效果輪播示範名稱（script 內的 `samples` 陣列，使用醫療資訊相關的名稱），送出時開啟寄給 `hello@lorex.tw` 的 mailto。
- 區塊順序是刻意的：hero 之後第一個區塊就是「資源列表」，hero 的主要按鈕也是「查看資源列表」。
- `public/style.css`：全部樣式，手寫 CSS，沒有 Bootstrap 或其他框架。`404.html` 共用同一份樣式。
- 配色比照 [sita.tech](https://sita.tech) 的矽塔主題，色票定義在 `style.css` 開頭的 `:root` 變數（`#000F39`、`#00154C`、`#334370`、`#EBECF1`、`#FFFFFF`）。新增樣式時使用這些變數，不要另外引入顏色。
- 字體為 Google Fonts 的 Inter／Inter Tight／Noto Sans TC。
- `public/assets/fhirtw.jpg` 是 Logo，不要修改。
- 網站內容為繁體中文（台灣用語）。

## 部署

網站以 Cloudflare Workers 靜態資產（assets-only Worker，名稱 `fhirtw`）部署，使用 `cf` CLI，**不使用 Wrangler**，也不要新增 Wrangler 設定檔。

```bash
npx cf deploy ./public --dry-run   # 驗證，不送出 API 請求、不需登入
npx cf deploy ./public             # 部署（需要 cf auth login 或 CLOUDFLARE_API_TOKEN）
```

- `cf` 需要 Node.js 22.18 以上。
- Worker 設定在 `cloudflare.config.ts`，設定必須包在 `worker` 鍵之下；該檔沒有 assets 目錄欄位，目錄是由指令參數 `./public` 指定。
- `.github/workflows/deploy.yml`：push 到 `main` 即部署上線，沒有 staging；PR 只執行 `--dry-run`。需要 repo secrets `CLOUDFLARE_API_TOKEN` 與 `CLOUDFLARE_ACCOUNT_ID`。
- `.gitlab-ci.yml` 是同一套流程的 GitLab 版本，修改部署流程時兩個檔案要一起改。

## 常見修改

- **新增資源到「資源列表」**：在 `public/index.html` 的 `<tbody>` 內加一個 `<tr>`，三欄依序為網址（顯示文字不含 `https://`）、說明、聯絡人（格式 `名稱 <mailto 連結>`）。
- **網域申請**一律導向 `hello@lorex.tw`；「聯絡我們」區塊則是 `ceo@sita.tech`。
