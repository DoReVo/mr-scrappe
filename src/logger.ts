/* A logger that will send the log to a discord channel */
const logger = async (
  msg: string,
  url: string = process.env.DISCORD_LOG_URL as string,
) => {
  // MY format and time
  const timestamp = new Date().toLocaleString('en-MY', {
    timeZone: 'asia/kuala_lumpur',
  })
  // Add timestamp the the log message
  const formattedMsg = `${'```'}${timestamp} ${msg}${'```'}`

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: formattedMsg,
    }),
  })
}

export { logger }
