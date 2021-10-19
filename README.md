## 安装扩展
```shell
npm install -S xyt-json-rpc
```

## 使用
### 服务端
```html
<!-- server.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <title>server</title>
  </head>
  <body>
    server
    <iframe id="iframe" src="yourpath/client.html?method=client" width="800" height="600"></iframe>
    <script>
      // 事例代码  真实代码请放对应server.js
      import { RPCServer } from 'xyt-json-rpc'
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
  </head>
  <body>
    client
    <script>
      import { RPCClient } from 'xyt-json-rpc'
      const rpcClient = new RPCClient(parent) as any
      const r1 = await rpcClient.foo(1)
      console.log(r1)
      const r2 = await rpcClient.bar('xxx', 'yyy')
      console.log(r2)
    </script>
  </body>
</html>
```
