const notFound = (req, res, next) => {
  const error = new Error(`Page Not found - ${req.originalUrl}`);
  error.status = 404;

  // Create a custom HTML response for 404 errors
  res.status(404).send(`
    <section style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h1 style="color: #FF5722;">404 - Not Found</h1>
      <h3 style="color: #FF9800;">Oops!</h3>
      <p style="font-size: 1.2em;">Looks like the elves are on vacation and couldn't find this page:</p>
      <p style="font-size: 1.2em;">${req.method} ${req.originalUrl}</p>
      <div style="margin-top: 20px;">
        <p style="font-size: 1.5em; font-weight: bold;">Don't worry, they're known for their sense of humor!</p>
        <p style="font-size: 1.2em;">🧝‍♂️✨🌲</p>
      </div>
      <footer style="margin-top: 30px; font-size: 0.8em; color: #9E9E9E;">
        <p>Perhaps try a different path through the enchanted forest?</p>
        <p>Keep exploring, adventurer! 🗺️</p>
      </footer>
    </section>
  `);

  next(error); // Pass the error to the next middleware
};

export default notFound;
