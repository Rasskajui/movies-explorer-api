const movieBadRequestMessage = 'Переданы некорректные данные при создании фильма';
const movieNotFoundMessage = 'Фильм не найден';
const movieForbiddenMessage = 'Нельзя удалять фильмы других пользователей';
const movieDeletedMessage = 'Фильм удалён из списка сохранённых';

const userNotFoundMessage = 'Пользователь не найден';
const userUpdateBadRequestMessage = 'Переданы некорректные данные при обновлении профиля';
const userConflictMessage = 'Пользователь с данным email уже зарегистрирован';
const userSignupBadRequestMessage = 'Переданы некорректные данные при создании пользователя';

const pathNotFoundMessage = 'Неправильный путь';

const unauthorizedErrorMessage = 'Необходима авторизация';
const defaultErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  movieBadRequestMessage,
  movieDeletedMessage,
  movieForbiddenMessage,
  movieNotFoundMessage,
  userConflictMessage,
  userNotFoundMessage,
  userSignupBadRequestMessage,
  userUpdateBadRequestMessage,
  pathNotFoundMessage,
  unauthorizedErrorMessage,
  defaultErrorMessage,
};
