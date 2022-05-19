CREATE TABLE IF NOT EXISTS usuarios (
  "id" SERIAL,
  "nome" TEXT,
  "email" TEXT NOT NULL,
  "senha" TEXT,
  "id_facebook" TEXT NOT NULL,
  "foto" TEXT,
  "iniciais" TEXT,

  PRIMARY KEY ("id")
);

INSERT INTO usuarios (nome, email, senha, id_facebook) VALUES ('Loro', 'loro@mail.com', NULL, '123456789');
