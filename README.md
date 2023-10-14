# Vue 3 + TypeScript + Vite

## 第二章 -> 前端准备章节

1. 搭建 Vite + TS + Vue3.2 的项目
2. Vite 开发环境变量和生产环境变量配置
3. 动态图片管理带来的好处
4. 动态图片管理具体实现
5. Volar 和它的优势
6. ESLint 和常见的 11 个 ESLint 规则
7. Prettier 和 ESLint 结合
8. Vite + TS 项目搭建的 tsconfig.json 中配置

### 安装 dotenv 依赖

dotenv 是一个零依赖的模块，将内存缓存对象上的环境变量列表读取到一个对象中
环境变量配置第一步：拼接环境文件名
位置：vite.config.ts

### 4.vite.config.ts 中的开发环境配置

准备：

1.  访问 koa 路由
2.  Vite 底层 CommonServerOptions 的应用
3.  理解跨域代理访问后端
4.  用 dotenv 加载环境文件的环境变量
    第一步：搞清 defineconfig 底层 ts 层级关系
    第二步：开发环境配置

### 5.生产环境配置。

1. 在 env.production 生产环境文件中添加环境变量
   host\port
2. vite.config.ts 中的生产环境配置
   server:{}

### 7.Prettier 和 ESlint 结合使用

1. Prettier 作用、特点
   - Prettier 按照 ESlint 规则来格式化代码的工具，但 Prettier 有默认规则，也可以定义规则。当规则和 ESlint 规则冲突时，Prettier 会优先使用自己的规则。特点：开箱即用

### 2-8.图片管理-动态管理图片给大中项目带来的 5 大好处

1. 数据表只需要保存一个图片名，存取图片不需要管理图片路径问题
2. 前端从数据表中存取图片，无需考虑图片路径问题
3. 图片路径修改了，无需改代码，可维护性大大提高
4. 组件显示图片更方便
5. 图片可以分类管理。

## 第三章 后端准备-综合深入应用 TS + Koa + Mysql 构建高可维护性，高可拓展性架构

1. 安装 MySql 数据库
2. 关系型数据库和非关系型数据库
3. mysql 登录、新建用户、分配权限
4. mysql 常用的 12 种数据类型
5. mysql 命令状态下数据库、数据表操作
6. 多种 sql 查询
7. 安装 Navicat 工具
8. 搭建 Koa + TS 初始项目和相关依赖
9. Q：说说添加一级路由的好处
10. 路由实现--用户二级路由、路由请求实现
11. TS 应用--解决 ctx 不能智能提示 params 的问题
12. 路由加载--手写路由自动加载【避开 TS 中 requireDirectory 底层坑】
13. 全局异常--搭建 Aop 全局通用异常
14. 响应处理--响应成功和响应失败精简封装
15. 重要细节处理--全局异常和响应关联
16. 日志封装--运用 TS 封装 log4js
17. 数据库配置封装--综合应用 TS 实现 mysql 配置【方法重载+泛型综合】
18. Q：如何实现数据库配置和配置项需要更新
19. 数据库连接--TS 异步封装数据库连接和通用查询方法
20. ORM 框架--用 Sequelize 连接 mysql 和 5 种查询
21. koa 访问数据库服务器高性能优化--sequelize 数据库连接池
22. 连接池应用--koa 使用连接池访问 mysql 和感知连接池的存在
23. sequelize 底层连接池实现原理
24. 分层实现--Dao 层封装 sequelize 实现
25. Q：用 Dao 层封装 addUser 功能
26.
27. 封层实现--用 Service 封装 sequelize 实现
28. sequelize 表关联实现准备--理解 MySql 表外键
29. sequelize 表关联实现准备--理解表关联[一对多，多对一]
30. sequelize 表关联实现准备--MySql 表左外连接、右外连接
31. sequelize 表关联实现--当当书城二级、三级分类级联查询实现
32. sequelize 多表关联局限性--前端需要获取级联数据，但 sequelize 返回结果相差太远
33. 解决 sequelize 多表关联局限性准备
34. 深度应用 TS 泛型+高级类型解决 sequelize 多表关联局限性
35. 深度应用 TS 泛型+高级类型构建前端真正需要的多表级联数据
36. 项目架构再升级--模块化管理项目
37. 装饰器重构路由准备--理解装饰器重构路由给大中项目带来的 3 大优势

### 数据库相关定义理解

1. 数据库定义：
   - 数据库（Database）数据库就是按照特定格式存储数据的文件集合
2. 特点
   - 用户可以对存储的数据将进行增删改查操作
   - 数据库就是文件集合
3. 数据库管理系统(DBMS)
   - 用户与操作系统之间使用和维护数据库的数据管理软件；比如：MySql ,Oracle
4. 数据库分类：
   - 分为关系型数据库和非关系型数据库
   1. 关系型数据库：
      - 关系型数据库时由多张表可连接的表组成的数据库
      - 优点：
        1. 都是使用表结构，格式一致，易于维护
        2. 提供通用成熟额 SQL 语言操作，使用方便
        3. 支持事务，表关联外键，能充分保障数据的安全性，数据的完整性
        4. 数据存储再硬盘中，数据丢失风险低
      - 缺点：
        1. 读写性能比较差，不能满足海量数据的高效率读写，但是可以经过优化提高海量数据查询速度，比如订单表中的按月自动拆分订单，可以较大提高海量数据的查询速度；对于高并发场景，可以分库，建立 mysql 集群
      - Q:分布式和集群的区别
        分布式是指将不同的业务分布到不同的地方；集群是指将几台服务器集中在一起实现同一个业务
   2. 非关系型数据库（NoSql）
      - 优点：
        1. 非关系型数据库存储数据的格式可以是 key-value 对象格式、数组格式、文档形式、图片形式，而关系型数据库则只支持基础类型和少量的集合类型
        2. 速度快、效率高、更适合海量数据访问
        3. 支持分布式处理，一个数据库可以分成多个部分保存再不同的服务器上
      - 缺点：
        1. 非关系型数据库没有 SQL 支持，使用不方便，维护成本高.
        2. 非关系型数据库没有事务处理，没有表关联，所以无法保证数据的完整性和安全性，不适合处理对安全性要求比较高的场景，如银行系统
        3. 功能没有关系型数据库完善

### 4.4 MySQL 登录、新建用户、分配权限

1.  新建用户 admin 密码 123456
    - create user 'admin' identified with mysql_native_password by '123'
2.  再 root 用户(root 有分配权限的权限)下为 admin 分配权限
    - grant all privileges ON _._ TO admin@'%'

### 4.5 MySQL 命令状态下数据库，数据表操作，数据类型，主键

1.  1. 数据库操作。
       - character:指定数据库的数据集，指定数据集的目的是为了避免再数据库中存储的数据出现乱码或者有些字符不支持的情况。
       - collate : 指定字符集的默认校对规则
       - create database IF NOT EXISTS test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    2. 查看数据库/数据表：
       - show databases/tables
    3. 选择数据库
       - use 数据库名
    4. 删除数据库
       drop databases if exists 数据库名
2.  数据表操作
    1. 创建数据表：字段（field）主键--也是一个字段
       - create table userinfo(userid int NOT Null AUTO_INCREMENT,
         username varchar(30) NOT NULL,
         psw varchar(30) NOT NULL,
         address varchar(50) default '未填写',
         valid TINYINT default 1,
         birth DATETIME null,
         PRIMARY KEY (userid)
         );
    2. 修改表名：
       - alter table userinfo rename to myuserinfo;
    3. 修改表字段：
       - alter table <表名> change <旧字段名> <新字段名> <新数据类型>
       - alter table userinfo change psw password varchar(20)
    4. 删除字段：
       - alter table <表名> DROP <字段名>
    5. 删除数据表：
       - DROP TABLE IF EXISTS <表名>
    6. 添加记录：
       - insert into userinfo(username,psw) values('admin','123')

#### 小知识：SQL 的关键字和函数名不区分大小写

### 4.6 分页查询，多种模糊查询，字段追加，update

      4. limit 三种使用方式：
         + 第一种：limit起始位置 记录数
         + 第二种：limit记录数（从第一条记录开始查询）
         + 第三种：limit记录数 offset起始位置
         + 方式1和方式3查询结果相同
      5. 条件查询 where
         and查询，or查询，between查询，in查询，is null查询 模糊查询
         + 模糊查询
         + select * from userinfo ui where ui.username like '王%'

### 3.8 搭建 Koa + TS 初始项目

- 不用第三方框架搭建，从头搭建一个清晰，逐步升级的 Koa + TS 项目

1.  ## 安装依赖
