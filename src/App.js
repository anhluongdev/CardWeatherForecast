import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './Components/Layout';
import { publicRoutes } from '~/Routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map(function (route, index) {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
