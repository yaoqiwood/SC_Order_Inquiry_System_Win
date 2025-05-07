const { contextBridge } = require('electron')
const { electronAPI } = require('@electron-toolkit/preload')
const electron = require('electron')
const Store = require('electron-store')

const store = new Store()

// 合并所有API到单个对象
const exposedAPI = {
  ...electronAPI,
  store: {
    get: (key) => store.get(key),
    set: (key, value) => store.set(key, value),
    delete: (key) => store.delete(key)
  },
  resizeWindow: (width, height) => {
    electron.ipcRenderer.send('resize-window', { width, height })
  },
  setWindowResizable: (resizable) => {
    electron.ipcRenderer.send('set-window-resizable', resizable)
  },
  setFullScreenable: (fullScreenable) => {
    electron.ipcRenderer.send('set-full-screenable', fullScreenable)
  }
}

// 单次暴露操作
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', exposedAPI)
  } catch (error) {
    console.error('[preload] API暴露失败:', error)
  }
} else {
  window.electronAPI = exposedAPI
}
