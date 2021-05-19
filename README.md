# Node-CRUD
CRUD App with Database - Zuri

https://zuri-crud-deploy.herokuapp.com/

https://git.heroku.com/zuri-crud-deploy.git

app.post('/bios') ===> To retrieve new biodata from req body. Then create a new document with Bio.create, where Bio is the name of the model.

app.get('/bios') ===> Fetch all bios using mongoose query methods like find() and findyId()

app.put('/bios/:id) ===> To update a single bio with a specific id usinf finfByIdAndUpdate() method

app.delete('/bios/:id) ===> To delete an existing bio




