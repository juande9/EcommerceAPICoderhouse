const errorHandler = (err, req, res, next) => {
  if (err?.message.includes('not found')) {
    console.error(err.stack);
    return res.status(404).json({ status: 'error', message: err.message });
  }
  else if (err?.name.includes('ZodError')) {
    console.error(err.stack);
    return res.status(400).json({ status: 'error', message: err.issues[0].message});
  }
  else if (err?.message.includes('duplicate')) {
    console.error(err.stack);

    let duplicatedKey = '';
    for (const key in err.keyValue) {
        if (err.keyValue.hasOwnProperty(key)) {
            duplicatedKey = key;
        }
    }
    return res.status(400).json({ status: 'error', message: `Cant create document. Duplicated keys: ${duplicatedKey}`});
  }
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: err.message });
};

export default errorHandler;