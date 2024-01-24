import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1697115668545 implements MigrationInterface {
    name = 'InitDb1697115668545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pouvoir\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`puissance\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`idProfil\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hero\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`id_profil\` int NULL, UNIQUE INDEX \`REL_02a3cefb801bdd3fbcebbf4139\` (\`id_profil\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hero_pouvoir\` (\`heroId\` int NOT NULL, \`pouvoirId\` int NOT NULL, INDEX \`IDX_6b11d187afda7e7d51f789f0b2\` (\`heroId\`), INDEX \`IDX_2578bc64c4a71a2c9df1abc4e5\` (\`pouvoirId\`), PRIMARY KEY (\`heroId\`, \`pouvoirId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_a3f12ed7aee0b4dd83241f6587d\` FOREIGN KEY (\`idProfil\`) REFERENCES \`profil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hero\` ADD CONSTRAINT \`FK_02a3cefb801bdd3fbcebbf4139d\` FOREIGN KEY (\`id_profil\`) REFERENCES \`profil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hero_pouvoir\` ADD CONSTRAINT \`FK_6b11d187afda7e7d51f789f0b2d\` FOREIGN KEY (\`heroId\`) REFERENCES \`hero\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hero_pouvoir\` ADD CONSTRAINT \`FK_2578bc64c4a71a2c9df1abc4e58\` FOREIGN KEY (\`pouvoirId\`) REFERENCES \`pouvoir\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hero_pouvoir\` DROP FOREIGN KEY \`FK_2578bc64c4a71a2c9df1abc4e58\``);
        await queryRunner.query(`ALTER TABLE \`hero_pouvoir\` DROP FOREIGN KEY \`FK_6b11d187afda7e7d51f789f0b2d\``);
        await queryRunner.query(`ALTER TABLE \`hero\` DROP FOREIGN KEY \`FK_02a3cefb801bdd3fbcebbf4139d\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_a3f12ed7aee0b4dd83241f6587d\``);
        await queryRunner.query(`DROP INDEX \`IDX_2578bc64c4a71a2c9df1abc4e5\` ON \`hero_pouvoir\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b11d187afda7e7d51f789f0b2\` ON \`hero_pouvoir\``);
        await queryRunner.query(`DROP TABLE \`hero_pouvoir\``);
        await queryRunner.query(`DROP INDEX \`REL_02a3cefb801bdd3fbcebbf4139\` ON \`hero\``);
        await queryRunner.query(`DROP TABLE \`hero\``);
        await queryRunner.query(`DROP TABLE \`profil\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`pouvoir\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
