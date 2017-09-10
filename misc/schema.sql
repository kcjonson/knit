CREATE TABLE IF NOT EXISTS updates (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     device_id CHAR(30) NOT NULL,
     value JSON,
     recorded_at DATETIME,
     PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS devices (
     id CHAR(30) NOT NULL,
     name CHAR(60),
     value JSON,
     last_updated DATETIME,
     PRIMARY KEY (id)
);
