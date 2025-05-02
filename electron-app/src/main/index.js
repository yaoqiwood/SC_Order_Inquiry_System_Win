import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const Store = require('electron-store')
const store = new Store()


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,  // 更适合登录框的宽度
    height: 700,  // 适当的高度
    minWidth: 400,
    minHeight: 500,
    show: false,
    resizable: false, // 禁止调整窗口大小,
    autoHideMenuBar: true,
    title: 'SC订单查询系统',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 假设预加载脚本在 src/preload 目录,
      sandbox: false,  // 启用沙盒模式
      webSecurity: true,  // 启用web安全
      nodeIntegration: false,  // 禁用Node集成
      contextIsolation: true  // 启用上下文隔离
    }
  })


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Add these IPC handlers before app.whenReady()
ipcMain.handle('electron-store-get-data', (event, key) => {
  return store.get(key)
})

ipcMain.on('electron-store-set-data', (event, { key, value }) => {
  store.set(key, value)
})

ipcMain.on('electron-store-delete-data', (event, key) => {
  store.delete(key)
})

ipcMain.on('resize-window', (event, { width, height }) => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.setSize(width, height)
    win.center() // 可选：调整后居中窗口
  }
})

