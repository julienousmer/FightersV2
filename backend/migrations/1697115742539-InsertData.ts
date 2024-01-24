import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1697115742539 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO`pouvoir`(`id`, `nom`, `puissance`) VALUES(1, 'Force', 50), (2, 'Rayons X', 60), (3, 'Boules de feu', 70);");
        await queryRunner.query("INSERT INTO`profil`(`id`, `nom`) VALUES(1, 'Profil LinkedIn de Batman'), (2, 'Profil Facebook de Superman');");
        await queryRunner.query("INSERT INTO`hero`(`id`, `name`, `score`, `id_profil`) VALUES(1, 'Batman', 100, 1), (2, 'Superman', 100, 2), (3, 'Pacman', 30, NULL);");
        await queryRunner.query("INSERT INTO`hero_pouvoir`(`heroId`, `pouvoirId`) VALUES(1, 1), (2, 1), (2, 2), (3, 3);");
        await queryRunner.query("INSERT INTO`user`(`id`, `username`, `password`) VALUES(1, 'toto', 'azerty1234');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }
}
