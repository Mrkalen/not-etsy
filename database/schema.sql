set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "products" (
	"productId" serial NOT NULL,
	"productName" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" integer NOT NULL,
	"pictureUrl" TEXT NOT NULL,
	"timeStamp" timestamptz NOT NULL default now(),
	"categoryId" integer NOT NULL,
	"customizationId" integer NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"categoryId" serial NOT NULL,
	"label" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customization" (
	"customizationId" serial NOT NULL,
	"label" TEXT NOT NULL,
	CONSTRAINT "customization_pk" PRIMARY KEY ("customizationId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cartItems" (
	"cartItemsId" serial NOT NULL,
	"cartId" int,
	"productId" int NOT NULL,
	"customizations" json NOT NULL,
	"quantity" int NOT NULL,
	CONSTRAINT "CartItems_pk" PRIMARY KEY ("cartItemsId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "carts" (
	"cartId" serial NOT NULL,
	CONSTRAINT "carts_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("customizationId") REFERENCES "customization"("customizationId");



ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("cartId") REFERENCES "carts"("cartId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");
