// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//export default function handler(req, res) {
//  res.status(200).json({ name: 'John Doe' })
//}
import nc from "next-connect";

const handler = nc({/*{
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}*/})
 // .use(someMiddleware())
  .get((req, res) => {
    res.send("Hello world");
  });
  

export default handler;