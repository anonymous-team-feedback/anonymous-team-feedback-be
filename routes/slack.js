const { bolt } = require('../startup/slack.js')

bolt.event('app_home_opened', ({ event, say }) => {  
  // Look up the user from DB
  console.log("bolt event fired")
  let user = store.getUser(event.user);
  
  if(!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);
    
    say(`Hello world, and welcome <@${event.user}>!`);
  } else {
    say('Hi again!');
  }
});

