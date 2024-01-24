export const dbProperties: any = {
  type: 'mysql',
  host: '87.106.122.236',
  port: 3306,
  username: 'clmt',
  password: '130702',
  database: 'fighterStats',
  synchronize: false,
  logging: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  subscribers: [],
};
