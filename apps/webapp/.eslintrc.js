module.exports = {
  root: true,
  extends: ['@tegonhq/eslint-config/next.js'],
  parserOptions: {
    project: true,
  },
  rules: {
    'no-unused-vars': 'off',  // Отключаем предупреждения о неиспользуемых переменных
  },
};
