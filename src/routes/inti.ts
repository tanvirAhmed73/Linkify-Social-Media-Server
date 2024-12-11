import auth from "./auth";
import picture from "./picture";

const routeRegister = (app: any) => {
  app.use("/auth", auth);
  app.use("/picture", picture);
};

export default routeRegister;
