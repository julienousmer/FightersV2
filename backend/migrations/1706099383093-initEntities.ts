import { MigrationInterface, QueryRunner } from "typeorm";

export class initEntities1706099383093 implements MigrationInterface {
    name = 'initEntities1706099383093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`max_weight\` int NOT NULL, \`min_weight\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`champion\` int NULL, UNIQUE INDEX \`REL_92e29761e9450f7a9db89d3a5a\` (\`champion\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fighter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`height\` int NOT NULL, \`nb_lose\` int NOT NULL, \`nb_win\` int NOT NULL, \`reach\` int NOT NULL, \`sexe\` varchar(255) NOT NULL, \`weight\` int NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_92e29761e9450f7a9db89d3a5ae\` FOREIGN KEY (\`champion\`) REFERENCES \`fighter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fighter\` ADD CONSTRAINT \`FK_1bf6210aed6156a534fcea924d2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fighter\` DROP FOREIGN KEY \`FK_1bf6210aed6156a534fcea924d2\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_92e29761e9450f7a9db89d3a5ae\``);
        await queryRunner.query(`DROP TABLE \`fighter\``);
        await queryRunner.query(`DROP INDEX \`REL_92e29761e9450f7a9db89d3a5a\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
