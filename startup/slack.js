const { App } = require("@slack/bolt");
const bolt = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

module.exports = function() {
  (async () => {
    await bolt.start(process.env.PORT || 3000);
    console.log("⚡️ Slack Bolt initialized 😈");
  })();

  bolt.message(":wave:", async ({ message, say }) => {
      console.log("wave event fired");
    say(`Hello, <@${message.user}>`);
  });
};
