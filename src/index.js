import { renderToReadableStream } from 'react-dom/server'
import User from './components/user'

import queryString from 'query-string'

Bun.serve({
  port: 9090,
  async fetch(req) {
    const url = new URL(req.url)
    if (req.method.toLocaleLowerCase() == 'post') {
      const body = await req.text()
      return Response.json({
        success: true,
        body: queryString.parse(body)
      })
    }
    const stream = await renderToReadableStream(<User userName={url.searchParams.get('user') ?? 'Bun'} />)
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

