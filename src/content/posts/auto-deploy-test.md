---
title: 自动部署测试
published: 2026-09-04
description: 测试自托管 Runner 自动构建部署是否正常工作
tags: [测试]
category: 随笔
draft: false
---

## 这是一篇自动部署测试帖

如果你能在博客上看到这篇文章，说明自托管 Runner 自动部署流程已经跑通了。

### 部署流程

1. 在 `Mizuki-Content` 仓库推送新内容
2. GitHub Actions 触发，Runner 在腾讯云服务器本地执行
3. 自动拉取最新代码、构建、部署到 nginx
4. 博客网站即时更新

> 不再使用 SCP 远程推送，彻底避免 IP 安全告警问题。

---

*测试时间：2026-09-04*
