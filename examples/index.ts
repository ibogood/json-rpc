import RPCServer from '../../json-rpc/src/RPCServer'
import RPCClient from '../../json-rpc/src/RPCClient'
const url = new URL(location.href)
const method = url.searchParams.get('method') || 'server'
const handler = {
  async server() {
    RPCServer.export({
      async foo(id: number){
        console.log('foo call', id)
        const b = 'await b:'
        return (await b) + id + 2
      },
      bar(name: string, id: string) {
        console.log('bar call', name, id)
        return name + id + 'bar call'
      }
    }).listen()
    const client = (document.getElementById('iframe') as HTMLIFrameElement).contentWindow
    if (client) {
      const rpcClient = new RPCClient(client) as any
      setTimeout(async () => {
        const xx = await rpcClient.foo2(1)
        console.log('xx', xx)
      }, 5000)
    }

    
  },
  async client() {
    RPCServer.export({
      foo2(id: number){
        console.log('foo2222 call', id)
        return id + 2
      },
      bar(name: string, id: string) {
        console.log('bar call', name, id)
        return name + id + 'bar call'
      }
    }).listen()
    const rpcClient = new RPCClient(parent) as any
    const r1 = await rpcClient.foo(1)
    console.log(r1)
    const r2 = await rpcClient.bar('xxx', 'yyy')
    console.log(r2)
    const button = document.querySelector('#button') as HTMLButtonElement
    if (button) {
      button.addEventListener('click', () => {
        console.log(rpcClient.foo(3))
      })
    }
  }
}
if (method === 'server') {
  handler.server()
}  else {
  handler.client()
}
