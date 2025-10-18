import {
  Home,
  LoginPage,
  NameSpacePage,
  RegisterPage,
  TablePage,
} from '@/pages';
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
        <Route path={ROUTES.NAMESPACE} element={<NameSpacePage />} />
        <Route path={ROUTES.NAMESPACE_TABLE} element={<TablePage />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
