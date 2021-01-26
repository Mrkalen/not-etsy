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
        'Made from 1x4, aged, and painted.',
        5.00,
        '/images/custom-this-house-team.jpg',
        3,
        3
        ),
       (
        'Family',
        'Made from wood and canvase, this print will melt your heart!',
        5.00,
        '/images/framed-family.jpg',
        3,
        2
        ),
        (
        'Bottle Opener',
        'Its a bottle opener.',
        5.00,
        '/images/bottle-opener.jpg',
        4,
        3
        ),
        (
        'Insulated mug with image',
        'An insulated cup on which to print images or your name.',
        5.00,
        '/images/custom-image-mug-1.jpg',
        2,
        4
        ),
        (
        'Insulated mug with name',
        'An insulated cup on which to print images or your name.',
        5.00,
        '/images/custom-name-mug-2.jpg',
        2,
        4
        ),
        (
        'Glass mugs',
        'Glass mugs with custom inscriptions. Great for wedding favors!',
        5.00,
        '/images/custom-name-mugs.jpg',
        2,
        4
        ),
        (
        'Ornaments with name',
        'Different colored ornaments with a custom print.',
        5.00,
        '/images/custom-name-ornament.jpg',
        1,
        4
        ),
        (
        'Frida ornament',
        'A custom made ornament in the likeness of Frida.',
        5.00,
        '/images/frida.jpg',
        1,
        4
        ),
        (
        'Sports Ornaments',
        'Four custom ornaments with your favorite team on them.',
        5.00,
        '/images/sports.jpg',
        1,
        3
        );
