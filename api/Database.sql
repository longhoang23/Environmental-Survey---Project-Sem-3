CREATE DATABASE EnvironmentalSurveyPortalDB;

-- Use the newly created database
USE EnvironmentalSurveyPortalDB;

-- Table: Classes
CREATE TABLE Classes (
    ClassId INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each class
    Name NVARCHAR(100) NOT NULL -- Class name
);

-- Table: Sections
CREATE TABLE Sections (
    SectionId INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each section
    Name NVARCHAR(100) NOT NULL -- Section name
);

-- Table: Users
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each user
    FirstName NVARCHAR(100) NOT NULL, -- First name of the user
    LastName NVARCHAR(100) NOT NULL, -- Last name of the user
    Email NVARCHAR(255) NOT NULL, -- Email of the user
    PhoneNumber NVARCHAR(10) NOT NULL, -- User's phone number
    Role INT NOT NULL CHECK (Role IN (1, 2, 3)), -- User role: 1 = Admin, 2 = Staff, 3 = Student
    RollOrEmpNo NVARCHAR(50) NOT NULL UNIQUE, -- Unique identifier for roll number or employee number
    ClassId INT NULL, -- Foreign key reference to Classes
    Specification NVARCHAR(100) NULL, -- Specialization or specific description
    SectionId INT NULL, -- Foreign key reference to Sections
    AdmissionDate DATE NULL, -- Admission date for students
    JoinDate DATE NULL, -- Joining date for staff
    UpdatedAt DATE NULL, -- Last updated date
    Status INT NOT NULL DEFAULT 0 CHECK (Status IN (0, 1, 2, 3)), -- Default is 0 (NotRequested)
    Username NVARCHAR(50) NOT NULL UNIQUE, -- Login username
    PasswordHash NVARCHAR(255) NOT NULL, -- Hashed password
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId), -- FK to Classes
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId) -- FK to Sections
);


-- Table: Surveys
CREATE TABLE Surveys (
    SurveyID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each survey
    Title NVARCHAR(200) NOT NULL, -- Survey title
    Description NVARCHAR(MAX) NULL, -- Detailed description of the survey
    TargetAudience NVARCHAR(20) NOT NULL CHECK (TargetAudience IN ('Students', 'Staff')), -- Target audience: Students or Staff
    StartDate DATE NOT NULL, -- Start date of the survey
    EndDate DATE NOT NULL, -- End date of the survey
    CreatedBy INT NOT NULL, -- Foreign key reference to Users
    IsActive BIT NOT NULL DEFAULT 1, -- Whether the survey is active
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID) -- FK to Users
);

-- Table: SurveyQuestions
CREATE TABLE SurveyQuestions (
    QuestionID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each question
    SurveyID INT NOT NULL, -- Foreign key reference to Surveys
    QuestionText NVARCHAR(500) NOT NULL, -- Text of the question
    QuestionType NVARCHAR(50) NOT NULL CHECK (QuestionType IN ('Multiple Choice', 'Text', 'Rating')), -- Type of question
    FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) -- FK to Surveys
);

-- Table: SurveyOptions
CREATE TABLE SurveyOptions (
    OptionID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each option
    QuestionID INT NOT NULL, -- Foreign key reference to SurveyQuestions
    OptionText NVARCHAR(300) NOT NULL, -- Text of the option
    Score INT NOT NULL DEFAULT 0, -- Score for the option
    FOREIGN KEY (QuestionID) REFERENCES SurveyQuestions(QuestionID) -- FK to SurveyQuestions
);

-- Table: Participations
CREATE TABLE Participations (
    ParticipationID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each participation
    UserID INT NOT NULL, -- Foreign key reference to Users
    SurveyID INT NOT NULL, -- Foreign key reference to Surveys
    ParticipationDate DATE NOT NULL DEFAULT GETDATE(), -- Date of participation
    TotalScore INT NULL, -- Total score obtained in the survey
    Feedback NVARCHAR(MAX) NULL, -- Feedback provided by the participant
    FOREIGN KEY (UserID) REFERENCES Users(UserID), -- FK to Users
    FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) -- FK to Surveys
);

-- Table: Responses
CREATE TABLE Responses (
    ResponseID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each response
    ParticipationID INT NOT NULL, -- Foreign key reference to Participations
    QuestionID INT NOT NULL, -- Foreign key reference to SurveyQuestions
    OptionID INT NULL, -- Foreign key reference to SurveyOptions (if applicable)
    ResponseText NVARCHAR(1000) NULL, -- Response text (if applicable)
    FOREIGN KEY (ParticipationID) REFERENCES Participations(ParticipationID), -- FK to Participations
    FOREIGN KEY (QuestionID) REFERENCES SurveyQuestions(QuestionID), -- FK to SurveyQuestions
    FOREIGN KEY (OptionID) REFERENCES SurveyOptions(OptionID) -- FK to SurveyOptions
);

-- Table: Competitions
CREATE TABLE Competitions (
    CompetitionID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each competition
    Title NVARCHAR(200) NOT NULL, -- Competition title
    Description NVARCHAR(MAX) NULL, -- Detailed description of the competition
    PrizeDetails NVARCHAR(200) NULL, -- Prize information
    Winner1 INT NULL, -- First prize winner (Foreign key to Users)
    Winner2 INT NULL, -- Second prize winner (Foreign key to Users)
    Winner3 INT NULL, -- Third prize winner (Foreign key to Users)
    FOREIGN KEY (Winner1) REFERENCES Users(UserID), -- FK to Users
    FOREIGN KEY (Winner2) REFERENCES Users(UserID), -- FK to Users
    FOREIGN KEY (Winner3) REFERENCES Users(UserID) -- FK to Users
);

-- Table: Seminars
CREATE TABLE Seminars (
    SeminarID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each seminar
    ConductedBy INT NOT NULL, -- Foreign key reference to Users
    Location NVARCHAR(200) NOT NULL, -- Seminar location
    Date DATE NOT NULL, -- Date of the seminar
    ParticipantsCount INT NOT NULL, -- Number of participants
    Description NVARCHAR(MAX) NULL, -- Additional details about the seminar
    FOREIGN KEY (ConductedBy) REFERENCES Users(UserID) -- FK to Users
);

-- Table: FAQ
CREATE TABLE FAQ (
    FAQID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each FAQ
    Question NVARCHAR(500) NOT NULL, -- FAQ question
    Answer NVARCHAR(MAX) NULL -- FAQ answer
);

-- Table: Support
CREATE TABLE Support (
    SupportID INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each support entry
    ContactInfo NVARCHAR(MAX) NOT NULL -- Contact details
);

CREATE TABLE RegistrationRequests (
    RegistrationRequestId INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier for each registration request
    UserId INT NOT NULL, -- Foreign key reference to Users
    FirstName NVARCHAR(100) NOT NULL, -- First name from the request
    LastName NVARCHAR(100) NOT NULL, -- Last name from the request
    RollOrEmpNo NVARCHAR(50) NOT NULL, -- Unique identifier for roll number or employee number
    ClassId INT NULL, -- Foreign key reference to Classes (optional)
    SectionId INT NULL, -- Foreign key reference to Sections (optional)
    Specification NVARCHAR(100) NULL, -- Specialization or specific description (optional)
    AdmissionDate DATE NULL, -- Admission date for students (if applicable)
    JoinDate DATE NULL, -- Joining date for staff (if applicable)
    RequestedAt DATETIME NOT NULL DEFAULT GETDATE(), -- Date of the registration request
    FOREIGN KEY (UserId) REFERENCES Users(UserID), -- FK to Users table
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId), -- FK to Classes table (optional)
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId) -- FK to Sections table (optional)
);

-- Insert data into Classes
INSERT INTO Classes (Name)
VALUES 
('Class A'),
('Class B'),
('Class C');

-- Insert data into Sections
INSERT INTO Sections (Name)
VALUES 
('Section 1'),
('Section 2'),
('Section 3');

-- Insert data into Users (one for each role: Admin, Staff, Student)
INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, Role, RollOrEmpNo, ClassId, SectionId, Specification, AdmissionDate, JoinDate, UpdatedAt, Status, Username, PasswordHash)
VALUES 
('AdminFirst', 'AdminLast', 'admin1@example.com', '1234567890', 1, 'ADM001', NULL, NULL, 'System Administrator', NULL, '2022-01-01', GETDATE(), 2, 'admin.user', '$2a$12$eT3SjyHxkYIpCM4AlzBw2OW5aYc5u1j/UTRLQPZRhM7kC6d65Ui6G'), 
('StaffFirst', 'StaffLast', 'staff1@example.com', '2345678901', 2, 'STF001', NULL, 1, 'IT Support', NULL, '2022-02-01', GETDATE(), 2, 'staff.user', '$2a$12$HdJDR5XmpvUOvDO8LgJ.JuEs5ysP8U4oJEdJg0qKnqFgJ6vzgArSa'),
('StudentFirst', 'StudentLast', 'student1@example.com', '3456789012', 3, 'STU001', 1, NULL, 'Computer Science', '2022-03-01', NULL, GETDATE(), 2, 'student.user', '$2a$12$yjkMkgGZKrAaHd2nZtJYROUkRmBIXwwhrfXKdcMj9tyFmGR66.Iie');
-- Insert data into Surveys
INSERT INTO Surveys (Title, Description, TargetAudience, StartDate, EndDate, CreatedBy, IsActive)
VALUES 
('Survey 1', 'Description of Survey 1', 'Students', '2025-01-01', '2025-01-15', 3, 1),
('Survey 2', 'Description of Survey 2', 'Staff', '2025-01-10', '2025-01-20', 2, 1),
('Survey 3', 'Description of Survey 3', 'Students', '2025-02-01', '2025-02-15', 3, 1);

-- Insert data into SurveyQuestions
INSERT INTO SurveyQuestions (SurveyID, QuestionText, QuestionType)
VALUES 
(1, 'What is your favorite subject?', 'Multiple Choice'),
(1, 'How satisfied are you with your course?', 'Rating'),
(2, 'What improvements do you suggest for staff training?', 'Text');

-- Insert data into SurveyOptions
INSERT INTO SurveyOptions (QuestionID, OptionText, Score)
VALUES 
(1, 'Math', 1),
(1, 'Science', 1),
(1, 'History', 1);

-- Insert data into Participations
INSERT INTO Participations (UserID, SurveyID, ParticipationDate, TotalScore, Feedback)
VALUES 
(3, 1, '2025-01-02', 10, 'Great survey!'),
(3, 1, '2025-01-03', 8, 'Helpful content'),
(2, 2, '2025-01-12', NULL, 'Good training.');

-- Insert data into Responses
INSERT INTO Responses (ParticipationID, QuestionID, OptionID, ResponseText)
VALUES 
(1, 1, 1, NULL),
(1, 2, NULL, 'Very satisfied'),
(3, 3, NULL, 'Add more practical examples.');

-- Insert data into Competitions
INSERT INTO Competitions (Title, Description, PrizeDetails, Winner1, Winner2, Winner3)
VALUES 
('Competition 1', 'Description of Competition 1', 'First Prize: $100', 3, 2, NULL),
('Competition 2', 'Description of Competition 2', 'First Prize: $200', 2, NULL, NULL),
('Competition 3', 'Description of Competition 3', 'First Prize: $300', 3, 2, 1);

-- Insert data into Seminars
INSERT INTO Seminars (ConductedBy, Location, Date, ParticipantsCount, Description)
VALUES 
(2, 'Auditorium', '2025-01-15', 50, 'Introduction to Environmental Awareness'),
(2, 'Library', '2025-02-10', 30, 'Book Launch Seminar'),
(1, 'Conference Room', '2025-03-05', 20, 'Administrative Workshop');

-- Insert data into FAQ
INSERT INTO FAQ (Question, Answer)
VALUES 
('How to participate in surveys?', 'Log in to your account and go to the Surveys section.'),
('How to reset my password?', 'Click on Forgot Password on the login page and follow the instructions.'),
('Who can participate in competitions?', 'Both Students and Staff can participate.');

-- Insert data into Support
INSERT INTO Support (ContactInfo)
VALUES 
('support@environmentportal.com'),
('123-456-7890'),
('Visit us at the Administration Office.');

-- Insert data into RegistrationRequests
INSERT INTO RegistrationRequests (UserId, FirstName, LastName, RollOrEmpNo, ClassId, SectionId, Specification, AdmissionDate, JoinDate, RequestedAt)
VALUES 
(3, 'John', 'Doe', 'STU002', 1, NULL, 'Physics', '2023-01-01', NULL, GETDATE()), 
(2, 'Jane', 'Smith', 'STF002', NULL, 1, 'Library Manager', NULL, '2023-02-01', GETDATE()),
(1, 'Alice', 'Brown', 'ADM002', NULL, NULL, 'Administrative Assistant', NULL, '2023-03-01', GETDATE());
