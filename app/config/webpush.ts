import webpush from 'web-push'
require('dotenv').config()
const publicVapidKey = process.env.PUBLIC_VAPID
const privateVapidKey =  process.env.PRIVATE_VAPID

export default() : void => {
    webpush.setVapidDetails(
        'mailto: test@test.com', 
        publicVapidKey,
        privateVapidKey
    )
}