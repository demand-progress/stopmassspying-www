import StaticKit from './static-kit';


// Container
var constants = {};

// General
constants.domain = 'stopmassspying.com';

// Social
constants.emailSubject = 'Sign this petition: Tell the Senate to end warrantless snooping';
constants.emailBody = `Hi,

I just signed a petition at SaveTheFourth.net telling the Senate to finally #ReformECPA and pass legislation to require the government to get a warrant if it wants to access our private email.

Right now, the law says the government can access emails without a warrant just because they’re over 180 days old. I know — it’s crazy.

However, there is a bill before the Senate Judiciary Committee that would require the government get a warrant for email, just like it needs a warrant to access postal mail. It’s a no-brainer, and the bill has already passed the House on a vote of 419-0, thanks to grassroots mobilization. Now, we need to let the Senate know that the public wants this commonsense reform passed. Will you take a moment to contact the Senate?

https://${constants.domain}/?source=${StaticKit.query.cleanedSource}-emailshare

Thanks!`;
constants.tweetText      = `.@SenateMajLdr @ChuckGrassley it’s time to #ReformECPA & pass privacy legislation with no weakening amendments! https://savethefourth.net`;

// APIs
constants.actionKitPage = 'stopmassspying-www';
constants.callToolURL = 'https://dp-call-congress.herokuapp.com/create?callback=?';
constants.feedbackToolURL = 'https://dp-feedback-tool.herokuapp.com/api/v1/feedback?callback=?';
constants.sunlightAPIKey = '3779f52f552743d999b2c5fe1cda70b6';
constants.sunlightLocateURL = 'https://congress.api.sunlightfoundation.com/legislators/locate?callback=?';

// Validation
constants.requiredFields = [
    'email',
    'postcode',
    // 'first_name',
    // 'last_name',
];

// Campaign
constants.twitterIDBackups = {
    'C001075': 'BillCassidy',
    'F000457': 'AlFranken',
    'K000367': 'AmyKlobuchar',
    'P000603': 'RandPaul',
    'V000127': 'DavidVitter',
};
constants.legislatorsToCall = [
    'B001287', // Ami Bera (CA)
    'A000370', // Alma Adams (NC)
    'B000911', // Corrine Brown (FL)
    'A000371', // Pete Aguilar (CA)
    'B001275', // Larry Bucshon (IN)
    'A000373', // Brad Ashford (NE)
    'C001083', // John Carney (DE)
    'B001291', // Brian Babin (TX)
    'C001072', // André Carson (IN)
    'B001281', // Joyce Beatty (OH)
    'C001066', // Kathy Castor (FL)
    'B001292', // Donald Beyer (VA)
    'C001076', // Jason Chaffetz (UT)
    'B001257', // Gus Bilirakis (FL)
    'C001077', // Mike Coffman (CO)
    'B001294', // Rod Blum (IA)
    'C001094', // Paul Cook (CA)
    'B001296', // Brendan Boyle (PA)
    'C001048', // John Culberson (TX)
    'B001290', // David Brat (VA)
    'D000096', // Danny Davis (IL)
    'B001297', // Ken Buck (CO)
    'F000458', // Stephen Fincher (TN)
    'B001286', // Cheri Bustos (IL)
    'F000461', // Bill Flores (TX)
    'C001103', // Buddy Carter (GA)
    'F000454', // Bill Foster (IL)
    'C001107', // Carlos Curbelo (FL)
    'G000559', // John Garamendi (CA)
    'D000623', // Mark DeSaulnier (CA)
    'G000548', // Scott Garrett (NJ)
    'E000294', // Tom Emmer (MN)
    'H001051', // Richard Hanna (NY)
    'F000448', // Trent Franks (AZ)
    'H001045', // Gregg Harper (MS)
    'F000455', // Marcia Fudge (OH)
    'H000324', // Alcee Hastings (FL)
    'G000574', // Ruben Gallego (AZ)
    'H001058', // Bill Huizenga (MI)
    'G000577', // Garret Graves (LA)
    'J000126', // Eddie Johnson (TX)
    'G000576', // Glenn Grothman (WI)
    'K000375', // William Keating (MA)
    'G000570', // Frank Guinta (NH)
    'K000362', // Steve King (IA)
    'H001071', // Jody Hice (GA)
    'L000551', // Barbara Lee (CA)
    'H000636', // Rubén Hinojosa (TX)
    'L000569', // Blaine Luetkemeyer (MO)
    'H000874', // Steny Hoyer (MD)
    'L000571', // Cynthia Lummis (WY)
    'J000297', // Evan Jenkins (WV)
    'M001158', // Kenny Marchant (TX)
    'K000388', // Trent Kelly (MS)
    'M001156', // Patrick McHenry (NC)
    'K000368', // Ann Kirkpatrick (AZ)
    'M001180', // David McKinley (WV)
    'L000581', // Brenda Lawrence (MI)
    'M001159', // Cathy McMorris Rodgers (WA)
    'L000263', // Sander Levin (MI)
    'M001150', // Candice Miller (MI)
    'L000582', // Ted Lieu (CA)
    'M001190', // Markwayne Mullin (OK)
    'L000583', // Barry Loudermilk (GA)
    'N000184', // Kristi Noem (SD)
    'L000584', // Mia Love (UT)
    'P000601', // Steven Palazzo (MS)
    'L000580', // Michelle Lujan Grisham (NM)
    'P000096', // Bill Pascrell (NJ)
    'M001189', // Luke Messer (IN)
    'P000594', // Erik Paulsen (MN)
    'M001195', // Alex Mooney (WV)
    'Q000023', // Mike Quigley (IL)
    'M001182', // Mick Mulvaney (SC)
    'R000122', // John Reed (RI)
    'N000188', // Donald Norcross (NJ)
    'R000583', // Thomas Rooney (FL)
    'P000258', // Collin Peterson (MN)
    'R000570', // Paul Ryan (WI)
    'P000598', // Jared Polis (CO)
    'S001176', // Steve Scalise (LA)
    'R000053', // Charles Rangel (NY)
    'S001189', // Austin Scott (GA)
    'R000601', // John Ratcliffe (TX)
    'S000344', // Brad Sherman (CA)
    'R000586', // James Renacci (OH)
    'S000364', // John Shimkus (IL)
    'R000588', // Cedric Richmond (LA)
    'S001154', // Bill Shuster (PA)
    'R000515', // Bobby Rush (IL)
    'S001195', // Jason Smith (MO)
    'R000577', // Tim Ryan (OH)
    'S001172', // Adrian Smith (NE)
    'S000583', // Lamar Smith (TX)
    'S001175', // Jackie Speier (CA)
    'T000473', // Mark Takai (HI)
    'S001192', // Chris Stewart (UT)
    'T000193', // Bennie Thompson (MS)
    'S001193', // Eric Swalwell (CA)
    'T000467', // Glenn Thompson (PA)
    'W000813', // Jackie Walorski (IN)
    'W000798', // Tim Walberg (MI)
    'W000815', // Brad Wenstrup (OH)
    'W000819', // Mark Walker (NC)
    'W000810', // Rob Woodall (GA)
    'W000799', // Timothy Walz (MN)
    'W000187', // Maxine Waters (CA)
    'W000822', // Bonnie Watson Coleman (NJ)
    'Y000033', // Don Young (AK)
    'Y000066', // David Young (IA)
];

constants.orgNames = {
    credo: 'CREDO Action',
    dp: 'Demand Progress',
    fftf: 'Fight for the Future',
    rootsaction: 'RootsAction',
};

export default constants;
