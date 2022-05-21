
INSERT INTO table_name (column_list)
VALUES
    (value_list_1),
    (value_list_2),
    ...
    (value_list_n);

BULK INSERT

INSERT INTO MyTable (Name)
SELECT  NewNames.Name
FROM    ( VALUES ('Name1'), ('Name2'), ('Name3') ) AS NewNames (Name)
WHERE   NOT EXISTS ( SELECT 1
                     FROM   MyTable AS MT
                     WHERE  MT.Name = NewNames.Name );
