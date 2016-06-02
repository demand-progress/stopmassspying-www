import StaticKit from './static-kit';


// Container
var constants = {};

// General
constants.DOMAIN = 'savethefourth.net';

// Social
constants.EMAIL_SUBJECT = 'Sign this petition: Tell the Senate to end warrantless snooping';
constants.EMAIL_BODY = `Hi,

I just signed a petition at SaveTheFourth.net telling the Senate to finally #ReformECPA and pass legislation to require the government to get a warrant if it wants to access our private email.

Right now, the law says the government can access emails without a warrant just because they’re over 180 days old. I know — it’s crazy.

However, there is a bill before the Senate Judiciary Committee that would require the government get a warrant for email, just like it needs a warrant to access postal mail. It’s a no-brainer, and the bill has already passed the House on a vote of 419-0, thanks to grassroots mobilization. Now, we need to let the Senate know that the public wants this commonsense reform passed. Will you take a moment to contact the Senate?

https://${constants.DOMAIN}/?source=${constants.SOURCE_CLEANED}-emailshare

Thanks!`;
constants.TWEET_TEXT      = `.@SenateMajLdr @ChuckGrassley it’s time to #ReformECPA & pass privacy legislation with no weakening amendments! https://savethefourth.net`;

// Source
constants.SOURCE = StaticKit.query.source;
constants.SOURCE_CLEANED = StaticKit.query.cleanedSource;

// APIs
constants.ACTIONKIT_PAGE = 'stopmassspying-www';
constants.CALL_TOOL_URL = 'https://dp-call-congress.herokuapp.com/create?callback=?';
constants.FEEDBACK_TOOL_URL = 'https://dp-feedback-tool.herokuapp.com/api/v1/feedback?callback=?';
constants.SUNLIGHT_API_KEY = '3779f52f552743d999b2c5fe1cda70b6';
constants.SUNLIGHT_LOCATE_URL = 'https://congress.api.sunlightfoundation.com/legislators/locate?callback=?';

// Validation
constants.REQUIRED_FIELDS = [
    'email',
    // 'first_name',
    // 'last_name',
    'postcode',
];

// Campaign
constants.COMMITTEE_MEMBERS_SENATE = [
    'G000386', // Grassley
    'L000174', // Leahy
    'F000062', // Feinstein
    'S001141', // Sessions
    'S000148', // Schumer
    'G000359', // Graham
    'D000563', // Durbin
    'W000802', // Whitehouse
    'F000444', // Flake
    'C001088', // Coons
    'V000127', // Vitter
    'B001277', // Blumenthal
    'P000612', // Perdue
    'T000476', // Tillis
    'H000338', // Hatch
    'L000577', // Lee
    'C001056', // Cornyn
    'C001098', // Cruz
    'K000367', // Klobuchar
    'F000457', // Franken
];
constants.TWITTER_ID_BACKUPS = {
    'C001075': 'BillCassidy',
    'F000457': 'AlFranken',
    'K000367': 'AmyKlobuchar',
    'P000603': 'RandPaul',
    'V000127': 'DavidVitter',
};

export default constants;
