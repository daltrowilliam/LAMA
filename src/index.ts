import express from "express";
import { AddressInfo } from "net";
import { userRouter } from "./controller/routes/userRouter";
import { bandRouter } from "./controller/routes/bandRouter";
import { showRouter } from "./controller/routes/showRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);

const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
   } else {
      console.error(`Falha ao rodar o servidor.`);
   }
});  