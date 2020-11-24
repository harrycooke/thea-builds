import mixpanel from 'mixpanel-browser';
var productionHost = 'app.theahealth.com'; 

//TODO: add this to env file and get dev token
var devToken = 'Development Token'; 
var prodToken = '28baedd423adc7759fa836b32c9384ce'; 

//TODO: add this to env file and get dev token
if (window.location.hostname.toLowerCase().search(productionHost) < 0) {
  mixpanel.init(prodToken);
  console.log("mixpanel running on prod");
 } else { 
  console.log("mixpanel running on dev");
  mixpanel.init(prodToken); 
} 



//mixpanel.init("28baedd423adc7759fa836b32c9384ce");

//let env_check = process.env.NODE_ENV === 'production';
//todo add back env check 
//todo add token to env file

let actions = {
  identify: (id) => {
    //if (env_check) 
    mixpanel.identify(id);
  },
  alias: (id) => {
    //if (env_check)
    mixpanel.alias(id);
  },
  track: (name, props) => {
    //if (env_check) 
    mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      //if (env_check) mixpanel.people.set(props);
      mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;