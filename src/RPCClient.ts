import Message, { CLIENT_TYPE } from "./Message"
export default class RPCClient {
  server: Window
  static callbackMap = new Map()
  static isListener = false
  constructor(server: Window) {
    this.server = server
    if (!RPCClient.isListener) {
      window.addEventListener('message', RPCClient.onMessage, false)
      RPCClient.isListener = true
    }
    return new Proxy(this, {
      get(target, key) {
        return target.run.bind(target, String(key))
      }
    })
  }
  static onMessage(event: any) {
    // 检测来源
    const {
      data: message = {}
    } = event
    if (!Message.isServerRPC(message)) {
      return
    }
    if (RPCClient.callbackMap.has(message.id)) {
      const callback = RPCClient.callbackMap.get(message.id)
      callback[message.status](message.data)
    }
  }
  send(method: string, params: any) {
    const id = Message.generateId()
    this.server.postMessage({
      type: CLIENT_TYPE,
      id,
      method,
      params
    }, '*')
    return id
  }
  resolve(id: string, result: any) {
    RPCClient.callbackMap.get(id).resolve(result)
  }
  reject(id: string, error: any) {
    RPCClient.callbackMap.get(id).reject(error)
  }
  static destroyAll() {
    RPCClient.callbackMap.clear()
    RPCClient.isListener = false
    window.removeEventListener('message', RPCClient.onMessage, false)
  }
  run(method: string, ...params: any[]) {
    return new Promise((resolve, reject) => {
      const id = this.send(method, params)
      RPCClient.callbackMap.set(id, {
        resolve,
        reject,
        context: this
      })
    })
  }
}

