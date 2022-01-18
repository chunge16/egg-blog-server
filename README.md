# egg-blog-server



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


### 后端接口规范


约定接口一般包括以下数据
1. 当前接口的路径是什么？ 如 `/auth/register`
2. 当前接口提交数据的类型是什么? 如
-  `GET` 获取数据
- `POST` 提交或者创建
- `PATCH` 修改数据，部分修改
- `DELETE` 删除数据
- `PUT` 修改数据，整体替换原有数据
3. 参数类型/格式，比如是 json 格式，还是 `application/x-www-form-urlencoded`的数据
4. 参数字段，及限制条件
5. 返回成功的数据格式
6. 返回失败的数据格式


[egg]: https://eggjs.org
