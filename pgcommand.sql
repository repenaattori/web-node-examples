CREATE TABLE student(  
    fname VARCHAR(255),
    lname VARCHAR(255),
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    pw VARCHAR(255)
);
CREATE TABLE note(  
    id SERIAL NOT NULL PRIMARY KEY,
    msg VARCHAR(255),
    student_uname VARCHAR(255) REFERENCES student(username)
);