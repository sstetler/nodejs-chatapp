NODEJS-CHATAPP

# Description

This was my first stab at playing with NodeJs.  Was a lot of fun and have to say that NodeJs is very cool.  I mainly wanted to see how easy it was to build the classic chat application.  I utilized the following npm modules and more in the process:

* ejs
* express : For routing
* express-ejs-layouts : Layouts, Views, etc.
* materialize-css : Have to make it look nice and I'm not a CSS guru, but I did try to make it look ok.
* moment
* node-sass-middleware
* socket.io : For the actual chat logic, obviously.

I used the express-generator (if i remember correctly) to scafold the project.  Other than moving the files into a src dir, I didn't do much more refactoring of the folder structure.  If this was a real project, I would organize everything better.  Again, this was just a first time learning experiment that I'm now using as my sandbox for NodeJs...maybe.

## Running

Note that I haven't gotten the watch:browsersync to work correctly.  Not spelling out what pre-reqs there are to install before running (i.e., NodeJs).  After cloning, open in your favorite editor (I like VisualStudio Code) and run:

```bash
npm install
npm run startDev2
```

Browse to [http://localhost:3000/](http://localhost:3000/)

## Credits
I watched a few tutorials and ended up utilizing [https://github.com/bradtraversy/chatcord](https://github.com/bradtraversy/chatcord) as a good starting point for the chat part.

## License
NA