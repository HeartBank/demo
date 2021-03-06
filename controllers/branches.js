module.exports = (heartbank, app) => {

  app.get('/branches', (req, res, next) => {
    heartbank.branches(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('branches', {cookies:req.cookies, branch:data.branch});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/branches', (req, res, next) => {
    heartbank.branches(req.cookies.client_id, req.cookies.auth_token).put({branch_id:req.cookies.branch_id, interest:req.body.interest, rate:req.body.rate})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/branches');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
