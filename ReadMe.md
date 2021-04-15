// Install
> npm install
---
> npm install -g nodemon

// Run
> nodemon index.ts

// Generate secret
> node
---
> require('crypto').randomBytes(64).toString('hex');