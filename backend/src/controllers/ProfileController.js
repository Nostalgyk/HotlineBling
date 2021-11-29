const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user_id = request.headers.authorization;
    const user_password = request.headers.password;

    const transactions = await connection('transactions')
      .where('user_id', user_id)
      .and('user_password', user_password)
      .select('*');

    return response.json(transactions);
  }
};
