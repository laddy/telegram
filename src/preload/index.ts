import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ipcRenderer: {
        send: (channel: string, data: any) => ipcRenderer.send(channel, data),
        on: (channel: string, func: (...args: any[]) => void) => {
          ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
      }
    })

    // Custom API for the App
    contextBridge.exposeInMainWorld('api', {
      getArticles: () => ipcRenderer.invoke('get-articles'),
      syncTelegramArticles: () => ipcRenderer.invoke('sync-telegram-articles')
    })
  } catch (error) {
    console.error(error)
  }
}
