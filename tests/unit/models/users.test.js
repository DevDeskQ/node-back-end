const Users = require('../../../models/users');

describe('users', () => {
  beforeAll(async () => { await Users.clear(); });
  afterAll(async () => { await Users.clear(); });

  it('should add new users', async () => {
    await Users.add({
      email: 'devdeskapp@gmail.com',
      username: 'admin',
      password: 'super22unicorndragon@55',
      role: 'admin'
    });
    await Users.add({
      email: 'pavol@example.com',
      username: 'pav0l',
      password: 'yeeyee'
    });
    await Users.add({
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: 'supersecurepasswd'
    });

    const users = await Users.get();
    expect(users).toHaveLength(3);
  });

  it('should find a user', async () => {
    const [user] = await Users.filter({ username: 'admin' });
    expect(user).toBeDefined();
    expect(user).toHaveProperty('role');
  });

  it('should update a user', async () => {
    const count = await Users.update(1, { username: 'kittycuddler' });
    expect(count).toBe(1);
  });

  it('should delete a user', async () => {
    const count = await Users.remove(1);
    expect(count).toBe(1);
  });

  it('should clear the users', async () => {
    await Users.clear();

    const users = await Users.get();

    expect(users).toHaveLength(0);
  });
});
