import { preview } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const server = await preview({
  preview: {
    port: 4173,
    host: true,
  },
})

server.middlewares.use((req, res, next) => {
  if (!req.url.includes('.') && req.url !== '/') {
    const index = readFileSync(resolve('dist', 'index.html'), 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(index)
  } else {
    next()
  }
})
