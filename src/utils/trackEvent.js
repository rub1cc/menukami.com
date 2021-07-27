export default function trackEvent(props) {
  return fetch('/api/track/addEvent', {
    method: 'post',
    body: JSON.stringify(props),
  })
}
