-- * Will need the following data for our application to function correctly
    -- ? Table One: Login information
        -- TODO: Create a table for the login portion of the application
        -- TODO: This will store just login information and should have the following fields:
            -- ? User name 
            -- ? Password
    -- ? Table Two: Profile information
        -- TODO: This should house all of the information regarding what gets saved to a persons login
        -- TODO: A foreign key can be used to connect the profile to the login on the db
        -- TODO: This table should store the following information, and have the following fields:
            -- ? Favorite Artists
                -- TODO: With the favoite artists table.
                -- TODO: Once the table has been populated:
                    -- ? Pull the table information to a function
                    -- ? This function should pass the information from the table to the APIs
                    -- ? Once the API responses are ready to go, generate dynamic pages for each
                        -- TODO: This can be done using Handlebars

DROP DATABASE IF EXISTS musicApp_db

CREATE DATABASE musicApp_db

USE musicApp_db

CREATE TABLE usersTable(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (id) REFERENCES id(id)
)

CREATE TABLE userInformation(
    id INT NOT NULL PRIMARY KEY,
    favArtist VARCHAR(100) NOT NULL,
    userID INT FOREIGN KEY REFERENCES id(id)
)

DROP DATABASE IF EXISTS loginApp;
CREATE DATABASE loginApp;
USE loginApp;

create table users(
	userID int NOT NULL auto_increment,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    PRIMARY KEY (userID)
);

create table userInfo(
	userID INT NOT NULL,
	favoriteID INT NOT NULL PRIMARY KEY,
    favoriteArtists VARCHAR(200) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID)
)