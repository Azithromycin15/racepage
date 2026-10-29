# 基于 ARM 的三相电能计量系统设计 · 资料站

面向 **Cloudflare Pages** 的纯静态站点。首页是项目概览与资料下载中心，`tpems-report.html` 是完整项目设计报告。

- 无构建步骤、无框架、无外部字体或脚本请求
- 首页按 [DownloadPageFileRepo](https://github.com/Azithromycin15/DownloadPageFileRepo) 的「Hero + 统计 + 分组下载卡片 + 页脚」格式重排
- 报告页保留原有阅读版式，补充返回资料首页与下载入口
- 资料通过本地 `heads/downloads.js` 清单渲染，不依赖 OBS、API 或任何后端

## 目录结构

```
.
├── index.html              # 资料首页：概览、关键结果、下载目录
├── tpems-report.html       # 完整项目设计报告（Pages 的 clean URL 通常为 /tpems-report）
├── favicon.ico             # 16/32/48/64/128/256 六尺寸 ICO（根目录约定）
├── 404.html                # Cloudflare Pages 自定义 404
├── _headers                # 安全响应头与缓存策略
├── _redirects              # 旧地址 301
├── robots.txt
├── shaders/
│   ├── style.css           # 首页样式
│   └── report.css          # 报告页样式
├── heads/
│   ├── downloads.js        # 项目报告与实测照片清单
│   ├── catalog.js          # 首页卡片渲染器
│   └── report.js           # 报告页目录高亮与返回顶部
└── assets/
    ├── favicon.svg         # 矢量图标（与 ICO 同款三相波形）
    ├── apple-touch-icon.png # 180×180 不透明 Apple Touch Icon
    ├── files/
    │   └── design-report.pdf # 项目设计报告 PDF（18 页）
    └── img/                # 12 张照片（11 张对外下载 + 1 张展示裁切）
        └── thumbs/         # 首页卡片用的 160×160 缩略图
```

`assets/files/design-report.pdf` 由报告页按打印样式生成，下载时使用中文名 `项目设计报告.pdf`。PDF 使用 ASCII 路径，避免中文 URL 在 Pages 上出现百分号编码或重定向问题。

## 本地预览

在本目录执行：

```bash
python3 -m http.server 8080
```

打开 <http://localhost:8080/>。请通过 HTTP 预览，不要直接双击 `index.html`：`file://` 下浏览器会限制部分脚本行为。

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐）

1. 将本目录作为仓库根目录推到 GitHub / GitLab；如果仓库还包含其它目录，请在 Pages 项目里把 **Root directory** 设为 `cloudflare-pages`，或只推送本目录。
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

Direct Upload 建议排除 `.git/`；Git 集成不会上传仓库元数据。

注意：本项目是 **Pages**，不要使用 `npx wrangler deploy`（那是 Workers 的部署命令），也不需要 `wrangler.jsonc`。

### 平台能力

- `_headers` 设置 CSP、`X-Content-Type-Options`、`Referrer-Policy`、权限策略与缓存；HTML 不缓存，`/assets/*` 缓存 7 天。
- `_redirects` 把旧 Workers 地址 `/three-phase-energy-metering(.html)` 301 到首页；把旧报告地址 `/report`、`/report.html`、`/report/` 301 到 `/tpems-report`；并把 `/index.html` 归一到 `/`。
- `404.html` 由 Pages 自动接管未知路径。
- 当前共 12 个下载文件（1 份项目设计报告 + 11 张实测照片），下载资料约 5.2 MB；最大单文件约 3.42 MB，低于 Pages 的 **25 MiB/文件** 与 **20,000 文件** 限制。

## 更新资料

1. 把新文件放入 `assets/files/`（建议 ASCII 文件名）或 `assets/img/`。
2. 编辑 `heads/downloads.js`，在对应分组追加条目：
   - `title` / `desc`：卡片标题与说明；
   - `file`：下载文件名（展示用）；
   - `url`：站内相对路径；
   - `kind`：`PDF` / `JPG`；
   - `pages`：PDF 页数（可选）；
   - `bytes`：字节数，用于统计与大小显示；
   - `downloadName`：下载时保存的文件名；
   - `thumb`：图片缩略图路径（可选）。
3. 首页 Hero 统计、分组跳转数字和卡片数量由脚本计算；页脚统计、项目档案数字和 `<noscript>` 文案是静态文本，数据变更时需一并修改。
4. 校验脚本语法与站内链接：

```bash
node --check heads/downloads.js
node --check heads/catalog.js
node --check heads/report.js
```

## 设计说明

- 首页统计（资料数、总体积、照片数、更新日期）由 `catalog.js` 从清单实时计算，不需要手改数字。
- 禁用 JavaScript 时，`index.html` 内的 `<noscript>` 列表仍提供全部下载链接。
- 报告页的公式、表格、SVG 图表、图片与目录高亮保持原实现；新增的是顶部/页脚的返回入口。
- 响应式断点：900 px（概览与指标）、720 px（导航与卡片）、480 px（小屏）。
- 支持 `prefers-reduced-motion`；报告页保留打印样式。
- 图标统一为「深色圆角底 + 三相波形」：`favicon.svg` 是矢量版，`favicon.ico` 内含 16/32/48/64/128/256 六种尺寸，`apple-touch-icon.png` 为不透明 180×180 版本。
- 项目设计报告 PDF 由 `tpems-report.html` 的打印样式生成（当前 18 页）；更新正文后可重新打印并覆盖 `assets/files/design-report.pdf`。

## 与 webdir 的关系

内容取自原 `webdir/` 项目，但已按 Pages 重新打包：

- 移除了 `wrangler.jsonc`、`.assetsignore`、`.apps-builder/` 与 `history/`（历史快照不参与部署）；
- 首页从原单页报告中抽出概览、关键结果与资料目录，改为下载站结构；
- 完整报告保留在 `tpems-report.html`，正文、图表与参考文献保留；附录改为资料说明；
- 原 `report.html` 更名为 `tpems-report.html`，旧地址由 `_redirects` 301 到新地址；
- 下载区只保留一份项目设计报告与实测照片，不再部署其它文档；
- 新增 `_headers`、`_redirects`、`404.html`、`robots.txt` 与 Pages 部署说明。

旧地址 `/three-phase-energy-metering.html` 仍可通过 `_redirects` 访问首页；旧报告地址 `/report`、`/report.html` 也会 301 到 `/tpems-report`。

## 内容与版权

- 页面只保留项目技术内容；引用文献按原文著录，版权归原出版方所有。
- 报告与照片用于项目展示与技术交流，不收集访问信息，不加载第三方统计、字体或脚本。
- 如需移除某张照片或替换报告，删除对应文件并同步更新 `heads/downloads.js` 与首页静态计数即可。
