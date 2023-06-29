import NodemailerAdapter from "../mailing.js";

class MailingFactory {
  static create(mailingType = 'NodemailerAdapter') {
    const mailing = new Map();
    mailing.set('NodemailerAdapter', NodemailerAdapter);

    const email = mailing.get(mailingType);
    return new email();
  }
}

export default MailingFactory;
