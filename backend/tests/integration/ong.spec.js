const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(() => {
    connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAE",
        email: "contato@apae.com.br",
        whatsapp: "51966665555",
        city: "Santa Cruz do Sul",
        uf: "RS"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });

  it('should be able to create ONG incidents', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', 'c5e80c00')
      .send({
        title:"Caso 4", 
	      description:"Detalhes do caso 4", 
	      value:170.90
      });
      
      expect(response.body).toHaveProperty('id');
  });

  
});