const fs = require('fs');
const path = require('path');

module.exports = (heartbank, app) => {

  app.get('/recurrences', (req, res, next) => {
    heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get()
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('recurrences', {query:req.query,recurrences:data.recurrences});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/recurrences/transaction', (req, res, next) => {
    heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({command:req.body.command, to:req.body.to, amount:req.body.amount, currency:req.body.currency, anonymity:req.body.anonymity === 'on', description:req.body.description, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
        res.redirect('/recurrences');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/recurrences/message', (req, res, next) => {
    heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({message:req.body.message, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
        res.redirect('/recurrences');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.delete('/recurrences/:recurrence_id', (req, res, next) => {
    heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).delete({recurrence_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('recurrences', {query:req.query,recurrences:data.recurrences});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
