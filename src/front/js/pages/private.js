import React from 'react';
import '../../styles/home.css';

export const Private = () => {
  const isAuthenticated = sessionStorage.getItem('token') !== null;

  return (
    <div className="text-center mt-5">
      {isAuthenticated ? (
        <h1>Hola</h1>
      ) : (
        <h1>Debes hacer log in para ver esta página.</h1>
      )}
    </div>
  );
};