# Open App Store


## Items Needed

1. node
2. npm 
3. mysql community server
    - https://dev.mysql.com/downloads/mysql/ (mac)
    - open system prefrences and scroll down
    - click on MySQL
    - click start MySQL Server
    - when you open terminal for my sql (`mysql -u root -p`) make sure to run the following:
    `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

    // Where root as your user localhost as your URL and password as your password

    // Then run this query to refresh privileges:

    `flush privileges;`

    // Try connecting using node after you do so.

    // If that doesn't work, try it without @'localhost' part.
