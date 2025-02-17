module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://iic-cosyvoice2-0-5b.ms.show/', // 目标API服务器的URL
        changeOrigin: true, // 如果需要改变源，则设置为true
        secure: false, // 如果是https接口，且不希望检查SSL证书，可以设置为false
        ws: true, // 如果需要支持WebSocket，设置为true
      },
    },
  },
}
