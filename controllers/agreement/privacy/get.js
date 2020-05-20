module.exports = (req, res) => {
  return res.render('agreement/privacy', {
    page: 'agreement/privacy',
    title: 'Privacy Policy',
    includes: {
      external: ['css']
    }
  });
}
