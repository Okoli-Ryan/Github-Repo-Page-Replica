const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors')

const app = express();
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

app.use(cors({origin: true}))
const port = process.env.PORT || 4000;

const githubData = {
  token: "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",
  username: "Okoli-Ryan",
};
const body = {
  query: `query {
        user(login: "${githubData["username"]}") {
            name
            bio
            login
            avatarUrl
            repositories(last: 20) {
              nodes {
                name
                updatedAt
                description
                forkCount
                stargazerCount
                primaryLanguage {
                  color
                  name
                }
              }
            }
          }
      }`,
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + githubData.token,
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  body: JSON.stringify(body),
};

(async () => {
  const a = await fetch(`https://api.github.com/graphql`, options);
  const result = await a.json();
  console.log(result);
  app.get("/", (req, res) => {
    // res.send(result.data.user)
    res.send("hi");
  });
})();

app.listen(port, () => console.log("server running at " + port))
