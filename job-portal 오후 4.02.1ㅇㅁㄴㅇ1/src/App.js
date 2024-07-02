import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import CustomerService from './CustomerService';
import Amin from './amin';
import Amin2 from './amin2';
import Amin3 from './amin3';
import Amin4 from './amin4';
import Amin5 from './amin5';
import Amin6 from './amin6';
import Amin7 from './amin7';
import Amin8 from './amin8';
import Du from './du';
import WritePost from './WritePost';
import Du2 from './du2';
import Login from './login'; // 파일명 대소문자 주의
import Dea1 from './dea1';
import Dea2 from './dea2';
import Dea3 from './dea3';
import DataComponent from './components/DataComponent';
import JoinUs from './JoinUs';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App1">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/amin" element={<Amin />} />
            <Route path="/amin2" element={<Amin2 />} />
            <Route path="/amin3" element={<Amin3 />} />
            <Route path="/amin4" element={<Amin4 />} />
            <Route path="/amin5" element={<Amin5 />} />
            <Route path="/amin6" element={<Amin6 />} />
            <Route path="/amin7" element={<Amin7 />} />
            <Route path="/amin8" element={<Amin8 />} />
            <Route path="/du" element={<Du />} />
            <Route path="/writepost" element={<ProtectedRoute element={WritePost} />} /> {/* Protected Route */}
            <Route path="/du2" element={<Du2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dea1" element={<Dea1 />} />
            <Route path="/dea2" element={<Dea2 />} />
            <Route path="/dea3" element={<Dea3 />} />
            <Route path="/data" element={<DataComponent />} />
            <Route path="/join-us" element={<JoinUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
