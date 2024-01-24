import "reflect-metadata"
import { DataSource } from "typeorm"
import {dbProperties} from "./properties/db.properties";

export const AppDataSource = new DataSource({...dbProperties})
