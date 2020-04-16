module.exports = (req, res) => {
  return res.render('admin/auth', {
    page: 'admin/auth',
    title: 'Admin Girişi',
    includes: {
      external: ['css', 'fontawesome']
    }
  });
}
