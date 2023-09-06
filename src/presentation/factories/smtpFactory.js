import SmtpTest from "../application/SmtpTest.js";
import SmtpGmail from "../application/SmtpGmail.js";

class smtpFactory {
    static create(smtpType = process.env.SMTP_TYPE || 'SmtpGmail') {
        const smtps = new Map();
        smtps.set('SmtpTest', SmtpTest);
        smtps.set('SmtpGmail', SmtpGmail)

        const smtp = smtps.get(smtpType);
        return new smtp().smtpConfig;
    }
}

export default smtpFactory;