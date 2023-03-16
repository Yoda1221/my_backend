# My Backend


### Prisma
- Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
[Prisma](https://www.prisma.io/)
[See the documentation for more detail](https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema)
[See the documentation for all the connection string options](https://pris.ly/d/connection-strings)

- npx prisma db pull    <!-- create shema from dtatatables -->
- npx prisma db push    <!-- update existing tables -->

###### ERROR
- Column count of mysql.proc is wrong. Expected 21, found 20. Created with MariaDB 100108, now running 100421
- solve mysql_upgrade -u root -p ???