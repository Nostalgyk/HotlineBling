const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;
    const { password } = request.body;

    const user = await connection('users')
      .where('id', id)
      .andWhere('password', password)
      .select('name')
      .first();

    if (!user) {
      return response.status(400).json({ error: 'No User found with this ID' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Wrong password.' });
    }

    return response.json(user);
  }
};
