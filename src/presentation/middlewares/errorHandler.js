const errorHandler = (err, req, res, next) => {
  if (err?.message.includes('not found')) {
    console.error(err.stack);
    return res.status(404).json({ status: 'error', message: err.message });
  }
  else if (err?.name.includes('ZodError')) {
    console.error(err.stack);
    return res.status(400).json({ status: 'error', message: err.issues});
  }
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: err.message });
};

export default errorHandler;