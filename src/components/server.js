import User from './user'
export default (props = {}) =>{
  const { userName } = props
  return (
    <html>
      <body>
        <div id="app" style={{ margin: 20 }}>
          <User userName={userName} />
        </div>
      </body>
      <script dangerouslySetInnerHTML={{ __html: `var __INIT_DATA__ = ${JSON.stringify(props)}`}}></script>
      <script src="/dist/main.js"></script>
    </html>
  )
}
