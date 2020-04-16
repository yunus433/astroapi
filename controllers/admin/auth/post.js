module.exports = (req, res) => {
  if (!req.body || !req.body.password)
    return res.redirect("/admin");

  if (req.body.password == process.env.ADMIN_PASSWORD)
    req.session.admin = true;
  
  return res.redirect("/admin");
}
