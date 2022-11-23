import AppDataSource from "../data-source";
import User from "../models/interfaces/UserInterface";

class UserService {
  createUser(body: User): Promise<User> {
    console.log(body);
    return AppDataSource.query(
      `insert into users (email, hash, autorisation)
       values ('${body.email}', '${body.hash}' , '${body.autorisation}');`
    );
  }

  connectUser(body: User): Promise<User[]> {
    console.log(body.email);
    return AppDataSource.query(
      `select hash from users where email = '${body.email}';`
    );
  }

  findRole(body: User): Promise<User[]> {
    return AppDataSource.query(
      `select autorisation from users where email = '${body.email}' ;`
    );
  }

  allUser(): Promise<User[]> {
    return AppDataSource.query(`select * from users;`);
  }
}

export default UserService;
