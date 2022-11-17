import AppDataSource from "../data-source";
import User from "../models/interfaces/UserInterface";

class UserService {
  createUser(body: User): Promise<User> {
    console.log(body);
    return AppDataSource.query(
      `insert into users (email, hash)
       values ('${body.email}', '${body.hash}');`
    );
  }

  connectUser(body: User): Promise<User[]> {
    console.log(body.email);
    return AppDataSource.query(
      `select hash from users where email = '${body.email}';`
    );
  }
}

export default UserService;
