const path = require('path');
const express = require('express');
const fs = require("fs");
const { request } = require('undici');
const cookieParser = require('cookie-parser');

// -------------- Express -----------------
module.exports = {
    register
};

function register(client) {
    const app = express();

    app.use(cookieParser());
    app.use(require('body-parser').urlencoded());

    app.get('/', function (req, res) {
        return res.render('../Site/index');
    });

    app.set('view engine', 'ejs');

    const indexFiles = fs.readdirSync('Site/');
    for (const file of indexFiles) {
        if (!fs.lstatSync(`Site/${file}`).isDirectory()) {
            app.get(`/${file.replace(".ejs", "")}`, function (err, req, res) {
                if (err) {
                    console.log("Error : " + `/${file.replace(".ejs", "")}` + " : " + err.stack);
                    return res.redirect("/404");

                }
                return res.render(`../Site/${file}`);
            });
        }
    }

    const cssFiles = fs.readdirSync('Site/css/');
    for (const file of cssFiles) {
        app.get(`/css/${file}`, function (err, req, res) {
            if (err) {
                console.log("Error : " + `/css/${file.replace(".ejs", "")}` + " : " + err.stack);
                return res.redirect("/404");

            }
            return res.sendFile(path.join(__dirname, `../Site/css/${file}`));
        });
    }

    const imagesFiles = fs.readdirSync('Site/images/');
    for (const file of imagesFiles) {
        app.get(`/images/${file}`, function (err, req, res) {
            if (err) {
                console.log("Error : " + `/images/${file.replace(".ejs", "")}` + " : " + err.stack);
                return res.redirect("/404");

            }
            return res.sendFile(path.join(__dirname, `../Site/images/${file}`));
        });
    }

    const jsFiles = fs.readdirSync('Site/js/');
    for (const file of jsFiles) {
        app.get(`/js/${file}`, function (err, req, res) {
            if (err) {
                console.log("Error : " + `/js/${file.replace(".ejs", "")}` + " : " + err.stack);
                return res.redirect("/404");

            }
            return res.sendFile(path.join(__dirname, `../Site/js/${file}`));
        });
    }

    const projetsFiles = fs.readdirSync('Site/projects/');
    for (const file of projetsFiles) {
        app.get(`/projects/${file.replace(".ejs", "")}`, function (err, req, res) {
            if (err) {
                console.log("Error : " + `/projects/${file.replace(".ejs", "")}` + " : " + err.stack);
                return res.redirect("/404");

            }
            return res.render(`../Site/projects/${file}`);
        });
    }


    const postsFiles = fs.readdirSync('Site/posts/');
    for (const file of postsFiles) {
        app.get(`/posts/${file.replace(".ejs", "")}`, function (err, req, res) {
            if (err) {
                console.log("Error : " + `/posts/${file.replace(".ejs", "")}` + " : " + err.stack);
                return res.redirect("/404");

            }
            return res.render(`../Site/posts/${file}`);
        });
    }

    /*const lolFiles = fs.readdirSync('Site/lol/');
    for (const file of lolFiles) {
        app.get(`/lol/${file.replace(".ejs", "")}`, function (req, res) {
            res.render(`../Site/lol/${file}`);
        });
    }*/

    app.get("/lol/register", function (err, req, res) {
        if (err) {
            console.log("Error : /lol/register/ : " + err.stack);
            return res.redirect("/404");

        }
        if (!req.cookies['token']) {
            return res.redirect("/lol/profile");
        }
        console.log("/lol/register", req.cookies['token']);
        request('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + req.cookies['token']
            }
        }).then(tokenResponseData => {
            tokenResponseData.body.json().then(data => {
                client.pg.query('SELECT * FROM summoners WHERE discordid = $1', [data.id], (err, result) => {
                    if (err) {
                        return res.redirect("/404");
                    }
                    if (result.rows.length === 0) {
                        return res.render("../Site/lol/register", { username: data.username, discordid: data.id });
                    }
                    return res.redirect("/lol/profile");
                });
            });
        });
    });

    app.post("/lol/register", function (err, req, res) {
        if (err) {
            console.log("Error : (post) /lol/register/ : " + err.stack);
            return res.redirect("/404");

        }
        console.log(req.body);
        if (req.body.username && req.body.discordid) {
            client.pg.query('SELECT * FROM summoners WHERE discordid = $1 AND username = $2', [req.body.discordid, req.body.username], (err, result) => {
                if (err) {
                    console.error(err);
                    res.statusCode(500);
                    return res.render("../Site/lol/index", { text: "Internal server error" });
                }
                if (result.rows.length === 0) {
                    client.commands.get("lol").add_summoner_manual(client, req.body.username, req.body.discordid);
                    return res.redirect("/lol/queue");
                }
                return res.render("../Site/lol/index", { text: "This account is already registered" });
            });
        }
    });

    app.get("/lol/profile", function (err, req, res) {
        if (err) {
            console.log("Error : /lol/profile/ : " + err.stack);
            return res.redirect("/404");

        }
        if (!req.cookies['token']) {
            return res.redirect("/login");
        }
        console.log("/lol/profile", req.cookies['token']);
        request('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + req.cookies['token']
            }
        }).then(tokenResponseData => {
            tokenResponseData.body.json().then(data => {
                client.pg.query('SELECT * FROM summoners WHERE discordid = $1', [data.id], (err, result) => {
                    if (err) {
                        return res.redirect("/404");
                    }
                    if (result.rows.length > 0) {
                        client.pg.query('SELECT * FROM matchs, summoners WHERE player = summoners.puuid AND discordid = $1', [data.id], (err2, result2) => {
                            return res.render('../Site/lol/profile', { summoners: result.rows, username: data.username, discriminator: data.discriminator, avatar: data.avatar, games: result2.rows });
                        });
                    } else {
                        return res.redirect("/lol/register");
                    }
                });
            });
        });
    });

    /*app.get("/lol/summoner", function (req, res) {
        if (req.query.discordid) {
            client.pg.query('SELECT * FROM summoners WHERE discordid = $1', [req.query.discordid], (err, result) => {
                if (err) { throw err; }
                if (result.rows.length > 0) {
                    return res.send(result.rows);
                }
                return res.sendStatus(400);
            });
        }
    });*/

    /*app.get("/lol/summoners", function (req, res) {
        client.pg.query(`SELECT * FROM summoners`, (err, result) => {
            if (err) { throw err; }
            if (result.rows.length > 0) {
                return res.send(result.rows);
            }
            return res.sendStatus(400);
        });
    });*/

    app.get("/lol/matchs", function (err, req, res) {
        if (err) {
            console.log("Error : /lol/matchs/ : " + err.stack);
            return res.redirect("/404");

        }
        console.log("/lol/matchs", req.query);
        if (!req.cookies['token']) {
            return res.sendStatus(403);
        }
        if (!(req.query.timestamp || req.query.champion)) {
            request('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + req.cookies['token']
                }
            }).then(tokenResponseData => {
                tokenResponseData.body.json().then(data => {
                    client.pg.query('SELECT * FROM summoners WHERE discordid = $1', [data.id], (err, result) => {
                        if (err) {
                            return res.sendStatus(403);
                        }
                        if (result.rows.length > 0) {
                            client.pg.query('SELECT matchs.puuid FROM matchs, summoners WHERE matchs.player = summoners.puuid AND discordid = $1 ORDER BY timestamp DESC LIMIT 10;', [data.id], (err2, result2) => {
                                return res.render('../Site/lol/matchs', { username: data.username, discriminator: data.discriminator, avatar: data.avatar, games: result2.rows });
                            });
                        } else {
                            return res.sendStatus(403);
                        }
                    });
                });
            });
        }

    });

    app.get("/admin", function (err, req, res) {
        if (err) {
            console.log("Error : /admin/ : " + err.stack);
            return res.redirect("/404");

        }
        if (!req.cookies['token']) {
            return res.redirect("https://discord.com/api/oauth2/authorize?client_id=559371363035381777&redirect_uri=http%3A%2F%2Falbert.blaisot.org%3A8080%2Flogin&response_type=code&scope=identify");
        }
        console.log(req.cookies['token']);
        request('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + req.cookies['token']
            }
        }).then(tokenResponseData => {
            tokenResponseData.body.json().then(data => {
                if (data.id === client.owners[0]) {
                    //const data = fs.readFileSync('/var/log/syslog', 'utf8');
                    return res.render(`../Site/admin/admin`, { discordclient: client, log: data });
                }
                return res.redirect("/404");
            });
        });
    });

    app.get("/lol/queue", function (err, req, res) {
        if (err) {
            console.log("Error : /lol/queue/ : " + err.stack);
            return res.redirect("/404");

        }
        if (!req.cookies['token']) {
            return res.render('../Site/lol/queue', { jsclient: client, data: undefined });
        }
        console.log("/lol/queue", req.cookies['token']);
        request('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + req.cookies['token']
            }
        }).then(tokenResponseData => {
            tokenResponseData.body.json().then(data => {
                return res.render('../Site/lol/queue', { jsclient: client, data: data });
            });
        });
    });

    app.get("/login", function (err, req, res) {
        if (err) {
            console.log("Error : /login/ : " + err.stack);
            return res.redirect("/404");

        }
        const code = req.query.code;
        if (code) {
            try {
                request('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        client_id: process.env.DISCORD_CLIENT_ID,
                        client_secret: process.env.DISCORD_CLIENT_SECRET,
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: `http://albert.blaisot.org:8080/login`,
                        scope: 'identify',
                    }).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(tokenResponseData => {
                    tokenResponseData.body.json().then(oauthData => {
                        res.cookie("token", oauthData.access_token, { maxAge: oauthData.expires_in * 1000, httpOnly: true });
                        return res.redirect("/lol/profile");
                    });
                });
            } catch (error) {
                console.error(error);
                return res.redirect("/404");
            }
        } else {
            if (!req.cookies['token']) {
                return res.redirect("https://discord.com/api/oauth2/authorize?client_id=559371363035381777&redirect_uri=http%3A%2F%2Falbert.blaisot.org%3A8080%2Flogin&response_type=code&scope=identify");
            }
            console.log(req.cookies['token']);
            return res.redirect("/lol/profile");
        }
    });

    app.get('*', function (req, res) {
        return res.render('../Site/404.ejs');
    });

    app.post('/contact', function (req, res) {
        if (req.body.mail && req.body.text) {
            if (req.body.topic === "Topic :") {
                client.channels.cache.get("1043317491113414728").send(`**${req.body.name}** (${req.body.mail}) ${req.body.tel} : \`\`\`\n${req.body.text}\n\`\`\``);
            } else {
                client.channels.cache.get("1043317491113414728").send(`**${req.body.name}** (${req.body.mail}) ${req.body.tel} ${req.body.topic} : \`\`\`\n${req.body.text}\n\`\`\``);
            }
        }
        return res.redirect("/");
    });

    app.listen(8080, () => {
        console.log("Express server started");
    });
}