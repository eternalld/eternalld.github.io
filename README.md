# Haoxin Lyu

个人学术主页，版式来自 [Minimal Light](https://github.com/yaoyao-liu/minimal-light)（commit `3786d5d480d2cfb1e384ae83bf43752998d78f80`，CC0）。主题说明保留在页面底部。阅读栏使用 Nunito，许可见 `assets/fonts/nunito-OFL.txt`。

已发布的身份是名字 Haoxin Lyu、GitHub [eternalld](https://github.com/eternalld)，以及侧边栏里的 Google Scholar 链接。没有核实过的单位、职位、学历或邮箱都不会写上。还没有条目的 News、Blog、Projects、Awards & Honors 和 Experience 会显示 “To be soon”，不会用示例冒充真实内容。

## 编辑内容

改这些文件，然后把 `main` 上的变更交给 GitHub Pages 构建：

- `_config.yml`：名字、单位、职位、简介、头像、GitHub 和 Scholar 链接。不需要的项删掉整行。`pageviews: false` 会关掉访问次数。
- `_data/interests.yml`：只作内部记录，首页不渲染 Research Interests 标题和列表。公开方向是首屏三个标签，以及 `_config.yml` 简介里的研究句。量化交易写在简介最后一句。
- `_data/news.yml`：近况。每条要有 `date`（建议 `2026.09`）和 `text`，`url` 可选。页面按日期从新到旧排在浅色可滚动列表里。没有合格条目时显示 “To be soon”。
- `_data/posts.yml`：博客。字段是 `date`、`title`、`summary`、`url`、`tags`。首页最多预览两条，完整列表在 `/blog.html`。有标签时那里才出现标签筛选。没有文章时两处都显示 “To be soon”，`All posts` 仍指向这个真实页面。原先的 `blog.html` 只有“这是博客。”，没有可复用的文章。
- `_data/publications.yml`：论文。没有核实过的 PDF、代码或图就不要加链接。每条按会议标记、标题、作者、会议信息、资源链接排成一列，不做 Selected/Full 切换，也不加共同一作或通讯标记。
- `_data/projects.yml`：项目。字段是 `title`、`year`、`summary`、`links`（`label` 和 `url`）。文件顺序就是显示顺序，新的放前面。超过 4 条时出现展开/收起。没有条目时显示 “To be soon”，不出现按钮。
- `_data/awards.yml`：奖项。字段是 `year`、`title`、`source`、`source_url`、`scope`。至少两个不同年份时才显示年份按钮。没有条目时显示 “To be soon”。
- `_data/curriculum.yml`：标题是 `Experience`，放在最后。已确认的两条是快手在职和北京理工大学硕士，文案以文件为准。机构标识先不放，因为没有确认可再分发的官方文件。没有条目时显示 “To be soon”。旧地址 `#curriculum` 仍停在这一节，导航里不再单列。GTMS 论文不再放代码仓库链接。
- 顶部是横跨页面的独立栏：左侧名字链回首页，右侧固定为 News、Publications、Experience、Projects、Awards、Blog。Blog 指向 `/blog.html`，其余指向首页对应栏目。侧栏不再重复名字，仍保留访问次数。GitHub 和 Google Scholar 各占一行，图标旁有完整文字。页面不再显示每日一句。页面不再单列 Research Interests 或 Personal Interests。

带字段说明的写法在 `docs/examples/`。那些文件不会被发布。论文来源说明在 `docs/import/`，同样不会发布。

`bio` 可以用 Markdown。首屏欢迎语、两行题目和三个方向标签在 `_data/intro.yml`。页面没有单独的 About Me 标题。原先的履历表现在标题是 Experience。字段示例在 `docs/examples/`，不会发布。

侧栏肖像是 `assets/img/avatar.png`（1024×1365），`_config.yml` 的 `avatar` 指向它。首页和 `/blog.html` 共用这一栏，所以两处是同一张图。容器宽约 184px，按照片原比例用 `object-fit: contain` 显示整张图。圆角来自 PNG 自己的透明角，页面不再加圆形或更大的圆角，以免切掉头脸、伸出的手或相机。没有 `avatar` 这一行时，侧边栏不显示肖像。

配置文件的编辑地址是 https://github.com/eternalld/eternalld.github.io/edit/main/_config.yml 。

## 访问次数

数字是页面浏览次数，不是独立访客人数。服务是不蒜子，脚本固定为 `https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js`。2026-11-23 核对的文件是 1939 字节，SHA-384 为 `oaKlriFiEaHzTKw66TKlzwgjYHPT5tvx+uf4JRnAGvP7HCHj5NPqEoAkyyOAPxZN`。该主机不返回 CORS 头，浏览器会因此拒绝带 integrity 的脚本，所以页面记录这个哈希，但不把 integrity 写进标签。页面只显示正整数的全站 `site_pv`，句子是「本站累计访问 N 次」，侧边栏不放「统计说明」。服务没有返回、超时、返回 0 或非整数时，整栏隐藏，不显示转圈或 0。

计数按浏览器地址里的主机名分开。公开地址是 `https://haoxinlyu.top/`，计数从该服务第一次记录这个主机名开始，不代表更早的访问，也没有人为设定的初始值。在 `127.0.0.1` 上预览会看到很多人共用的本地计数，那不是这个网站的数字。请求发往 `busuanzi.ibruce.info`，对方可能收到 IP、页面地址和浏览器信息，并写入 `busuanziId` cookie。页面不再加载其他统计、字体托管或图标托管。

## 本地检查

依赖锁在 `Gemfile.lock` 的 `github-pages` 232，与 2026-11-23 的 GitHub Pages 版本一致。

```bash
bundle config set --local path vendor/bundle
bundle install
npm test
bundle exec jekyll build
npm run check:site
```

## 仍保留的地址

- `/blog.html` 和 `/resume.html` 仍是原来的占位页，侧边栏不放入口。
- `/404.html` 仍是原来的未找到页面。
- 更换前的封面页、旧的 `i.dmego.cn` CNAME、旧图标和 Dmego 说明在 `legacy/dmego-homepage/`。这个目录不会发布。仓库根目录的 `CNAME` 已是 `haoxinlyu.top`，由 GitHub Pages 设置在提交 `e02196dd` 写入 `main`。公开地址是 `https://haoxinlyu.top/`。`https://www.haoxinlyu.top/` 和 `https://eternalld.github.io/` 会转到这个地址。账号设置里的 Pages 域名所有权验证还没有完成。

## 许可

- 本仓库原有代码仍见 `LICENSE`（MIT）。
- Minimal Light 的 CC0 全文在 `licenses/CC0-1.0.txt`。
- Crimson Pro 字体为 SIL Open Font License，文件在 `assets/fonts/`，版本 `@fontsource/crimson-pro` 5.3.0。
- GitHub 图标路径来自 [Octicons](https://github.com/primer/octicons)（MIT）。
