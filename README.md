# Dimitri Harding

1. Clone repo
2. Install dependencies `npm install`
3. Create `.env` file in root and add the following variables
```js
ASKUI_WORKSPACE_ID=
ASKUI_TOKEN=
```
4. Run test with `npm run test:jest`

---
This project is dependent on this app
https://xnapper.com/
and it should be focus on the first display

Also, only 1 test is expected to run: 
```
test/xnapper/beautify-screenshot.test.ts -> Xnapper : should detect and hide email with redact option
```

