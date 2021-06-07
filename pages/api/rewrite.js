import axios from "axios";

export default async (req, res) => {
  let input = req.body.input;
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const options = {
    method: "POST",
    url: "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      "x-rapidapi-host":
        "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
    },
    data: {
      language: "en",
      strength: 3,
      text: `${input}`,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.send(response.data.rewrite);
    })
    .catch((error) => {
      console.error(error);
    });
};
