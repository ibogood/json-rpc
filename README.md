## 使用
### 原生方案
```html
<!-- server.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <title>server</title>
    <script src="https://unpkg.com/@js-next/json-rpc@1.0.4/dist/json-rpc.umd.min.js"></script>
  </head>
  <body>
    server
    <iframe id="iframe" src="./client.html" width="800" height="600"></iframe>
    <script>
      // 事例代码  真实代码请放对应server.js
      const { RPCServer } = window.jsonRPC
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
    </script>
  </body>
</html>
<!-- 客户端-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <title>client</title>
    <script src="https://unpkg.com/@js-next/json-rpc@1.0.4/dist/json-rpc.umd.min.js"></script>
  </head>
  <body>
    client
    <script>
      // 事例代码  真实代码请放对应client.js
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
