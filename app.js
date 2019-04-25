var express = require('express');
var session = require('cookie-session'); // Chargement du middleware de session
var bodyParser = require('body-parser'); // Chargement du middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended : false });

var app = express();

app.use(session({secret : 'doboardsecret'})) // Utilisation des sessions

app.get('/', function(req, res) {
    res.end('Bienvenue');
})

/* En absence de todolist dans la session, on crée une vide sous la forme d'array avant la suite */
.use(function(req, res, next) {
    if(typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* Affichage du todolist et du formulaire */
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist : req.session.todolist});
})

/* Ajout d'un élément à la todolist */
.post('/todo/ajouter', urlencodedParser, function(req, res) {
    if(req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Suppression d'un élémnent de ma todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirection vers la todolist si la page demandée n'est pas trouvé */
.use(function(req, res) {
    res.redirect('/todo');
})

.listen(8080);