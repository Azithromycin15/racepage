/* ============================================================
 * 三相电能计量系统 · 资料清单（本地静态数据）
 *
 * 页面不请求任何外部接口；catalog.js 读取本文件后渲染卡片。
 * 字段说明：
 *   updated        资料整理日期
 *   groups[]       分组（id / no / title / desc / items）
 *   items[]        下载条目
 *     title        展示标题
 *     desc         说明文字
 *     file         原始文件名（展示用）
 *     url          站内相对路径（ASCII，避免 URL 编码问题）
 *     icon         图标类型：pdf / img / file
 *     kind         文件类型标签：PDF / JPG
 *     pages        PDF 页数（可选）
 *     bytes        字节数（用于统计与大小格式化）
 *     downloadName 下载时保存的文件名（保留中文原名）
 *     thumb        图片缩略图路径（可选）
 * ============================================================ */

window.METERING_DATA = {
    "updated": "2026-10-29",
    "groups": [
        {
            "id": "documents",
            "no": "3.1",
            "title": "设计文档",
            "desc": "设计报告、过程材料与答辩稿",
            "items": [
                {
                    "title": "毕业设计论文",
                    "desc": "系统设计、实现、测试与误差分析的完整报告（第 1–5 章）。",
                    "file": "三相电能计量系统设计-毕业设计论文.pdf",
                    "url": "assets/files/thesis.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 39,
                    "bytes": 1836669,
                    "downloadName": "三相电能计量系统设计-毕业设计论文.pdf"
                },
                {
                    "title": "毕业设计材料册",
                    "desc": "任务书、开题报告、中期检查等过程材料汇编。",
                    "file": "毕业设计材料册.pdf",
                    "url": "assets/files/materials.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 9,
                    "bytes": 459609,
                    "downloadName": "毕业设计材料册.pdf"
                },
                {
                    "title": "答辩逐字稿",
                    "desc": "答辩演示讲稿与问答准备，配合图表逐页展开。",
                    "file": "答辩逐字稿.pdf",
                    "url": "assets/files/defense-script.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 1,
                    "bytes": 188262,
                    "downloadName": "答辩逐字稿.pdf"
                }
            ]
        },
        {
            "id": "references",
            "no": "3.2",
            "title": "参考文献",
            "desc": "引用文献与延伸阅读全文",
            "items": [
                {
                    "title": "基于 ARM 的电能质量检测装置硬件系统设计与实现",
                    "desc": "汶瑞建 · 硬件系统设计 · 延伸阅读",
                    "file": "ref-01-汶瑞建-基于ARM的电能质量检测装置硬件系统设计与实现.pdf",
                    "url": "assets/files/ref-01-wen-ruijian-arm-hardware.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 93,
                    "bytes": 18849727,
                    "downloadName": "ref-01-汶瑞建-基于ARM的电能质量检测装置硬件系统设计与实现.pdf"
                },
                {
                    "title": "基于 ARM 的电能质量监测仪系统软件的设计与实现",
                    "desc": "栾小飞 · 系统软件设计 · 延伸阅读",
                    "file": "ref-02-栾小飞-基于ARM的电能质量监测仪系统软件的设计与实现.pdf",
                    "url": "assets/files/ref-02-luan-xiaofei-arm-software.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 85,
                    "bytes": 10179079,
                    "downloadName": "ref-02-栾小飞-基于ARM的电能质量监测仪系统软件的设计与实现.pdf"
                },
                {
                    "title": "基于 FPGA+ARM 的电能质量分析仪研究与设计",
                    "desc": "李鹏飞 · 北方工业大学, 2023 · 参考文献 [3]",
                    "file": "ref-03-李鹏飞-基于FPGA+ARM的电能质量分析仪研究与设计.pdf",
                    "url": "assets/files/ref-03-li-pengfei-fpga-arm.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 67,
                    "bytes": 4494129,
                    "downloadName": "ref-03-李鹏飞-基于FPGA+ARM的电能质量分析仪研究与设计.pdf"
                },
                {
                    "title": "基于 DSP+ARM 的便携式电能质量分析仪的设计",
                    "desc": "于军, 朱凌云 · 计算机测量与控制, 2015 · 参考文献 [17]",
                    "file": "ref-04-于军-基于DSP+ARM的电能质量分析仪的研究与设计.pdf",
                    "url": "assets/files/ref-04-yu-jun-dsp-arm.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 100,
                    "bytes": 5274812,
                    "downloadName": "ref-04-于军-基于DSP+ARM的电能质量分析仪的研究与设计.pdf"
                },
                {
                    "title": "基于 DSP+CPLD 的电能质量分析仪的研制",
                    "desc": "龚建峰 · 延伸阅读",
                    "file": "ref-05-龚建峰-基于DSP+CPLD的电能质量分析仪的研制.pdf",
                    "url": "assets/files/ref-05-gong-jianfeng-dsp-cpld.pdf",
                    "icon": "pdf",
                    "kind": "PDF",
                    "pages": 69,
                    "bytes": 4244694,
                    "downloadName": "ref-05-龚建峰-基于DSP+CPLD的电能质量分析仪的研制.pdf"
                }
            ]
        },
        {
            "id": "photos",
            "no": "3.3",
            "title": "实测照片",
            "desc": "硬件、波形与测试工况的原始照片",
            "items": [
                {
                    "title": "硬件平台模块划分",
                    "desc": "俯视照片，标注采样调理、抗混叠滤波、电源、ADS8688、STM32 主控与 LCD 六个模块。",
                    "file": "hardware-modules.jpg",
                    "url": "assets/img/hardware-modules.jpg",
                    "thumb": "assets/img/thumbs/hardware-modules.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 160306,
                    "downloadName": "硬件平台模块划分.jpg"
                },
                {
                    "title": "硬件平台整体布局",
                    "desc": "电源、采样电路、主控板与接线的整体布局。",
                    "file": "hardware-overall.jpg",
                    "url": "assets/img/hardware-overall.jpg",
                    "thumb": "assets/img/thumbs/hardware-overall.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 136599,
                    "downloadName": "硬件平台整体布局.jpg"
                },
                {
                    "title": "整机测试环境",
                    "desc": "示波器、信号发生器、功率分析仪与硬件平台同台布置。",
                    "file": "test-env.jpg",
                    "url": "assets/img/test-env.jpg",
                    "thumb": "assets/img/thumbs/test-env.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 222989,
                    "downloadName": "整机测试环境.jpg"
                },
                {
                    "title": "测试接线细节",
                    "desc": "测试接线与负载连接的局部细节。",
                    "file": "test-detail.jpg",
                    "url": "assets/img/test-detail.jpg",
                    "thumb": "assets/img/thumbs/test-detail.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 235767,
                    "downloadName": "测试接线细节.jpg"
                },
                {
                    "title": "采样与调理波形",
                    "desc": "50 Hz、20 Vpp 输入与 0.2 Vpp 输出的正弦波形。",
                    "file": "test-transformer.jpg",
                    "url": "assets/img/test-transformer.jpg",
                    "thumb": "assets/img/thumbs/test-transformer.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 164351,
                    "downloadName": "采样与调理波形.jpg"
                },
                {
                    "title": "滤波器截止特性",
                    "desc": "2.5 kHz 滤波电路输出波形，峰峰值约 99.2 mV。",
                    "file": "test-filter.jpg",
                    "url": "assets/img/test-filter.jpg",
                    "thumb": "assets/img/thumbs/test-filter.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 167343,
                    "downloadName": "滤波器截止特性.jpg"
                },
                {
                    "title": "ADS8688 六通道一致性",
                    "desc": "3.300 V 直流输入下六通道读数约 3300 mV，通道间约 1 mV 差异。",
                    "file": "test-ads8688.jpg",
                    "url": "assets/img/test-ads8688.jpg",
                    "thumb": "assets/img/thumbs/test-ads8688.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 140571,
                    "downloadName": "ADS8688六通道一致性.jpg"
                },
                {
                    "title": "低电流工况（一）",
                    "desc": "LCD 与 PA1000 同屏显示，用于核对电压、电流与功率读数。",
                    "file": "test-low1.jpg",
                    "url": "assets/img/test-low1.jpg",
                    "thumb": "assets/img/thumbs/test-low1.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 103327,
                    "downloadName": "低电流工况一.jpg"
                },
                {
                    "title": "低电流工况（二）",
                    "desc": "低电流工况另一组参数，用于核对谐波与功率读数。",
                    "file": "test-low2.jpg",
                    "url": "assets/img/test-low2.jpg",
                    "thumb": "assets/img/thumbs/test-low2.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 101058,
                    "downloadName": "低电流工况二.jpg"
                },
                {
                    "title": "高电流工况（一）",
                    "desc": "高电流工况下 LCD 与 PA1000 的读数对照。",
                    "file": "test-high1.jpg",
                    "url": "assets/img/test-high1.jpg",
                    "thumb": "assets/img/thumbs/test-high1.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 100231,
                    "downloadName": "高电流工况一.jpg"
                },
                {
                    "title": "高电流工况（二）",
                    "desc": "高电流工况另一组参数，用于核对谐波与功率读数。",
                    "file": "test-high2.jpg",
                    "url": "assets/img/test-high2.jpg",
                    "thumb": "assets/img/thumbs/test-high2.jpg",
                    "icon": "img",
                    "kind": "JPG",
                    "bytes": 100557,
                    "downloadName": "高电流工况二.jpg"
                }
            ]
        }
    ]
};
