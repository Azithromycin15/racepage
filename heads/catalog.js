/* ============================================================
 * 三相电能计量系统 · 资料目录渲染器（原生 JS，无依赖）
 *
 * 数据来自 heads/downloads.js 的 window.METERING_DATA。
 * 页面不发起任何网络请求，所有文件都在本站 assets/ 下，
 * 因此可直接部署到 Cloudflare Pages 的静态资源目录。
 * ============================================================ */

(() => {
    "use strict";

    const DATA = window.METERING_DATA;

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function formatSize(bytes) {
        if (!bytes) return "—";
        if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GB`;
        if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
        if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
        return `${bytes} B`;
    }

    function formatTotal(bytes) {
        if (bytes >= 1073741824) return `≈ ${(bytes / 1073741824).toFixed(2)} GB`;
        return `≈ ${(bytes / 1048576).toFixed(1)} MB`;
    }

    function allItems() {
        if (!DATA || !Array.isArray(DATA.groups)) return [];
        return DATA.groups.flatMap((group) =>
            Array.isArray(group.items) ? group.items : []
        );
    }

    function renderStats(container) {
        if (!container) return;

        const items = allItems();
        const totalBytes = items.reduce((sum, item) => sum + (item.bytes || 0), 0);
        const photoCount = items.filter((item) => item.icon === "img").length;

        const stats = [
            [String(items.length), "份资料"],
            [formatTotal(totalBytes), "资源总量"],
            [String(photoCount), "张实测照片"],
            [DATA.updated || "—", "最近整理"],
        ];

        stats.forEach(([value, label]) => {
            const stat = el("div", "stat");
            stat.append(el("strong", null, value), el("span", null, label));
            container.append(stat);
        });
    }

    function buildTag(item) {
        const tag = el("span", "tag");
        const no = el("span", "tag-no", item.kind || "FILE");
        const detail = item.icon === "img"
            ? "图片"
            : item.pages
                ? `${item.pages} 页`
                : "文档";
        tag.append(no, document.createTextNode(` ${detail}`));
        return tag;
    }

    function buildIcon(item) {
        if (item.thumb) {
            const box = el("div", "app-icon thumb");
            box.setAttribute("aria-hidden", "true");
            const img = document.createElement("img");
            img.src = item.thumb;
            img.alt = "";
            img.width = 48;
            img.height = 48;
            img.loading = "eager";
            img.decoding = "async";
            box.append(img);
            return box;
        }

        const box = el("div", `app-icon icon-${item.icon || "file"}`);
        box.setAttribute("aria-hidden", "true");
        box.textContent = (item.kind || "FILE").toUpperCase().slice(0, 3);
        return box;
    }

    function renderCard(item, no) {
        const card = el("article", "card");

        const top = el("div", "card-top");
        const num = el("span", "card-no", no);
        num.setAttribute("aria-hidden", "true");
        top.append(buildIcon(item), num);

        const title = el("h3", "card-title", item.title);
        const desc = el("p", "card-desc", item.desc);

        const file = el("p", "card-file", item.file || "");

        const meta = el("div", "card-meta");
        meta.append(buildTag(item), el("span", "meta-size", formatSize(item.bytes)));

        const link = el("a", "download");
        link.href = item.url;
        if (item.downloadName || item.file) {
            link.download = item.downloadName || item.file;
        }
        link.setAttribute(
            "aria-label",
            `下载 ${item.title}（${item.kind || "文件"}，${formatSize(item.bytes)}）`
        );
        link.append(document.createTextNode(item.icon === "img" ? "保存原图" : "立即下载"));
        const arrow = el("span", "dl-arrow", "↓");
        arrow.setAttribute("aria-hidden", "true");
        link.append(arrow);

        card.append(top, title, desc, file, meta, link);
        return card;
    }

    function renderGroup(group, counter) {
        const section = el("section", "group");
        section.id = group.id;

        const head = el("header", "group-head");
        const no = el("span", "group-no", group.no);
        no.setAttribute("aria-hidden", "true");

        const headText = el("div", "group-head-text");
        headText.append(el("h2", null, group.title), el("p", null, group.desc));

        const count = el("span", "group-count", `${group.items.length} 份`);
        head.append(no, headText, count);

        const cards = el("div", "cards");
        group.items.forEach((item) => {
            counter.count += 1;
            cards.append(renderCard(item, String(counter.count).padStart(2, "0")));
        });

        section.append(head, cards);
        return section;
    }

    function render() {
        const catalog = document.getElementById("catalog");
        const stats = document.getElementById("hero-stats");
        if (!catalog) return;

        if (!DATA || !Array.isArray(DATA.groups) || !DATA.groups.length) {
            catalog.append(
                el("p", "noscript-tip", "资料数据加载失败，请刷新页面重试。")
            );
            return;
        }

        renderStats(stats);

        const counter = { count: 0 };
        DATA.groups.forEach((group) => {
            if (Array.isArray(group.items) && group.items.length) {
                catalog.append(renderGroup(group, counter));

                const badge = document.querySelector(
                    `[data-count="${group.id}"]`
                );
                if (badge) badge.textContent = String(group.items.length);
            }
        });

        const items = allItems();
        const totalBytes = items.reduce((sum, item) => sum + (item.bytes || 0), 0);
        catalog.append(
            el(
                "p",
                "data-source",
                `共 ${items.length} 份资料 · ${formatTotal(totalBytes)} · 本地静态清单，无外部请求`
            )
        );
    }

    render();
})();
