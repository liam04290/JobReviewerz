import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './components/Homepage';
import Register from './components/RegisterPage';
import Login from './components/LoginPage';
import Companies from './components/CompanyListPage';
import CompanyDetails from './components/CompanyDetailPage';
import AddCompany from './components/AddCompanyPage';
import Profile from './components/ProfilePage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* Routes */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:companyId" element={<CompanyDetails />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
