import { SigninPage } from "./pages/signin-page";
import { Showcase } from "./components/ui/showcase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignupPage } from "./pages/signup-page";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/auth-context";
import { PrivatePage } from "./pages/private-page";
import { ProtectRoutes } from "./components/auth/protected-routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SigninPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/secret",
    element: (
      <ProtectRoutes>
        <PrivatePage />
      </ProtectRoutes>
    )
  }
])

const App = () => {
  return (
    <div className="h-screen w-full flex">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Showcase />
      <Toaster richColors expand />
    </div>
  )
}
export default App;