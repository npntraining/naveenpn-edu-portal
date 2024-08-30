import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TopicDetails from "./pages/TopicDetails";
import ProtectedLayout from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/NotFound";
import Report from "./pages/Report";
import Curriculum from "./pages/Curriculum";
import Welcome from "./pages/Welcome";
import Planner from "./pages/Planner";
import Evaluation from "./pages/Evaluation";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import MyNotes from "./pages/MyNotes";
import QNA from "./pages/QNA";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="planner" element={<Planner />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="notes" element={<MyNotes />} />
            <Route path="qna" element={<QNA />} />
            <Route path="curriculum" element={<Curriculum />}>
              <Route index element={<Welcome />} />
              <Route
                path=":topicId/:subtopicId/:linkId?"
                element={<TopicDetails />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="reports" element={<Report />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
