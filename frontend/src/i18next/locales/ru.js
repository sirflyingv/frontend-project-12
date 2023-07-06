export default {
  translation: {
    appHeader: 'Hexlet Chat',
    channelsHeader: 'Каналы',
    channelsName: 'Имя канала',
    logOut: 'Выйти',
    doLogIn: 'Войти',

    signUpForm: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      typeName: 'Введите имя',
      password: 'Пароль',
      typePassword: 'Введите пароль',
      repeatPassword: 'Подтвердите пароль',
      errorPassMin: 'Не менее 6 символов',
      errorNameLength: 'От 3 до 20 символов',
      errorRepeatPassword: 'Пароли должны совпадать',
      errorRequired: 'Необходимое поле',
      signUp: 'Зарегистрироваться',
      userExists: 'Пользователь с таким именем уже существует',
    },

    loginForm: {
      username: 'Ваш ник',
      enterName: 'Введите имя',
      password: 'Пароль',
      enterPassword: 'Введите пароль',
      logIn: 'Вход',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },

    error: {
      wrongCred: 'Неверные имя пользователя или пароль',
      network: 'Ошибка сети',
      unspecified: 'Что-то пошло не так',
    },

    modalCreateNewChannel: {
      addChannel: 'Добавить канал',
      channelsName: 'Имя канала',
      required: 'Не должно быть пустым',
      errorAlreadyUsed: 'Канал с таким именем уже существует',
      errorMaxLength: 'Должно быть не более 20 символов',
      cancel: 'Отменить',
      send: 'Отправить',
    },

    modalDeleteChannel: {
      deleteChannel: 'Удалить канал',
      sure: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
    },

    modalRenameChannel: {
      renameChannelHeader: 'Переименовать канал',
      renameChannelLabel: 'Имя канала',
      newChannelName: 'Новое имя канала',
      errorAlreadyUsed: 'Канал с таким именем уже существует',
      required: 'Не должно быть пустым',
      errorMaxLength: 'Должно быть не более 20 символов',
      cancel: 'Отменить',
      rename: 'Переименовать',
    },

    toastify: {
      toastNoConnectionToServer: 'Ошибка подключения',
      toastUnspecifiedError: 'Что-то пошло не так',
      toastChannelCreated: 'Канал {{name}} создан',
      toastChannelRenamed: 'Канал {{oldName}} переименован в {{newName}}',
      toastChannelDeleted: 'Канал {{name}} удалён',
    },

    activeChannel: {
      messagesCount: 'сообщений',
      writeMessage: 'Введите сообщение...',
      labelNewMessage: 'Новое сообщение',
    },

    channelsList: {
      editChannel: 'Управление каналом',
      deleteChannelDropDown: 'Удалить',
      renameChannelDropDown: 'Переименовать',
    },

    notFound: {
      header: 'Страница не найдена',
      butCanNavigate: 'Но вы можете перейти',
      toMain: 'на главную страницу',
    },
  },
};
