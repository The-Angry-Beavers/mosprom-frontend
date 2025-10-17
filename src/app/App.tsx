import { Home } from '@/pages';
import { ROUTES } from '@/shared/config/routes';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.NOT_FOUND} element={<Home />} />
    </Routes>
  );
}

export default App;
