import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    user(userId: $userId) {
      name
      email
      companies {
        _id
        name
        description
      }
      reviews {
        _id
        reviewText
        rating
        company {
          name
        }
      }
    }
  }
`;


function UserProfilePage() {
  const userId = "your-logged-in-user-id"; // Get this from your context or state manager

  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, email, companies, reviews } = data.user;

  return (
    <div className="profile-container">
      <h2>{name}'s Profile</h2>
      <p>Email: {email}</p>

      <section>
        <h3>Companies Posted</h3>
        {companies.map((company) => (
          <div key={company._id}>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            {/* Add Edit and Delete buttons for company */}
          </div>
        ))}
      </section>

      <section>
        <h3>Reviews Posted</h3>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>
              {review.reviewText} - {review.rating} ⭐ on {review.company.name}
            </p>
            {/* Add Edit and Delete buttons for review */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserProfilePage;
