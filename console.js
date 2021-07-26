console.log(`randomInt (max, min=0)
twitterID (num, strings=null)`)


function randomInt (max, min=0) {
  return Math.floor(((Math.random() * max) - min) + min)
}

function twitterID (num, strings=null) {
  strings = (strings == null) ? "abcdefghijklmnopqrstuvwxyz___0123456789" : strings
  strings = strings.split("")
  let returnline = ""
  for (let i = 0; i < num; i++) {
    returnline += strings[randomInt(strings.length - 1)]
  }
  return returnline
}