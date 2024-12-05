import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/Store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AllPostsPage from './components/AllPostsPage.jsx'
import AddPostPage from './components/AddPostPage.jsx'
import EditPostPage from './components/container/EditPostPage.jsx'
import PostPage from './components/PostPage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import LoginPage from './components/LoginPage.jsx'


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <LoginPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup/>
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPostsPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPostPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPostPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <PostPage/>,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <Provider store={store}>
          <RouterProvider router={Router}/>
      </Provider>
  // </StrictMode>,
)
