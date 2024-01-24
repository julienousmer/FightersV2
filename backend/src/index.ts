import {AppDataSource} from "./data-source"
import {NestFactory} from "@nestjs/core"
import {AppModule} from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}

AppDataSource.initialize().then(async () => {
    bootstrap();

}).catch(error => console.log(error))
