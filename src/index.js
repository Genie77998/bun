import { renderToString } from 'react-dom/server'
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
    return new Response(
      renderToString(<User userName={url.searchParams.get('user') ?? 'Bun'} />),
      {
        headers: {
          "Content-Type": "text/html",
        }
      }
    )
  },
})

