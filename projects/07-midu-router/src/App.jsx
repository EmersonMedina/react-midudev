import "./App.css";
import { Suspense, lazy } from "react";
// import AboutPage from "./pages/About"; //import stático se importa siempre
import { Router } from "./Router";
import { Route } from "./Route";
import Page404 from "./pages/404";
import SearchPage from "./Search";

const LazyHomePage = lazy(() => import("./pages/Home.jsx"));
const LazyAboutPage = lazy(() => import("./pages/About.jsx")); //import dinámico se importa cuando se necesita

const appRoutes = [
  {
    path: "/search/:query",
    component: SearchPage,
  },
  {
    path: "/:lang/about",
    component: LazyAboutPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" component={LazyHomePage} />
          <Route path="/about" component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
