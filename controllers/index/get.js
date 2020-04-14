module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Main Page',
    includes: {
      external: ['js', 'css', 'fontawesome', 'socket.io']
    }
  });
}
