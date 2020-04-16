module.exports = (req, res) => {
  return res.render('admin/index', {
    page: 'admin/index',
    title: 'Admin Sayfası',
    includes: {
      external: ['js', 'css', 'fontawesome', 'socket.io']
    }
  });
}
