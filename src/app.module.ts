import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// import {BreedsModule} from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { BannersModule } from './banners/banners.module';
import { LivreurModule } from './livreur/livreur.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [ MongooseModule.forRoot("mongodb+srv://dali:dalixo@tunismarket0.ykbjsxz.mongodb.net/TunisMarket?retryWrites=true&w=majority"),UsersModule,AuthModule, ProductsModule, CategoryModule, CloudinaryModule, SubcategoryModule, BannersModule, LivreurModule, OrderModule, AdminModule ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
