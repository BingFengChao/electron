const isDev = process.env.NODE_ENV === 'development'

// 错误类型 - notification
export const notify = (name = '主动上报', message = '', metaData = {}) => {
  if (isDev) {
    throw new Error(`${name} - ${message}`)
  } else {
    if ('fundebug' in window) {
      window.fundebug.notify(name, message, { metaData })
    } else {
      // 可能是 fundebug 没来得及初始化，5 秒后再次调用
      setTimeout(() => {
        if ('fundebug' in window) window.fundebug.notify(name, message, { metaData })
      }, 5000)
    }
  }
}

// 错误类型 - caught
export const notifyError = (err, metaData) => {
  if (isDev) {
    throw new Error(err)
  } else {
    if ('fundebug' in window) {
      window.fundebug.notifyError(err, { metaData })
    } else {
      // 可能是 fundebug 没来得及初始化，5 秒后再次调用
      setTimeout(() => {
        if ('fundebug' in window) window.fundebug.notifyError(err, { metaData })
      }, 5000)
    }
  }
}
