import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../layout/Layout";
import Home from "./home/Home";
import Contact from "./contact/Contact";
import Products from './products/Products';
import NotFound from "./notFound/NotFound";

const AppRoute = () => {
    
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Layout  component={Home} />} />
                    <Route path="/contato" element={<Layout  component={Contact} />} />
                    <Route path="/produtos" element={<Layout  component={Products} />} />
                    <Route path="*" element={<Layout  component={NotFound} />} />
                </Routes>
            </Router>
        )
}

export default AppRoute