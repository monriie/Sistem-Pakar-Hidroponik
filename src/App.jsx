import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Home from '@/pages/Home'
import Quiz from '@/pages/Quiz'
import ResultPage from '@/pages/Result'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App