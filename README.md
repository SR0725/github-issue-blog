# 範例

你可以在這個網站中看到這個專案的實際應用：[https://github-issue-blog-ruddy.vercel.app/](https://github-issue-blog-ruddy.vercel.app/)

# 操作指南

操作原則上與 Dcard 類似，您可以：

- 登入：點擊右上角的按鈕可以進行 Github 登入，請注意只能使用與 .env 中設定的 GitHub 帳號登入。
- 發文：登入後，您可以在右上角的筆的按鈕中進行發文。
- 列表頁
  - 支援無限滾動，每次加載 10 篇文章，向下滾動至底時會自動加載更多文章。
  - 你可以單擊文章，進入文章頁。
- 文章頁
  - 你可以在右上角的按鈕中「編輯」、「刪除」
- 新增 / 編輯文章時
  - 至少需要使用 title 和 body 兩個欄位
  - 表單驗證:title 為必填,body 至少需要 30 字
# 安裝指南

## 環境變數配置

您需要在您的 .env 檔案中設定以下環境變數：

- `NEXTAUTH_SECRET`：請填入一串隨機的亂碼，這將被用來已做為 JWT 的加密密鑰。
- `GITHUB_Client_SECRET`：這是從 GitHub OAuth 獲得的密鑰。
- `GITHUB_Client_ID`：這是從 GitHub OAuth 獲得的客戶端 ID。
- `NEXT_PUBLIC_REPO_OWNER`：填入您的 GitHub 用戶名稱。
- `NEXT_PUBLIC_REPO_NAME`：填入一個公開的、屬於該 GitHub 用戶的儲存庫名稱。所有的文章將被存儲在這個儲存庫中。

## GitHub OAuth 配置指南

為了讓您的應用能夠通過 GitHub OAuth 驗證，請按照以下步驟操作：

1. 訪問 [GitHub Developer Settings](https://github.com/settings/developers)
2. 點擊「New OAuth App」按鈕。
3. 在「Name」欄位中隨意填寫應用名稱。
4. 「Homepage URL」填寫為 http://localhost:3000/ （部署應用後需更改此 URL）。
5. （可選）填寫應用描述。
6. 「Authorization callback URL」填寫為 http://localhost:3000/api/auth/callback/github
7. 確保「Enable Device Flow」保持未勾選狀態。
8. 點擊「Register application」按鈕完成註冊。
9. 註冊後，您將獲得一個 Client ID。
10. 生成一個 Client Secret，點擊「Generate a new client secret」按鈕，輸入您的 GitHub 密碼以確認。
11. 將 Client ID、Client Secret 的值複製並粘貼到您的 .env 檔案中（以及客戶端）。
12. 確保這些敏感信息不要公開到 GitHub 或任何公共場合以保護您的安全性。

# 專案架構說明

這是一個使用 Next.js 和 React 開發的部落格專案，以下是專案的檔案結構和說明：

## 目錄結構

- `src/`: 專案的主要程式目錄
  - `app/`: Next.js 的應用程式目錄
    - `api/`: API 路由
      - `auth/`: 身份驗證相關的 API 路由
        - `[...nextauth]/`: NextAuth 相關的設定和路由
          - `options.ts`: NextAuth 的選項設定
          - `route.ts`: NextAuth 的路由處理
    - `blog/`: 部落格相關的頁面
      - `[issueNumber]/`: 動態路由，根據 issueNumber 顯示對應的部落格文章頁面
        - `page.tsx`: 部落格文章頁面的元件
      - `create/`: 建立新部落格文章的頁面
        - `page.tsx`: 建立新部落格文章頁面的元件
      - `edit/`: 編輯部落格文章的頁面
        - `[issueNumber]/`: 動態路由，根據 issueNumber 顯示對應的部落格文章編輯頁面
          - `page.tsx`: 部落格文章編輯頁面的元件
    - `layout.tsx`: 應用程式的佈局元件
    - `page.tsx`: 應用程式的首頁元件
  - `components/`: 元件
    - `blog/`: 與部落格相關的元件
      - `blog-comment-list-item.tsx`: 部落格評論列表項元件
      - `blog-comment-list.tsx`: 部落格評論列表元件
      - `blog-create-container.tsx`: 建立新部落格文章的容器元件
      - `blog-delete-modal.tsx`: 刪除部落格文章的模態框元件
      - `blog-editor-container.tsx`: 部落格編輯器的容器元件
      - `blog-editor.tsx`: 部落格編輯器元件
      - `blog-list-item.tsx`: 部落格列表項元件
      - `blog-list.tsx`: 部落格列表元件
      - `blog-operator-dropdown.tsx`: 部落格操作下拉選單元件
      - `blog.tsx`: 部落格元件，完整顯示部落格文章
    - `icon/`: 圖示元件
      - `comment.tsx`: 評論圖示元件
    - `mdx-editor/`: MDX 編輯器相關的元件
      - `forward-ref-mdx-editor.tsx`: 使用 forwardRef 的 MDX 編輯器元件
      - `initialized-mdx-editor.tsx`: 初始化的 MDX 編輯器元件
      - `raw-text-editor.tsx`: 原始文字編輯器元件
    - `navbar/`: 導航列相關的元件
      - `navbar-button.tsx`: 導航列按鈕元件
      - `navbar.tsx`: 導航列元件
    - `nextui.tsx`: Next UI 元件的設定
  - `hooks/`: 自定義的 React Hooks
    - `useCreateIssue.ts`: 建立 Issue 的 Hook
    - `useOctokit.ts`: 使用 Octokit 的 Hook
    - `useQueryIssue.ts`: 查詢單個 Issue 的 Hook
    - `useQueryIssueCommentList.ts`: 查詢 Issue 評論列表的 Hook
    - `useQueryIssueList.ts`: 查詢 Issue 列表的 Hook
    - `useUpdateIssue.ts`: 更新 Issue 的 Hook
  - `middleware.ts`: Next.js 的中間件
  - `models/`: 資料模型
    - `blog-schema.ts`: 部落格的資料模型
    - `comment.ts`: 評論的資料模型
    - `issue.ts`: Issue 的資料模型
  - `providers/`: 提供者元件
    - `react-query/`: React Query 提供者
      - `index.tsx`: React Query 提供者的入口文件
  - `types/`: 型別定義
    - `next-auth.d.ts`: NextAuth 的型別定義

## 主要功能

- 使用 Next.js 的應用程式目錄結構，實現頁面路由和 API 路由
- 使用 NextAuth 進行身份驗證，支援 GitHub 登入
- 使用 React 和 Next UI 構建使用者介面
- 使用 MDX 編輯器實現部落格文章的編輯功能
- 使用 React Query 進行資料查詢和狀態管理
- 使用 Octokit 與 GitHub API 進行互動，實現部落格文章的建立、編輯和刪除功能
- 使用自定義的 React Hooks 封裝常用的功能和邏輯
- 使用 TypeScript、Zod 進行型別檢查和提供型別定義

## 開發環境

- Next.js: 13.x
- React: 18.x
- TypeScript: 4.x

## 啟動專案

1. 安裝相依套件：

```bash
npm install
```

2. 啟動開發伺服器：

```bash
npm run dev
```

3. 在瀏覽器中訪問 `http://localhost:3000` 即可看到應用程式。

## 部署

可以使用 Vercel 或其他支援 Next.js 的平台進行部署。(我使用 Vercel 進行部屬)

---

以上是專案的架構說明和相關資訊，你可以根據實際情況進行修改和補充。
