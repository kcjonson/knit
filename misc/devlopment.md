


Development Setup

Get up and running
1) install with `brew install mysql`
2) start as service with `brew services start mysql`. This changes some other stuff, I was actually unsuccessful at getting it to run as not a service. This is handy anyway.
3) log in with `mysql -u root` By default the root user doesn't have a password, but access from anything but localhost is turned off. The software assumes this when in dev mode.

Get DB ready for knit
1) log in
2) create the `knitautomation` db with `CREATE DATABASE knitautomation;` then `exit`;
3) apply the schema with `mysql -u root knitautomation < schema.sql` when in this direcory

Install yarn
0) see if its 1.1.0 or above
1) `brew install yarn --without-node`

Set the node version
1) make sure n is installed, if not, install it
2) check the node version, make sure its latest (8.4.0 or more recent)
3) `n 8.4.0`;

Install dependencies
1) `npm install`

Start the server
1) `npm run dev`
