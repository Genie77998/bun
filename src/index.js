import path from 'path'
import { renderToReadableStream } from 'react-dom/server'
import App from './components/server'
import getData from './data'

Bun.serve({
  port: 9090,
  async fetch(req) {
    const url = new URL(req.url)
    
    if (url.pathname.startsWith('/dist')) {
      return new Response(Bun.file(path.join('.', url.pathname)))
    }
    if (req.method.toLocaleLowerCase() == 'post') {
      const body = await req.text()
      return Response.json({
        success: true,
        data: getData(JSON.parse(body)?.userLength ?? 10)
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

