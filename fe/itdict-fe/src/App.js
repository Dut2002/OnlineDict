import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/App.css';
import './css/common.css'
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import ForgotPassword from './forgot-password/ForgotPassword';
import ResetPassword from './re-password/ResetPassword';
import ForAdmin from './for-admin/ForAdmin';
import SearchResult from './search-result/SearchResult';
import UpdateProfile from './update-profile/UpdateProfile';
import MyDictionary from './my-dictionary/MyDictionary';
import AddWord from './word/add/AddWord';
import UpdateWord from './word/update/UpdateWord';
import CreateDictionary from './my-dictionary/create/CreateDictionary';
import AccessDenied from './common/AccessDenied';
import Contribution from './contribution/Contribution';
import DictionaryDetail from './my-dictionary/dictionary-detail/DictionaryDetail';
import EditWordForDict from './my-dictionary/edit-word/EditWordForDict';
import DictAuthen from './my-dictionary/authentication/DictAuthen';
import AboutUs from './about-us/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot',
    element: <ForgotPassword />
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '/foradmin',
    element: <ForAdmin />
  },
  {
    path: '/search',
    element: <SearchResult />
  },
  {
    path: '/updateProfile',
    element: <UpdateProfile />
  },
  {
    path: '/myDict',
    element: <MyDictionary />
  },
  {
    path: '/addWord',
    element: <AddWord />
  },
  {
    path: '/updateWord',
    element: <UpdateWord />
  },
  {
    path: '/createDict',
    element: <CreateDictionary />
  },
  {
    path: '/accessDenied',
    element: <AccessDenied />
  },
  {
    path: '/contribution',
    element: <Contribution />
  },
  {
    path: '/detail',
    element: <DictionaryDetail />
  },
  {
    path: '/editDict',
    element: <EditWordForDict />
  },
  {
    path: '/dictAuthen',
    element: <DictAuthen/>
  },
  {
    path: '/aboutUs',
    element: <AboutUs/>
  }
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
