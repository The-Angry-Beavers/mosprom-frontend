import { Home, Login, Register } from '@/pages';
import { ROUTES } from '@/shared/config/routes';
import { Layout } from '@/shared/ui';
import { Sidebar } from '@/widgets/sidebar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route element={<Layout sidebar={<Sidebar />} />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.NOT_FOUND} element={<Home />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  );
}

export default App;
