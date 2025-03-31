import Redis from 'ioredis'


const redisClient = new Redis(process.env.ENVIRONMENT === "Production" ? (
  {
    host: 'redis-18114.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port: 18114,
    password: 'aWQV21nR5WWed5pElx8UjnJu3WPfTNVX'
  }
) : (
  {
    host: 'redis-18114.c330.asia-south1-1.gce.redns.redis-cloud.com', // not working yet. create on pegasusclinicare 
    port: 18114,
    password: 'aWQV21nR5WWed5pElx8UjnJu3WPfTNVX'
  }
))

const redisConnection = (client: Redis = redisClient) => {
  client.on("error", (error) => {
    console.log('Redis Client Error', error)
  })


  client.on("connect", () => {
    console.log(`Great... Redis connected on server ${client.options.host}`)
  })
}

export default redisConnection;
export { redisClient }
