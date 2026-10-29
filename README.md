# 基于 ARM 的三相电能计量系统设计 · 资料站

面向 **Cloudflare Pages** 的纯静态站点。首页是成果概览与资料下载中心，`report.html` 是完整研究报告。

- 无构建步骤、无框架、无外部字体或脚本请求
- 首页按 [DownloadPageFileRepo](https://github.com/Azithromycin15/DownloadPageFileRepo) 的「Hero + 统计 + 分组下载卡片 + 页脚」格式重排
- 完整报告保留原有阅读版式，只补充返回资料首页与下载入口
- 所有资料通过本地 `heads/downloads.js` 清单渲染，不依赖 OBS、API 或任何后端

## 目录结构

```
.
├── index.html              # 资料首页：概览、关键结果、下载目录
├── report.html             # 完整研究报告（Pages 的 clean URL 通常为 /report）
├── 404.html                # Cloudflare Pages 自定义 404
├── _headers                # 安全响应头与缓存策略
├── _redirects              # 旧地址 301 到首页
├── robots.txt
├── shaders/
│   ├── style.css           # 首页样式
│   └── report.css          # 报告页样式（原 webdir 版式）
├── heads/
│   ├── downloads.js        # 资料清单（标题、说明、大小、下载名）
│   ├── catalog.js          # 首页卡片渲染器
│   └── report.js           # 报告页目录高亮与返回顶部
└── assets/
    ├── favicon.svg
    ├── files/              # 8 份 PDF（ASCII 路径）
    └── img/                # 12 张实测/硬件照片
        └── thumbs/         # 首页卡片用的 160×160 缩略图
```

`assets/files/` 中 PDF 使用 ASCII 文件名，避免中文 URL 在 Pages 上出现百分号编码或重定向问题；下载时通过 `download` 属性恢复原始中文文件名。`report.html` 的附录仍展示中文原名。

## 本地预览

在本目录执行：

```bash
python3 -m http.server 8080
```

打开 <http://localhost:8080/>。请通过 HTTP 预览，不要直接双击 `index.html`：`file://` 下浏览器会限制部分脚本行为。

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐）

1. 将本目录作为仓库根目录推到 GitHub / GitLab；如果仓库还包含其它资料目录，请在 Pages 项目里把 **Root directory** 设为 `cloudflare-pages`，或只推送本目录。
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 选择仓库，按下表填写：

   | 配置项 | 值 |
   | --- | --- |
   | Framework preset | None |
   | Build command | 留空 |
   | Build output directory | `.`（仓库根目录；也可留空） |
   | Production branch | `main` 或 `master` |

4. 保存并部署。后续推送即自动重新发布。

### 方式二：Direct Upload

Dashboard 中选择 **Upload assets**，把本目录整体拖入，或使用 CLI：

```bash
npx wrangler pages deploy . --project-name=<你的项目名>
```

注意：本项目是 **Pages**，不要使用 `npx wrangler deploy`（那是 Workers 的部署命令），也不需要 `wrangler.jsonc`。

### 平台能力

- `_headers` 设置 CSP、`X-Content-Type-Options`、`Referrer-Policy`、权限策略与缓存；HTML 不缓存，`/assets/*` 缓存 7 天。
- `_redirects` 把旧 Workers 地址 `/three-phase-energy-metering(.html)` 301 到首页，并把 `/index.html` 归一到 `/`。
- `404.html` 由 Pages 自动接管未知路径。
- 当前共 19 个下载文件，总体积约 45 MB；最大单文件约 18 MB，低于 Pages 的 **25 MiB/文件** 与 **20,000 文件** 限制。

## 更新资料

1. 把新文件放入 `assets/files/`（建议 ASCII 文件名）或 `assets/img/`。
2. 编辑 `heads/downloads.js`，在对应分组追加条目：
   - `title` / `desc`：卡片标题与说明；
   - `file`：展示用原始文件名；
   - `url`：站内相对路径；
   - `kind`：`PDF` / `JPG`；
   - `pages`：PDF 页数（可选）；
   - `bytes`：字节数，用于统计与大小显示；
   - `downloadName`：下载时保存的文件名（可保留中文）；
   - `thumb`：图片缩略图路径（可选）。
3. 若新增的是设计文档，同时更新 `report.html` 附录表与 `index.html` 的 `<noscript>` 回退列表。
4. 首页 Hero 统计与分组跳转数字会自动计算；页脚统计、项目档案数字和 `<noscript>` 文案是静态文本，数据变更时需一并修改。
5. 校验脚本语法与站内链接：

```bash
node --check heads/downloads.js
node --check heads/catalog.js
node --check heads/report.js
```

## 设计说明

- 首页统计（资料数、总体积、照片数、更新日期）由 `catalog.js` 从清单实时计算，不需要手改数字。
- 禁用 JavaScript 时，`index.html` 内的 `<noscript>` 列表仍提供全部下载链接。
- 报告页的公式、表格、SVG 图表、图片与目录高亮均保持原实现；新增的仅是顶部/页脚的返回入口。
- 响应式断点：900 px（概览与指标）、720 px（导航与卡片）、480 px（小屏）。
- 支持 `prefers-reduced-motion`；报告页保留打印样式。
- 默认通过 `X-Frame-Options: SAMEORIGIN` 与 CSP 的 `frame-ancestors 'self'` 限制为同源嵌入。如需被第三方页面 iframe 嵌入，删除 `_headers` 中这两项即可。

## 与 webdir 的关系

内容取自原 `webdir/` 项目，但已按 Pages 重新打包：

- 移除了 `wrangler.jsonc`、`.assetsignore`、`.apps-builder/` 与 `history/`（历史快照不参与部署）；
- 首页从原单页报告中抽出概览、关键结果与资料目录，改为下载站结构；
- 完整报告保留在 `report.html`，内容未删减；
- PDF 从中文路径改为 ASCII 路径，下载名仍为中文；
- 新增 `_headers`、`_redirects`、`404.html`、`robots.txt` 与 Pages 部署说明。

旧地址 `/three-phase-energy-metering.html` 仍可通过 `_redirects` 访问首页。

## 内容与版权

- 设计报告、材料册与答辩稿中的作者、指导教师信息已隐去；页面 byline 保留负责人/指导老师姓名，如需匿名可删除 `index.html` 的 `.hero-byline` 与 `report.html` 的 `.byline`。
- 引用文献全文版权归原作者与出版单位所有，本站仅用于评审与答辩查阅，不应作为公开再分发资源。
- 页面不收集访问信息，不加载第三方统计、字体或脚本。
