Create Database
CREATE DATABASE EnvironmentalSurveyPortal;

-- Use the newly created database
USE EnvironmentalSurveyPortal;

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
    PhoneNumber NVARCHAR(10) NOT NULL, -- User's phone number
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('Admin', 'Staff', 'Student')), -- User role: Admin, Staff, or Student
    RollOrEmpNo NVARCHAR(50) NOT NULL UNIQUE, -- Unique identifier for roll number or employee number
    ClassId INT NULL, -- Foreign key reference to Classes
    Specification NVARCHAR(100) NULL, -- Specialization or specific description
    SectionId INT NULL, -- Foreign key reference to Sections
    AdmissionDate DATE NULL, -- Admission date for students
    JoinDate DATE NULL, -- Joining date for staff
    UpdatedAt DATE NULL, -- Last updated date
    Status NVARCHAR(10) NOT NULL DEFAULT 'Pending' CHECK (Status IN ('Pending', 'Active', 'Inactive')), -- Registration status
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