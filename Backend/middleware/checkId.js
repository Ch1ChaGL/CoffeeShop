module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const UserIdInParams = parseInt(req.params.id);
    let { UserId } = req.query;
    UserId = parseInt(UserId);
    const userId = req.user.UserId;
    const RoleId = req.user.RoleId;
    console.log('RoleId');
    console.log(RoleId);
    if (RoleId === 1) {
      console.log('Я сюда попал');
      return next();
    }
    console.log('req');
    console.log(req.query);
    console.log('UserIdInParams');
    console.log(UserIdInParams);
    console.log('userId in object user');
    console.log(userId);
    console.log('userId in request query');
    console.log(UserId);
    console.log('!UserIdInParams');
    console.log(UserIdInParams);
    if (UserIdInParams !== userId && UserIdInParams) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    if (UserId !== userId && UserId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
