import StaticKit from './static-kit';


// Container
var constants = {};

// General
constants.DOMAIN = 'stopmassspying.com';

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
constants.LEGISLATORS_TO_CALL = ["B001287","A000370","B000911","A000371","B001275","A000373","C001083","B001291","C001072","B001281","C001066","B001292","C001076","B001257","C001077","B001294","C001094","B001296","C001048","B001290","D000096","B001297","F000458","B001286","F000461","C001103","F000454","C001107","G000559","D000623","G000548","E000294","H001051","F000448","H001045","F000455","H000324","G000574","H001058","G000577","J000126","G000576","K000375","G000570","K000362","H001071","L000551","H000636","L000569","H000874","L000571","J000297","M001158","K000388","M001156","K000368","M001180","L000581","M001159","L000263","M001150","L000582","M001190","L000583","N000184","L000584","P000601","L000580","P000096","M001189","P000594","M001195","Q000023","M001182","R000122","N000188","R000583","P000258","R000570","P000598","S001176","R000053","S001189","R000601","S000344","R000586","S000364","R000588","S001154","R000515","S001195","R000577","S001172","S000583","S001175","T000473","S001192","T000193","S001193","T000467","W000813","W000798","W000815","W000819","W000810","W000799","W000187","W000822","Y000033","Y000066"];
constants.TWITTER_ID_BACKUPS = {
    'C001075': 'BillCassidy',
    'F000457': 'AlFranken',
    'K000367': 'AmyKlobuchar',
    'P000603': 'RandPaul',
    'V000127': 'DavidVitter',
};

export default constants;
