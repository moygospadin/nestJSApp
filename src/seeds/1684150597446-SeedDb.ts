import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1684150597446 implements MigrationInterface {
  name = 'SeedDb1684150597446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    // password is 1234
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$oqui3AJuLJxOM3s7S7GJXeXSGQyC0az09DGA8ZF0A7O0J1f4enE/W')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('lesha', 'lesha@gmail.com', '$2b$10$oqui3AJuLJxOM3s7S7GJXeXSGQyC0az09DGA8ZF0A7O0J1f4enE/W')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'second article', 'second article desc', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
