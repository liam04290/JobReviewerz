import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/companylistpage.css'

const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      _id
      name
      rating
    }
  }
`;

function CompanyListPage() {
  const { loading, error, data } = useQuery(GET_COMPANIES);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout Logic
    navigate('/login');
  };

  const filteredCompanies = data?.companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="company-list-container">
      <h2>Company Reviews</h2>

      <input 
        type="text" 
        placeholder="Search for a company..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />

      <div className="companies-container">
        {loading && <p>Loading companies...</p>}
        {error && <p>Error loading companies: {error.message}</p>}
        {filteredCompanies.map(company => (
          <Link key={company._id} to={`/company/${company._id}`} className="company-card">
            <span>{company.name}</span>
            <span>{company.rating} ⭐</span>
          </Link>
        ))}
      </div>

      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-company" className="add-company-btn">Add Company</Link>
    </div>
  );
}

export default CompanyListPage;
