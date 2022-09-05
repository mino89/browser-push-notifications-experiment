//check service workers support

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  });
}

//replace with your own key
const publicVapidKey = 'BMaJpdUEz88HX4PIQGmdB8dSEiJBqDSg1is6CAR3tyM07x1MWnbLxes7RJl85trJaJpEMa-3CXlsi9A8CElOcNA'

const getSubscribedElement = () => document.getElementById('subscribed')
const getUnsubscribedElement = () => document.getElementById('unsubscribed')

const setSubscribeMessage = async () => {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()

  getSubscribedElement().setAttribute('style', `display: ${subscription ? 'block' : 'none'}`)
  getUnsubscribedElement().setAttribute('style', `display: ${subscription ? 'none' : 'none'}`)

}
// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};




window.subscribe = async () => {
  if (!('serviceWorker' in navigator)) return;
  console.log('entra')
  const registration = await navigator.serviceWorker.ready;

  // Subscribe to push notifications
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  const response = await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })

  if(response.ok){
    setSubscribeMessage()
  }
};

window.unsubscribe = async () => {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()

  if (!subscription) return
  const { endpoint } = subscription
  const response = await fetch(`/subscription?endpoint=${endpoint}`, {
    method: 'DELETE',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  if (response.ok) {
    await subscription.unsubscribe()
    setSubscribeMessage()
  }
}

window.broadcast = async () => {
  await fetch('/broadcast', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
}

setSubscribeMessage()