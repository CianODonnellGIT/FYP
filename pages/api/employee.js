import nc from "next-connect";
import { getAllEmployees } from "../../controller/Employee"

const handler = nc();
 // .use(someMiddleware())
  handler.get(getAllEmployees);
  

export default handler;