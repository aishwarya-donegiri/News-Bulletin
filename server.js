const express = require("express");
const request = require("request");
const googleTrends = require("google-trends-api");
const app = express();
const port = process.env.PORT || 3001;
app.listen(8081);

const guardian_key = "f184699a-1325-4cd9-858d-40ad79d6ace2";
const nyt_key = "lhhrZJ7LeXFDyMbxsy2YihJmKwKgLxnY";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//filter articles for Guardian
filterGuardian = (data) => {
  //console.log("--------------------------------");

  articles = [];
  count = 0;

  for (i = 0; i < data.length; i++) {
    //console.log(count);
    if (count >= 10) {
      break;
    }
    let dict = {};
    try {
      if (
        data[i].id == "" ||
        data[i].webTitle == "" ||
        data[i].sectionId == "" ||
        data[i].webPublicationDate == "" ||
        data[i].blocks.body[0].bodyTextSummary == ""
      ) {
        continue;
      } else {
        dict.id = data[i].id;
        dict.title = data[i].webTitle;
        try {
          let temp = data[i].blocks.main.elements[0].assets;
          let img = temp[temp.length - 1].file;
          if (img == "") {
            dict.image =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          } else {
            dict.image = img;
          }
        } catch {
          dict.image =
            "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        dict.section = data[i].sectionName;
        d = data[i].webPublicationDate;
        //console.log("####", typeof d);
        dict.date = d.substring(0, 10);
        dict.desc = data[i].blocks.body[0].bodyTextSummary;
        dict.shareUrl = data[i].webUrl;
        //console.log(dict);
        articles.push(dict);
        count += 1;
        //console.log("filter");
      }
    } catch (e) {
      console.log(e);
    }
  }
  //console.log(articles);
  return articles;
};

//filter articles from New York Times
filterNyt = (data) => {
  //console.log("--------------------------------");
  //console.log(data);
  articles = [];
  count = 0;

  for (i = 0; i < data.length; i++) {
    if (count >= 10) {
      break;
    }
    let dict = {};
    try {
      if (
        data[i].url == "" ||
        data[i].title == "" ||
        data[i].section == "" ||
        data[i].published_date == "" ||
        data[i].abstract == ""
      ) {
        continue;
      } else {
        dict.id = data[i].url;
        dict.title = data[i].title;
        try {
          let temp = data[i].multimedia;
          let c = 0;
          for (j = 0; j < temp.length; j++) {
            if (!(temp[j].url == "")) {
              if (temp[j].width >= 2000) {
                dict.image = temp[j].url;
                break;
              }
            }
            c++;
          }
          if (c == temp.length) {
            dict.image =
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          }
        } catch {
          dict.image =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
        dict.section = data[i].section;
        d = data[i].published_date;
        //console.log(typeof d);
        dict.date = d.substring(0, 10);
        dict.desc = data[i].abstract;
        dict.shareUrl = data[i].url;
        //console.log(dict);
        articles.push(dict);
        count += 1;
      }
    } catch (e) {
      console.log(e);
    }
  }
  //console.log(articles);
  return articles;
};

// The Guardian Home tab
app.get("/home/guardian", (req, res, next) => {
  //console.log("here");
  const url =
    "https://content.guardianapis.com/search?api-key=" +
    guardian_key +
    "&section=(sport|business|technology|politics)&show-blocks=all&page-size=20";
  request.get(url, (error, resp, body) => {
    if (!error && resp.statusCode == 200) {
      //console.log("got it");
      let temp = JSON.parse(body);
      let data = temp.response.results;
      articles = filterGuardian(data);

      res.send(articles);
    }
  });
});

//News York Times home tab
app.get("/home/nyt", (req, res, next) => {
  const url =
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nyt_key;
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let temp = JSON.parse(body);
      //console.log(typeof temp.results);
      let data = temp.results;
      //console.log(data);
      articles = filterNyt(data);

      // //res.send(articles);
      res.send(articles);
    }
  });
});

app.get("/tabs/guardian/:section", (req, res, next) => {
  //console.log("here");
  const section = req.params.section;
  const url =
    "https://content.guardianapis.com/" +
    section +
    "?api-key=" +
    guardian_key +
    "&show-blocks=all&page-size=20";

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      //console.log("got it");
      let temp = JSON.parse(body);
      let data = temp.response.results;
      articles = filterGuardian(data);

      res.send(articles);
    }
  });
});

app.get("/tabs/nyt/:section", (req, res) => {
  const section = req.params.section;
  const url =
    "https://api.nytimes.com/svc/topstories/v2/" +
    section +
    ".json?api-key=" +
    nyt_key;
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let temp = JSON.parse(body);
      //console.log(typeof temp.results);
      let data = temp.results;
      //console.log(data);
      articles = filterNyt(data);

      // //res.send(articles);
      res.send(articles);
    }
  });
});

filterGuardianArticle = (data) => {
  //console.log("--------------------------------");
  let dict = {};
  try {
    dict.id = data.content.id;
    dict.title = data.content.webTitle;
    try {
      let temp = data.content.blocks.main.elements[0].assets;
      let img = temp[temp.length - 1].file;
      if (img == "") {
        dict.image =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      } else {
        dict.image = img;
      }
    } catch {
      dict.image =
        "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    }
    dict.section = data.content.sectionName;
    d = data.content.webPublicationDate;
    //console.log("####", typeof d);
    dict.date = d.substring(0, 10);
    dict.desc = data.content.blocks.body[0].bodyTextSummary;
    dict.shareUrl = data.content.webUrl;
    dict.isGuardian = true;
  } catch (e) {
    console.log(e);
  }

  //console.log(articles);
  return dict;
};

filterNytArticle = (data) => {
  //console.log("--------------------------------");
  //console.log(data);

  let dict = {};
  try {
    dict.id = data.web_url;
    dict.title = data.headline.main;
    try {
      let temp = data.multimedia;
      let c = 0;
      for (j = 0; j < temp.length; j++) {
        //console.log(temp[j]);
        if (!(temp[j].url == "")) {
          //console.log("have url");
          if (temp[j].width >= 2000) {
            dict.image = temp[j].url;
            break;
          }
        }
        //console.log(c);
        c++;
      }
      if (c == temp.length) {
        dict.image =
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
    } catch {
      dict.image =
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }
    dict.section = data.section_name;
    d = data.pub_date;
    //console.log(typeof d);
    dict.date = d.substring(0, 10);
    dict.desc = data.abstract;
    dict.shareUrl = data.web_url;
    dict.isGuardian = false;
    //console.log(dict);
  } catch (e) {
    console.log(e);
  }

  //console.log(articles);
  return dict;
};

app.get("/guardianArticle", (req, res) => {
  const id = req.query.id;
  //console.log(id);
  const url =
    "https://content.guardianapis.com/" +
    id +
    "?api-key=" +
    guardian_key +
    "&show-blocks=all";
  //console.log(url);
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      temp = JSON.parse(body);
      article = filterGuardianArticle(temp.response);
      res.send(article);
    }
  });
});

app.get("/nytArticle", (req, res) => {
  const id = req.query.id;
  //console.log(id);
  const url =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' +
    id +
    '")&api-key=' +
    nyt_key;

  //console.log(url);
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      temp = JSON.parse(body);
      article = filterNytArticle(temp.response.docs[0]);
      res.send(article);
    }
  });
});

app.get("/guardianSearch", (req, res) => {
  const key = req.query.q;
  //console.log(id);
  const url =
    "https://content.guardianapis.com/search?q=" +
    key +
    "&api-key=" +
    guardian_key +
    "&show-blocks=all&page-size=20";
  //console.log(url);
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let temp = JSON.parse(body);
      let data = temp.response.results;
      articles = filterGuardian(data);

      res.send(articles);
    }
  });
});

app.get("/nytSearch", (req, res) => {
  const key = req.query.q;
  //console.log(id);
  const url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    key +
    "&api-key=" +
    nyt_key;

  //console.log(url);
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let temp = JSON.parse(body);
      //console.log(typeof temp.results);
      let data = temp.response.docs;
      //console.log(data);
      articles = filterNytSearch(data);

      // //res.send(articles);
      res.send(articles);
    }
  });
});

filterNytSearch = (data) => {
  //console.log("--------------------------------");
  //console.log(data);
  articles = [];
  count = 0;

  for (i = 0; i < data.length; i++) {
    if (count >= 10) {
      break;
    }
    let dict = {};
    try {
      dict.id = data[i].web_url;
      dict.title = data[i].headline.main;
      try {
        let temp = data[i].multimedia;
        let c = 0;
        for (j = 0; j < temp.length; j++) {
          //console.log(temp[j]);
          if (!(temp[j].url == "")) {
            //console.log("have url");
            if (temp[j].width >= 2000) {
              dict.image = temp[j].url;
              break;
            }
          }
          //console.log(c);
          c++;
        }
        if (c == temp.length) {
          dict.image =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
      } catch {
        dict.image =
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
      dict.section = data[i].section_name;
      d = data[i].pub_date;
      //console.log(typeof d);

      dict.date = d.substring(0, 10);
      dict.desc = data[i].abstract;
      dict.shareUrl = data[i].web_url;
      articles.push(dict);
      //console.log("-----", dict);
    } catch (e) {
      console.log(e);
    }
  }
  //console.log(articles);
  return articles;
};

app.get("/home/topHeadlines", (req, res, next) => {
  //console.log("here");
  const url =
    "https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=" +
    guardian_key +
    "&page-size=20";

  request.get(url, (error, resp, body) => {
    if (!error && resp.statusCode == 200) {
      //console.log("got it");
      let temp = JSON.parse(body);
      let data = temp.response.results;
      articles = filterHeadlines(data);

      res.send(articles);
    }
  });
});

filterHeadlines = (data) => {
  //console.log("--------------------------------");

  articles = [];
  count = 0;

  for (i = 0; i < data.length; i++) {
    //console.log(count);
    if (count >= 10) {
      break;
    }
    let dict = {};
    try {
      if (
        data[i].id == "" ||
        data[i].webTitle == "" ||
        data[i].sectionId == "" ||
        data[i].webPublicationDate == "" ||
        data[i].fields.thumbnail == ""
      ) {
        continue;
      } else {
        dict.id = data[i].id;
        dict.title = data[i].webTitle;
        try {
          let img = data[i].fields.thumbnail;
          //console.log(img);
          if (img == "") {
            dict.image =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          } else {
            dict.image = img;
          }
        } catch {
          dict.image =
            "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        dict.section = data[i].sectionName;
        d = data[i].webPublicationDate;
        //console.log("####", typeof d);
        dict.date = d.substring(0, 10);

        dict.shareUrl = data[i].webUrl;
        //console.log(dict);
        articles.push(dict);
        count += 1;
        //console.log("filter");
      }
    } catch (e) {
      console.log(e);
    }
  }
  //console.log(articles);
  return articles;
};

// app.get("/trends", (req, res) => {
//   const key = req.query.q;
//   //console.log(id);

//   googleTrends.interestOverTime(
//     {
//       keyword: key,
//       startTime: new Date(2019, 06, 01),
//     },
//     function (err, results) {
//       if (err) console.log("oh no error!", err);
//       else {
//         let temp = JSON.parse(results);
//         let data = filterTrends(temp);
//         res.send(data);
//       }
//     }
//   );
// });

app.get("/trends", (req, res, next) => {
  let q = req.query.q;
  googleTrends
    .interestOverTime({ keyword: q, startTime: new Date(2019, 06, 01) })
    .then((response) => JSON.parse(response))
    .then((data) => {
      results = [];
      data = data.default.timelineData;
      for (var i = 0; i < data.length; i++) results.push(data[i].value[0]);
      res.send({ result: results, keyword: q });
    })
    .catch((err) => console.log(err));
});

filterTrends = (data) => {
  //console.log("--------------------------------");

  let values = [];
  let count = 0;
  let timeLineData = data.default.timelineData;
  for (let i = 0; i < timeLineData.length; i++) {
    values.push(timeLineData[i].value[0]);
  }

  //console.log(articles);
  return values;
};
