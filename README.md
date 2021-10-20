## 使用

具体查看DEMO [点击预览](https://unpkg.com/@js-next/json-rpc@1.1.3/demo/server.html)
### 原生方案
```html
<!-- 注意： 不要在files:// 打开 建议在localhost:// 打开 -->
<!-- server.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <title>server</title>
    <script src="https://unpkg.com/@js-next/json-rpc@1.1.3/dist/json-rpc.umd.min.js"></script>
  </head>
  <body>
    server： 打印请看控制台
    <iframe id="iframe" src="./client.html" width="800" height="600"></iframe>
    <script>
      const { RPCServer } = window.jsonRPC
      RPCServer.export({ // 添加函数，可以提交已有函数
        foo(id){
          console.log('foo call', id)
          return id + 2
        },
        bar(name, id) {
          console.log('bar call', name, id)
          return name + id + 'bar call'
        }
      }).listen()
    </script>
  </body>
</html>
<!-- 客户端-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <title>client</title>
    <script src="https://unpkg.com/@js-next/json-rpc@1.1.3/dist/json-rpc.umd.min.js"></script>
  </head>
  <body>
    client： 打印请看控制台
    <script>
      (async () => {
        const { RPCClient }  = window.jsonRPC
        const rpcClient = new RPCClient(parent)
        const r1 = await rpcClient.foo(1)
        console.log(r1)
        const r2 = await rpcClient.bar('xxx', 'yyy')
        console.log(r2)
      })()
    </script>
  </body>
</html>

```
具体查看DEMO [点击预览](https://unpkg.com/@js-next/json-rpc@1.1.3/demo/server.html)

### npm方式
#### 安装扩展
```shell
npm install -S @js-next/json-rpc
```
#### 代码调用
```javascript
  // server.js
  import { RPCServer } from '@js-next/json-rpc'
  RPCServer.export({ // 添加函数，可以提交已有函数
    foo(id: number){
      console.log('foo call', id)
      return id + 2
    },
    bar(name: string, id: string) {
      console.log('bar call', name, id)
      return name + id + 'bar call'
    }
  }).listen()

  // client.js
  import { RPCClient } from '@js-next/json-rpc'
  const rpcClient = new RPCClient(parent) as any
  const r1 = await rpcClient.foo(1)
  console.log(r1)
  const r2 = await rpcClient.bar('xxx', 'yyy')
  console.log(r2)
  
```
