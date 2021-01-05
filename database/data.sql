insert into "categories" ("label")
values ('ornaments'),
       ('drinkware'),
       ('wall-decor'),
       ('misc');

insert into "customization" ("label")
values ('name'),
       ('name and date'),
       ('brand'),
       ('custom');


insert into "products" ("productName", "description", "price", "pictureUrl", "categoryId", "customizationId")
values (
        'Snoopy and his best friend',
        'Four custom ornaments with snoopy and his best friend Charlie Brown',
        5.00,
        '/images/snoopy.jpg',
        1,
        4
        ),
       (
        'In this house',
        'Made from the finest pallets the McDonalds down the street was throwing away. Aged by yours truly with old paint I found in my garage.',
        5.00,
        '/images/custom-this-house-team.jpg',
        3,
        3
        ),
       (
        'Family',
        'Made from the thickest pieces of cardboard I could find, this print will melt your heart!',
        5.00,
        '/images/framed-family.jpg',
        3,
        2
        );
