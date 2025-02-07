import React from 'react';

const Mail = () => {
  return (
    <>
      <form action="https://yashshinde4343@gmail.com" method="POST">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Mail;
