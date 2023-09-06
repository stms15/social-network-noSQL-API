function dateFormat(date) {
  return date.toLocaleString('en-ca', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

module.exports = dateFormat;
