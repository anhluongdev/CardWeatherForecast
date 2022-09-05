// Pages
import Home from '~/Pages/Home';
import SignUp from '~/Pages/SignUp';
import LogIn from '~/Pages/LogIn';
import Info from '~/Pages/Info';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/signup',
        component: SignUp,
    },
    {
        path: '/login',
        component: LogIn,
    },
    {
        path: '/@:info',
        component: Info,
    },
];

export { publicRoutes };
