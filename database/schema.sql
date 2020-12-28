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



ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("customizationId") REFERENCES "customization"("customizationId");
