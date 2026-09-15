---
title: PostgreSQL 入门笔记
published: 2026-09-14
description: PostgreSQL 的核心概念与日常使用笔记：安装连接、基础 SQL、索引、事务、备份恢复，以及和 MySQL 的主要差异。
tags: [PostgreSQL, 数据库, 后端]
category: 技术
draft: false
---

记录一些 PostgreSQL 的入门要点，方便以后查阅。

## 为什么选 PostgreSQL

- 严格的类型系统和标准 SQL 兼容性
- 丰富的数据类型：`jsonb`、数组、范围、几何类型
- 强大的索引能力：部分索引、表达式索引、GIN/GiST
- 事务与并发控制实现严谨（MVCC）
- 扩展生态好：PostGIS、pg_trgm、TimescaleDB

## 安装与连接

```bash
# Debian/Ubuntu
sudo apt install postgresql

# 进入交互式终端
sudo -u postgres psql

# 或指定连接参数
psql -h 127.0.0.1 -p 5432 -U myuser -d mydb
```

常用元命令：

```sql
\l          -- 列出数据库
\dt         -- 列出当前库的表
\d table    -- 查看表结构
\du         -- 列出角色
\c dbname   -- 切换数据库
\x          -- 切换展开输出（宽表很有用）
\timing     -- 显示每条语句耗时
\q          -- 退出
```

## 基础 SQL

```sql
CREATE TABLE users (
    id         bigserial PRIMARY KEY,
    email      text NOT NULL UNIQUE,
    nickname   text,
    profile    jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO users (email, nickname)
VALUES ('a@example.com', 'alice')
RETURNING id;

SELECT id, email
FROM users
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC
LIMIT 20;
```

注意 `timestamptz` 与 `timestamp` 的区别：前者带时区语义，绝大多数场景都该用它。

## 索引

```sql
-- 普通 B-tree
CREATE INDEX idx_users_email ON users (email);

-- 表达式索引：支持大小写不敏感查询
CREATE INDEX idx_users_email_lower ON users (lower(email));

-- 部分索引：只索引活跃用户
CREATE INDEX idx_active_users ON users (created_at)
WHERE created_at > '2026-01-01';

-- jsonb 的 GIN 索引
CREATE INDEX idx_users_profile ON users USING gin (profile);
```

用 `EXPLAIN ANALYZE` 验证索引是否真的被用上，不要凭感觉加索引。

## 事务

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

PostgreSQL 默认是 `READ COMMITTED`。需要更强的隔离时可显式指定：

```sql
BEGIN ISOLATION LEVEL REPEATABLE READ;
```

## 备份与恢复

```bash
# 逻辑备份
pg_dump -Fc mydb > mydb.dump

# 恢复
pg_restore -d mydb mydb.dump

# 全库
pg_dumpall > all.sql
```

生产环境还应配置 WAL 归档做时间点恢复（PITR）。

## 与 MySQL 的主要差异

| 维度 | PostgreSQL | MySQL |
|---|---|---|
| 布尔类型 | 原生 `boolean` | `tinyint(1)` |
| 自增 | `bigserial` / `GENERATED` | `AUTO_INCREMENT` |
| 字符串 | `text`（无长度限制） | 需指定长度或用 `TEXT` |
| JSON | `jsonb` 可索引 | `JSON` 较弱 |
| 大小写 | 标识符折叠为小写 | 取决于平台 |
| 事务 DDL | 支持事务内 DDL | 不支持 |

## 小结

入门阶段抓住三件事就够了：**用对类型（尤其 `timestamptz` 和 `jsonb`）**、**用 `EXPLAIN ANALYZE` 验证索引**、**搞清事务隔离级别**。剩下的边用边查。

## 参考

- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [Use The Index, Luke](https://use-the-index-luke.com/) —— 讲索引与查询优化很到位
