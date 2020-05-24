module.exports = (req, res) => {
  return res.render('agreement/policy', {
    page: 'agreement/policy',
    title: 'Terms of Use',
    includes: {
      external: ['css']
    }
  });
  
}
