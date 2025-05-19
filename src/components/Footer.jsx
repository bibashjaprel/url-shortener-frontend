import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-4  w-full text-center">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} <span className="text-blue-400 font-medium">URL Shortener</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
