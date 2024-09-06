import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Hero from "./components/Hero";
import Lang from "./components/lang";
import Navbar from "./components/Navbar";
import Quiz from "./components/quiz";
import { useEffect } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import Example from "./components/Example";
import LeaderBoard from "./components/Leaderboard";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
      case "/quiz":
        title = "";
        metaDescription = "";
        break;
      case "/leader-board":
        title = "";
        metaDescription = "";
        break;
      case "/lang":
        title = "";
        metaDescription = "";
        break;
      case "/navbar":
        title = "";
        metaDescription = "";
        break;
      case "/example":
        title = "";
        metaDescription = "";
        break;
      case "/ai-read":
        title = "";
        metaDescription = "";
        break;
      case "/ai-code":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  

  return (
    <Routes>
      <Route path="/" element={
      <>
      <Navbar />
      <Hero />
      <Lang />
      </> 
    }/>
    <Route path="/quiz" element={<Quiz />} />
    <Route path="/login" element={<Login />} />

    <Route path="/example" element={
      <div className="w-full">
      <Navbar />
      <Example />
      </div>
      } />

      <Route path="/leader-board" element={
      <>
            <Navbar />
            <LeaderBoard />
      </>
      } />
      <Route path="/signup" element={<Signup />} />
      {/* 
      
      <Route path="/ai-read" element={
            <>
            <Navbar />
            <AIRead />
          </>
    } />
    <Route path="/ai-quiz" element={
            <>
            <Navbar />
            <AiQuiz />
          </>
    } />
      <Route path="/ai-code" element={
      <>
        <Navbar />
        <AICode />
      </>

      } /> */}
    </Routes>
  );
}


export default App;