export const config = {
  baseUrl: process.env.WORKDAY_URL ?? 'https://impl.workday.com/wday/authgwy/yourcompany/login.htmld',
  username: process.env.WORKDAY_USERNAME ?? 'testuser@company.com',
  password: process.env.WORKDAY_PASSWORD ?? 'Password123',
  timeout: 30000,
};
