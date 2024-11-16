import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/Store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    // children: [
    //   {
    //     path: "smallprojects",
    //     element: <SmallProj/>
    //   },
    //   {
    //     path: "largeprojects",
    //     element: <Deployed/>
    //   },
    // ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={Router}/>
      </Provider>
  </StrictMode>,
)
