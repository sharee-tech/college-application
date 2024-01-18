import React, { useState, useEffect } from "react";

function Home() {
  const authors = ` Sharee Thompson,
                    Sharion Cranston,
                    Andy Haag &
                    Grayson Cummins`;
  return (
    <div>
      <main className="container">
        <div className="bg-light p-5 rounded">
          <h1>College Explorer Platform</h1>
          <p className="lead">
            Welcome to College Explorer! This platform empowers you to
            effortlessly discover and manage your favorite colleges. Start by
            using the search feature to find colleges based on your preferences.
            Save the ones you're interested in, compare them, or even edit with
            personal notes. If you ever encounter any issues or have questions,
            feel free to reach out to our team using the 'Contact Us' form.
            Enjoy exploring your college options!
          </p>
          <a className="btn btn-lg btn-primary" href="/search" role="button">
            Find Colleges Now &raquo;
          </a>
        </div>
      </main>
      <div className="container">
        <div className="bg-light p-5 rounded">
          <footer className="lead">
            <p>Created by: {authors}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
