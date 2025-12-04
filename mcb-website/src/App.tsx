import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import Security from './components/Security';
import Blog from './components/Blog';
import BlogPost1 from './components/BlogPost1';
import BlogPost2 from './components/BlogPost2';
import BlogPost3 from './components/BlogPost3';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/security" element={<Security />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-post-1" element={<BlogPost1 />} />
                <Route path="/blog-post-2" element={<BlogPost2 />} />
                <Route path="/blog-post-3" element={<BlogPost3 />} />
            </Routes>
        </Router>
    );
}

export default App;
