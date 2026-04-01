import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import DummyDashboard from './pages/DummyDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* These are 'Children' of the Layout */}
          <Route index element={<Dashboard />} /> 
          <Route path="finance" element={<Finance />} />
          <Route path="dummyBoard" element={<DummyDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
