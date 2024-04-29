import DaoMongo from "./custom.dao.mongo.js";
import usersModel from "../../models/users.models.js";
import CartDaoMongo from "./cartdaomongo.js";

const cartsService = new CartDaoMongo();

export default class UserDaoMongo  extends DaoMongo{
  constructor() {
    super (usersModel);
  }

  create = async (newUser) => {
    newUser.cart = await cartsService.create();
    await this.model.create(newUser)
  }
}