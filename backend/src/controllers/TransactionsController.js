const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('transactions').count();

    console.log(count);

    const transactions = await connection('transactions')
      .join('users', 'users.id', '=', 'transactions.user_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'transactions.*',
        'users.name',
        'users.email',
        'users.whatsapp',
        'users.city',
        'users.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(transactions);
  },

  async create(request, response) {
    const { title, description, value, category } = request.body;
    const user_id = request.headers.authorization;

    const [id] = await connection('transactions').insert({
      title,
      description,
      value,
      category,
      user_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const transactions = await connection('transactions')
      .where('id', id)
      .select('user_id')
      .first();

    if (transactions.user_id != user_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('transactions').where('id', id).delete();

    return response.status(204).send();
  }
};
