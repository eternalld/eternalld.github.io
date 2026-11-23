# Haoxin Lyu

个人学术主页，版式来自 [Minimal Light](https://github.com/yaoyao-liu/minimal-light)（commit `3786d5d480d2cfb1e384ae83bf43752998d78f80`，CC0）。主题说明保留在页面底部。

已发布的身份是名字 Haoxin Lyu、GitHub [eternalld](https://github.com/eternalld)，以及侧边栏里的 Google Scholar 链接。没有核实过的单位、职位、学历或邮箱都不会写上。没有条目的栏目不会出现。

## 编辑内容

改这些文件，然后把 `main` 上的变更交给 GitHub Pages 构建：

- `_config.yml`：名字、单位、职位、简介、头像、GitHub 和 Scholar 链接。不需要的项删掉整行。`pageviews: false` 会关掉访问次数。
- `_data/interests.yml`：研究或个人兴趣。推断出的题目不要写进来，除非本人确认。
- `_data/news.yml`：近况。空着就不显示。
- `_data/publications.yml`：论文。没有核实过的 PDF、代码或图就不要加链接。
- `_data/projects.yml`：项目或工程探索。
- `_data/curriculum.yml`：标题必须是 `履历表`。这里留给以后的教育和工作经历。`items` 为空时，页面不显示这一栏，也不会出现示例职位。

带字段说明的写法在 `docs/examples/`。那些文件不会被发布。论文来源说明在 `docs/import/`，同样不会发布。

`bio` 可以用 Markdown。头像放在 `assets/img/`，再把路径写到 `avatar`。

## 每日一句

侧边栏在名字下面显示 `每日一句`。语料是 `assets/data/quotes.json` 里的 16 条《论语》，文字按 2026-11-23 从中文维基文库 wikitext 逐字抄录，`sourceLine` 保留整行，`text` 是「」内的原文。

所有访客按 `Asia/Shanghai` 的公历日期看到同一条。序号是该日期的 UTC 日数对 16 取余。打开的页面会在上海时间下一次换日时自己换句子，不需要每天提交，也没有定时任务。引文、作者或 `https` 出处缺失时，这一栏不显示。

## 访问次数

数字是页面浏览次数，不是独立访客人数。服务是不蒜子，脚本固定为 `https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js`。2026-11-23 核对的文件是 1939 字节，SHA-384 为 `oaKlriFiEaHzTKw66TKlzwgjYHPT5tvx+uf4JRnAGvP7HCHj5NPqEoAkyyOAPxZN`。该主机不返回 CORS 头，浏览器会因此拒绝带 integrity 的脚本，所以页面记录这个哈希，但不把 integrity 写进标签。页面只显示正整数的全站 `site_pv`，句子是「本站累计访问 N 次」。服务没有返回、超时、返回 0 或非整数时，整栏隐藏，不显示转圈或 0。

计数按浏览器地址里的主机名分开。`eternalld.github.io` 从该服务第一次记录这个主机名开始，不代表更早的访问，也没有人为设定的初始值。在 `127.0.0.1` 上预览会看到很多人共用的本地计数，那不是这个网站的数字。请求发往 `busuanzi.ibruce.info`，对方可能收到 IP、页面地址和浏览器信息，并写入 `busuanziId` cookie。页面不再加载其他统计、字体托管或图标托管。

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
- 更换前的封面页、`i.dmego.cn` 的 CNAME、旧图标和 Dmego 说明在 `legacy/dmego-homepage/`。这个目录不会发布。GitHub Pages 当前没有绑定自定义域名，CNAME 留在网站根目录会指向别人的域名，所以不放回去。

## 许可

- 本仓库原有代码仍见 `LICENSE`（MIT）。
- Minimal Light 的 CC0 全文在 `licenses/CC0-1.0.txt`。
- Crimson Pro 字体为 SIL Open Font License，文件在 `assets/fonts/`，版本 `@fontsource/crimson-pro` 5.3.0。
- GitHub 图标路径来自 [Octicons](https://github.com/primer/octicons)（MIT）。
