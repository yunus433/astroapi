module.exports = (req, res) => {
  return res.render('agreement/cookie', {
    page: 'agreement/cookie',
    title: 'Privacy Policy',
    includes: {
      external: ['css']
    }
  });
  
}
