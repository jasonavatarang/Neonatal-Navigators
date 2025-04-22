module.exports = {
    testEnvironment: 'jest-environment-jsdom', // ✅ specific name now works
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^react$': require.resolve('react'),
      '^react-dom$': require.resolve('react-dom'),
    },
  };
  