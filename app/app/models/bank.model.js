module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("bank_datas", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      banco_nome: {
        type: Sequelize.STRING
      },
      banco_agencia: {
        type: Sequelize.STRING
      },
      banco_conta: {
        type: Sequelize.STRING
      },
      tipo_conta: {
        type:   Sequelize.ENUM,
        values: ['Conta Corrente','Conta Poupança']
      },
      bank_id: {
        type: Sequelize.INTEGER
      }
    });
    return Bank;
  };
