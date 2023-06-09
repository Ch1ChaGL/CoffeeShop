const ApiErorr = require('../error/ApiError');
const userService = require('../service/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

generateJwtToken = (UserId, Email, RoleId) => {
  return jwt.sign({ UserId, Email, RoleId }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { Email, Password, RoleId } = req.body;

      if (!Email || !Password || !RoleId) {
        return next(ApiErorr.badRequest('Не все поля заполнены'));
      }
      const candidate = await userService.checkEmail(Email);
      if (candidate) {
        return next(
          ApiErorr.badRequest('Пользователь с таким email уже зарегистрирован'),
        );
      }

      const hashPassword = await bcrypt.hash(Password, 5);
      const user = await userService.create({
        Email,
        Password: hashPassword,
        RoleId,
      });

      const jwtToken = generateJwtToken(user.UserId, user.Email, user.RoleId);
      return res.json({ jwtToken });
    } catch (err) {
      return next(ApiErorr.badRequest(err.message));
    }
  }
  async login(req, res, next) {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return next(ApiErorr.badRequest('Не все поля заполнены'));
    }

    const candidate = await userService.checkEmail(Email);

    if (!candidate) {
      return next(
        ApiErorr.internal('Пользователь с таким email не существует'),
      );
    }

    const comparePassword = await bcrypt.compareSync(
      Password,
      candidate.Password,
    );

    if (!comparePassword) {
      return next(ApiErorr.badRequest('Неверный пароль'));
    }

    const jwtToken = generateJwtToken(
      candidate.UserId,
      candidate.Email,
      candidate.RoleId,
    );

    return res.json({ jwtToken });
  }
  async check(req, res, next) {
    const token = generateJwtToken(
      req.user.UserId,
      req.user.Email,
      req.user.RoleId,
    );
    return res.json({ token });
  }
  async delete(req, res, next) {}
  async getById(req, res, next) {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.json(user);
  }
}

module.exports = new UserController();
