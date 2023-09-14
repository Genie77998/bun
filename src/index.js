import path from 'path'
import { renderToReadableStream } from 'react-dom/server'
import App from './components/server'

import queryString from 'query-string'

Bun.serve({
  port: 9090,
  async fetch(req) {
    const url = new URL(req.url)
    
    if (url.pathname.startsWith('/public')) {
      return new Response(Bun.file(path.join('.', url.pathname)))
    }
    if (req.method.toLocaleLowerCase() == 'post') {
      const body = await req.text()
      return Response.json({
        success: true,
        body: JSON.parse(body)
      })
    }
    const stream = await renderToReadableStream(<App userName={url.searchParams.get('user') ?? 'Bun'} />)
    return new Response(
      stream,
      {
        headers: {
          "Content-Type": "text/html",
        }
      }
    )
  },
})

