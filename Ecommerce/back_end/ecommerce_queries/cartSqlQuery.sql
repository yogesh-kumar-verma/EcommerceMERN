-- CREATE TABLE [dbo].[carts] (
--     [_id]        INT IDENTITY (1, 1) NOT NULL,
--     [user_id]    INT NOT NULL,
--     [product_id] INT NOT NULL,
--     [quantity]   INT CONSTRAINT [DEFAULT_carts_quantity] DEFAULT 1 NOT NULL,
--     CONSTRAINT [PK_carts] PRIMARY KEY CLUSTERED ([_id] ASC),
--     FOREIGN KEY (user_id) REFERENCES users(_id),
--     FOREIGN KEY (product_id) REFERENCES products(_id)
-- );
--
;
-- delete from carts where _id=1
-- select * from carts
-- select carts._id ,
--       carts.user_id,
--       carts.product_id,
--       products.quantity as 'stock',
--       carts.quantity ,
--       products.seller,
--       products.discount,
--       products.images,
--       products.description,
--       products.price,
--       products.currency,
--       products.brand,
--       products.category,
--       products.colors,
--       products.name  from carts inner join products on products._id = carts.product_id where carts._id=1